import React, { useState } from 'react';
import img from './Cmonya.png';
import {Button, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';


const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>(['', '', '']);

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
          <h2>Question 1:</h2>
          <input
            type="text"
            value={answers[0]}
            onChange={(e) => handleChangeAnswer(0, e.target.value)}
          />
          <h2>Question 2:</h2>
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

export default GameScreen;
