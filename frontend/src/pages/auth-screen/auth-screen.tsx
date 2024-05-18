/* eslint-disable */
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Navbar,
  NavbarBrand,
  NavItem,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  loginAction,
  logoutAction,
  registrationAction,
} from "../../store/api-actions";
import { AppRoute, AuthorizationStatus } from "../../const";
import {
  getAuthorizationStatus,
  getUserData,
} from "../../store/user-process/selectors";
import { getBackground } from "../../store/tests-data/selectors";

function AuthScreen(): JSX.Element {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState(true);
  const [superUserSwitch, setSuperUserSwitch] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [userAvatar, setUserAvatar] = useState<File>();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUserData);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setCurrentUser(true);
    } else setCurrentUser(false);
  }, [authorizationStatus, user?.username]);

  const submitLogout = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const submitRegistration = (evt: FormEvent) => {
    evt.preventDefault();
    if (userAvatar) {
      dispatch(
        registrationAction({
          email: email,
          username: username,
          password: password,
          isSuperuser: superUserSwitch,
          adminKey: adminKey,
          avatar: userAvatar,
        }),
      );
    }
  };

  const submitLogin = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(
      loginAction({
        email: email,
        password: password,
      }),
    );
  };

  const updateFormBtn = () => {
    if (registrationToggle) {
      setRegistrationToggle(false);
    } else {
      setRegistrationToggle(true);
    }
  };

  const handleAvatarInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files !== null) {
      setUserAvatar(files[0]);
    }
    return 1;
  };

  if (currentUser) {
    return (
      <div>
        <Navbar color="dark" dark>
          <NavbarBrand>MOBSiD Authentication</NavbarBrand>
          {user?.isSuperUser ? (
            <NavbarBrand>Admin</NavbarBrand>
          ) : (
            <NavbarBrand>Student</NavbarBrand>
          )}
          <NavItem>
            <form onSubmit={submitLogout}>
              <Button type="submit" color="light" className="form_btn">
                Log Out
              </Button>
            </form>
          </NavItem>
        </Navbar>
        <div>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            You&#39;re logged in!
          </h2>
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "0vh",
            }}
            to="/"
          >
            Back to game
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand>MOBSiD Authentication</NavbarBrand>
        <NavItem>
          <form onSubmit={submitLogout}>
            <Button
              className="form_btn"
              onClick={updateFormBtn}
              variant="light"
            >
              {registrationToggle ? "Log In" : "Register"}
            </Button>
          </form>
        </NavItem>
      </Navbar>
      {registrationToggle ? (
        <div
          className="registration"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%",
          }}
        >
          <Form onSubmit={submitRegistration}>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Label className="email">Email</Label>
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
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label className="password">Password</Label>
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Выберите аватар</Label>
              <Input
                id="exampleFile"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleAvatarInput}
              />
              <FormText>
                Он будет использован для отображения Вашей позиции на игровом
                поле
              </FormText>
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
            {superUserSwitch ? (
              <div>
                <Label className="password">Administrator key</Label>
                <Input
                  name="adminKey"
                  // placeholder="Administrator key"
                  placeholder="AASmirnov" //doxxed this key to github so will change on release
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </div>
            ) : (
              <div></div>
            )}
            <div style={{ marginTop: "1rem" }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div
          className="login"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <Form onSubmit={submitLogin}>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <Label className="email">Email</Label>
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
              <Label className="password">Password</Label>
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
      )}
    </div>
  );
}

export default AuthScreen;
