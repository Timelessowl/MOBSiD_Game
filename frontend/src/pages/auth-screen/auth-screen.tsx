/* eslint-disable */
import {Button} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {useAppDispatch} from '../../hooks';
import {api} from '../../store'
import {useEffect, useState, FormEvent} from 'react';
import {loginAction} from '../../store/api-actions';
import {userDataType} from '../../types/types';

function AuthScreen(): JSX.Element {

  const userInitData: userDataType = {
    user: {
      email: '',
      username: '',
      isSuperUser: false,
    }
  };
  const dispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState(true);
  const [userData, setUserData] = useState(userInitData);
  const [superUserSwitch, setSuperUserSwitch] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');

  useEffect(() => {
    api.get('/api/user')
      .then((response) => {
        setCurrentUser(true);
        setUserData(response.data as userDataType);
      })
      .catch((error) => {
        setCurrentUser(false);
      });
  }, []);
  const submitLogout = (evt: FormEvent) => {
    evt.preventDefault();
    // alert('Logged Out');
    // setCurrentUser(false);
    api.post(
      '/api/logout',
      {withCredentials: true}
    ).then(() => {
      setCurrentUser(false);
    });
  };
  const submitRegistration = (evt: FormEvent) => {
    evt.preventDefault();
    api.post(
      '/api/register',
      {
        email: email,
        username: username,
        password: password,
        isSuperuser: superUserSwitch,
        adminKey: adminKey
      }
    ).then(() => {
      api.post(
        '/api/login',
        {
          email: email,
          password: password
        }
      ).then(() => {
        setCurrentUser(true);
      });
    });
  };
  const submitLogin = (e: FormEvent) => {
    e.preventDefault();
    api.post(
      '/api/login',
      {
        email: email,
        password: password
      }
    ).then(() => {
      setCurrentUser(true);
    });
  };
  // const submitLogin = (evt: FormEvent) => {
  //   evt.preventDefault();
  //
  //   dispatch(loginAction({
  //     email: email,
  //     password: password,
  //   }));
  //   setCurrentUser(true);
  // };
  const updateFormBtn = () => {
    if (registrationToggle) {
      setRegistrationToggle(false);
    } else {
      setRegistrationToggle(true);
    }
  };

  if (currentUser) {
    return (
      <div>
        <Navbar color='dark' dark>
          <NavbarBrand>MOBSiD Authentication</NavbarBrand>
          {userData.user.isSuperUser ? <NavbarBrand>Admin</NavbarBrand> : <NavbarBrand>Student</NavbarBrand>}
          <NavItem>
            <form onSubmit={submitLogout}>
              <Button type="submit" color='light' className="form_btn">Log Out</Button>
            </form>
          </NavItem>
        </Navbar>
        <div>
          <h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>You&#39;re
            logged in!
          </h2>
          <Link style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '0vh'}} to="/">Back to game</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar color='dark' dark>
        <NavbarBrand>MOBSiD Authentication</NavbarBrand>
        <NavItem>
          <form onSubmit={submitLogout}>
            <Button className="form_btn" onClick={updateFormBtn} variant="light">{registrationToggle ? 'Log In' : 'Register'}</Button>
          </form>
        </NavItem>
      </Navbar>
      {
        registrationToggle ? (
          <div className="registration" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
            <Form onSubmit={submitRegistration}>
              <FormGroup className="mb-3" controlId="formBasicEmail">
                <Label className="email">
                  Email
                </Label>
                <Input
                  value={email}
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label className="text-muted">
                  We&#39;ll never share your email with anyone else.
                </Label>
              </FormGroup>
              <FormGroup className="mb-3" controlId="formBasicUsername">
                <Label>Username</Label>
                <Input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label className="password">
                  Password
                </Label>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup switch>
                <Input
                  type="switch"
                  checked={superUserSwitch}
                  onClick={() => {
                    setSuperUserSwitch(!superUserSwitch);
                  }}
                />
                <Label check>MOBSiD Administrator</Label>
              </FormGroup>
              {
                superUserSwitch ? (
                  <div>
                    <Label className="password">
                      Administrator key
                    </Label>
                    <Input
                      name="adminKey"
                      // placeholder="Administrator key"
                      placeholder="AASmirnov" //doxxed this key to github so will change on release
                      type="password"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                    />
                  </div>
                ) : (<div></div>)
              }
              <div style={{marginTop: '1rem' }}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div className="login" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh'}}>
            <Form onSubmit={submitLogin}>
              <FormGroup className="mb-3" controlId="formBasicEmail">
                <Label className="email">
                  Email
                </Label>
                <Input
                  value={email}
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label className="text-muted">
                  We&#39;ll never share your email with anyone else.
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className="password">
                  Password
                </Label>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
      }
    </div>
  );
}

export default AuthScreen;
