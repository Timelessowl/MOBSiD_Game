/* eslint-disable */
import React, {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getQuestions, getQuestionsLoading} from '../../store/game-data/selectors';
import {getBackground, getPath} from '../../store/tests-data/selectors';
import {Button, Form, FormGroup, Input, Label, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Question} from '../../types/question';
import {JSONObject} from '../../types/types';
import {checkUserAnswer, fetchQuestionsAction, getTestConfig, getUserProgress} from '../../store/api-actions';
import {getProgressLoading, getProgress, getPosition} from '../../store/game-process/selectors';
import Load from '../../components/load/load';
import {store} from "../../store";
import GameField from "../../components/game-field/game-field";


const GameScreen: React.FC = () => {
  const {id} = useParams();
  const testId = Number(id)
  const dispatch = useAppDispatch();
  const position = useAppSelector(getPosition);
  const path = useAppSelector(getPath)

  useEffect(() => {
    store.dispatch(getUserProgress());
    store.dispatch(fetchQuestionsAction({testId:testId}));
    store.dispatch(getTestConfig(testId));

  }, [dispatch]);

  const emptyQuestion: Question = {
    testId: 0,
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
  const questions = useAppSelector(getQuestions);
  const progress = useAppSelector(getProgress);
  const backgroundImg = useAppSelector(getBackground);
  const isProgressLoading = useAppSelector(getProgressLoading);
  const isQuestionsLoading = useAppSelector(getQuestionsLoading);
  const [answer, setAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [prevQuestionIndex, setPrevQuestionIndex] = useState(-1);
  const [currQuestion, setCurrQuestion] = useState<Question>(emptyQuestion);

  const uuid = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
  let successLabel: string;
  let triesLabel: string;

  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );
  const submitAnswer = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(checkUserAnswer({
      questionId: questions[questionIndex].id,
      userAnswer: answer,
    }));
  };

  const handlePrevious = (evt: FormEvent) => {
    evt.preventDefault();
    setAnswer('');
    setQuestionIndex(questionIndex - 1);
  };

  const handleNext = (evt: FormEvent) => {
    evt.preventDefault();
    setAnswer('');
    setQuestionIndex(questionIndex + 1);
  };

  if (isProgressLoading || isQuestionsLoading){
    return <Load/>;
  }

  const progressParsed = JSON.parse(progress) as JSONObject;
  if (progressParsed[currQuestion.id] !== undefined){
    successLabel = progressParsed[currQuestion.id][0] ? 'На этот вопрос уже дан правильный ответ' : '';
    triesLabel = `Использованно ${progressParsed[currQuestion.id][1] as number} попыток`;
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


  const disableSubmit = () : boolean|undefined=>
    (progressParsed[currQuestion.id] !== undefined ? (answer === '' ||
      progressParsed[currQuestion.id][0] as boolean) : answer === '');

  const getOptionsArray = () : [string] => {
    const options : [string] = [''];
    if (currQuestion.opt1 !== ''){
      options[0] = (currQuestion.opt1);
    }
    if (currQuestion.opt2 !== ''){
      options.push(currQuestion.opt2);
    }
    if (currQuestion.opt3 !== ''){
      options.push(currQuestion.opt3);
    }
    if (currQuestion.opt4 !== ''){
      options.push(currQuestion.opt4);
    }
    if (currQuestion.opt5 !== ''){
      options.push(currQuestion.opt5);
    }
    return options;
  }; // yep i know how shitty this solution is. Plan is to redo model to have single option field.


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
      <div style={{float: 'left', width:'50%'}}>
        <div style={{ display: 'block', height: 'calc(100vh - 3rem)', paddingLeft: '3rem'}}>
          <div style={{display: 'block', alignItems: 'right', justifyContent: 'center', height: '50vh'}}>
            <Form onSubmit={submitAnswer}>
              <Label className='question'>
                {currQuestion.text}
              </Label>
              {currQuestion.withOptions ?
                (
                  <FormGroup tag="fieldset">
                    <legend>
                      Выберите правильный вариант ответа
                    </legend>
                    {
                      getOptionsArray().map((option, i)=>
                        (
                          <FormGroup check key={uuid[i]}>
                            <Input
                              name='options'
                              type="radio"
                              onChange={(e) => setAnswer(option)}
                            />
                            {' '}
                            <Label check>
                              {option}
                            </Label>
                          </FormGroup>
                        )
                      )
                    }
                  </FormGroup>) : (
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
                      style={{maxWidth: '50%'}}

                    />
                  </FormGroup>
                )}
              <Button
                variant="primary"
                type="submit"
                disabled={disableSubmit() as boolean}
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
                     disabled={!(questionIndex > 0)}
            >
              Предыдущий
            </Button>
            < Button variant="primary"
                     onClick={handleNext}
                     disabled={questions[questionIndex + 1] === undefined}
            >
              Следующий
            </Button>
          </div>
          <GameField background={backgroundImg} path={path} position={position}/>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
