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
import {getLoading, getPosition, getProgress} from "../../store/game-process/selectors";
import {getUserData} from "../../store/user-process/selectors";
import Load from "../../components/load/load";






const QuestionsScreen: React.FC = () => {
  const emptyQuestion: Question = {
    id: -1,
    text: 'No such question',
    withOptions: false,
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
  const progress = useAppSelector(getProgress);

  const [answer, setAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [prevQuestionIndex, setPrevQuestionIndex] = useState(-1);
  const [currQuestion, setCurrQuestion] = useState<Question>(emptyQuestion);

  if (useAppSelector(getLoading)){
    return <Load/>;
  }
  const progress_parsed = JSON.parse(progress);
  var successLabel: string;
  var triesLabel: string;

  if (progress_parsed[currQuestion.id] !== undefined){
    successLabel = progress_parsed[currQuestion.id][0] ? 'На этот вопрос уже дан правильный ответ': '';
    triesLabel = 'Использованно '+String(progress_parsed[currQuestion.id][1])+' попыток';
  }
  else {
    successLabel = '';
    triesLabel = '';
  }

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
    <div>
      <nav style={{marginBottom: '1rem' }}>
        <Navbar color='dark' dark>
          <NavbarBrand>MOBSiD Game</NavbarBrand>
          <NavItem>
            <Button onClick={handleAuthButtonClick} className="form_btn" variant="light">Authorisation</Button>
          </NavItem>
        </Navbar>
      </nav>
      <div style={{float: "left", width:"50%"}}>
        <div style={{ display: 'block', height: 'calc(100vh - 3rem)', paddingLeft: '3rem'}}>
          <div style={{display: 'block', alignItems: 'right', justifyContent: 'center', height: '50vh'}}>
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
                  style={{maxWidth:'50%'}}

                />
              </FormGroup>
              <Button
                variant="primary"
                type="submit"
                disabled={progress_parsed[currQuestion.id] !== undefined && progress_parsed[currQuestion.id][0]}
              >
                Submit
              </Button>
              <FormGroup>
                <Label>{successLabel}</Label>
              </FormGroup>
              <FormGroup>
                <Label>{triesLabel}</Label>
              </FormGroup>
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
    </div>
  );
};

export default QuestionsScreen;
