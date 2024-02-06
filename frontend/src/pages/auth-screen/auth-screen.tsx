import {Button} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
// import {Container} from 'reactstrap';
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  NavbarBrand,
  // Nav,
  NavItem,
  // NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // NavbarText,
} from 'reactstrap';
import {client} from '../../index';
import {useEffect, useState, FormEvent} from 'react';


function AuthScreen(): JSX.Element {
  const [currentUser, setCurrentUser] = useState(true);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get('/api/user')
      .then(() => {
        setCurrentUser(true);
      })
      .catch((error) => {
        setCurrentUser(false);
      });
  }, []);
  const submitLogout = (evt: FormEvent) => {
    evt.preventDefault();
    // alert('Logged Out'); // eslint-disable-line no-alert
    // setCurrentUser(false);
    client.post(
      '/api/logout',
      {withCredentials: true}
    ).then(() => {
      setCurrentUser(false);
    });
  };
  const submitRegistration = (evt: FormEvent) => {
    evt.preventDefault();
    client.post(
      '/api/register',
      {
        email: email,
        username: username,
        password: password
      }
    ).then(() => {
      client.post(
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
    client.post(
      '/api/login',
      {
        email: email,
        password: password
      }
    ).then(() => {
      setCurrentUser(true);
    });
  };
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
          <NavbarBrand>Authentication App</NavbarBrand>
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
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar color='dark' dark>
        <NavbarBrand>Authentication App</NavbarBrand>
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
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