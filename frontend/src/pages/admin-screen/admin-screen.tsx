/* eslint-disable */
import React, {FormEvent, useEffect, useState} from 'react';
import img from './Cmonya.png';
import {Form, Button, Navbar, NavbarBrand, NavItem, Label, FormGroup, Input} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getUserData} from '../../store/user-process/selectors';
import {logoutAction} from "../../store/api-actions";


const AdminScreen: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserData);

  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (!user?.user.isSuperUser) {
      navigate(AppRoute.Auth);
    }
  }, []);


  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );

  const submitNewQuestion = (evt: FormEvent) => {
    evt.preventDefault();
    console.log('Here will be question handler')
  };

  return (
    <div>
      <nav style={{marginBottom: '1rem' }}>
        <Navbar color='dark' dark>
          <NavbarBrand>MOBSiD Game</NavbarBrand>
          <NavItem>
            <Button onClick={handleAuthButtonClick} className="form_btn" variant="light">Authorisation</Button>
          </NavItem>
        </Navbar>
      </nav>
      <div style={{ display: 'flex', height: 'calc(100vh - 3rem)', paddingLeft: '3rem'}}>
        <div style={{display: 'flex', alignItems: 'right', justifyContent: 'center', height: '50vh'}}>
          <Form onSubmit={submitNewQuestion}>
            <Label className="question">
              Введите вопрос
            </Label>
            <FormGroup>
              <textarea style={{ flex: 1, padding: '1rem' }}
                rows={10}
                cols={70}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label className="answer">
                Введите ответ на вопрос
              </Label>
              <Input
                name="answer"
                placeholder="Answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </FormGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
