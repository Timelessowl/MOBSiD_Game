/* eslint-disable */
import React, {FormEvent, useState} from 'react';
import img from './Cmonya.png';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getQuestions} from '../../store/game-data/selectors';
import {Button, Form, FormGroup, Input, Label, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Question} from '../../types/question';
import {checkUserAnswer} from "../../store/api-actions";
import {getPosition} from "../../store/game-process/selectors";
import {getUserData} from "../../store/user-process/selectors";




const QuestionsScreen: React.FC = () => {
  const emptyQuestion: Question = {
    id: -1,
    text: 'No such question',
    opt1:'',
    opt2:'',
    opt3:'',
    opt4:'',
    opt5:'',
    answer:''
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(getQuestions);
  const [answer, setAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [prevQuestionIndex, setPrevQuestionIndex] = useState(-1);
  const [currQuestion, setCurrQuestion] = useState<Question>(emptyQuestion);

  if (questionIndex === -1 && questions[0] !== undefined) {
    setQuestionIndex(0);
  }
  if (prevQuestionIndex !== questionIndex){
    setCurrQuestion(questions[questionIndex]);
    setPrevQuestionIndex(questionIndex);
  }

  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );
  const submitAnswer = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(checkUserAnswer({
      questionId: questions[questionIndex].id,
      userAnswer: answer,
    }))
  };

  const handlePrevious = (evt: FormEvent) => {
    evt.preventDefault();
    setQuestionIndex(questionIndex - 1);
  };

  const handleNext = (evt: FormEvent) => {
    evt.preventDefault();
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div style={{float: "left", width:"50%"}}>
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
          <Form onSubmit={submitAnswer}>
            <Label className='question'>
              {currQuestion.text}
            </Label>
            <FormGroup>
              <Label className="answer">
                Введите ответ на вопрос
              </Label>
              <Input
                name="answer"
                placeholder="Answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)
                }

              />
            </FormGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      <div>
        < Button variant="primary"
          onClick={handlePrevious}
          disabled={!(questionIndex>0)}
        >
          Предыдущий
        </Button>
        < Button variant="primary"
          onClick={handleNext}
          disabled={questions[questionIndex+1] === undefined}
        >
          Следующий
        </Button>
      </div>
        <Label style={{position:"absolute", top:"2000px"}}>TEST
        </Label>
      </div>
    </div>
  );
};

export default QuestionsScreen;
