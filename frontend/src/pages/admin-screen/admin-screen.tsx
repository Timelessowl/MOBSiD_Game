/* eslint-disable */

import React, {useEffect, useState} from 'react';
import img from './Cmonya.png';
import {Button, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {getUserData} from '../../store/user-process/selectors';


const AdminScreen: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserData);

  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [question, setQuestion] = useState('');

  // useEffect(() => {
  //   if (user?.user.isSuperUser !== false) {
  //     navigate(AppRoute.Auth);
  //   }
  //
  // }, []);


  const handleChangeAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };


  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );

  return (
    <div>
      <nav style={{marginBottom: '1rem' }}>
        <Navbar color='dark' dark>
          <NavbarBrand>MOBSiD Game</NavbarBrand>
          <NavItem>
            <Button onClick={handleAuthButtonClick} className="form_btn" variant="light">Log in</Button>
          </NavItem>
        </Navbar>
      </nav>
      <div style={{ display: 'flex', height: 'calc(100vh - 3rem)' }}>
        <div style={{ flex: 1, padding: '1rem' }}>
          <h2>Question 1: 2? 2? 2? qwerty</h2>
          <textarea
            rows={10}
            cols={70}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="text"
            value={answers[1]}
            onChange={(e) => handleChangeAnswer(1, e.target.value)}
          />
          <h2>{question}</h2>
          <input
            type="text"
            value={answers[1]}
            onChange={(e) => handleChangeAnswer(1, e.target.value)}
          />
          <h2>Question 3:</h2>
          <input
            type="text"
            value={answers[2]}
            onChange={(e) => handleChangeAnswer(2, e.target.value)}
          />
          <button>Submit</button>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={img} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
