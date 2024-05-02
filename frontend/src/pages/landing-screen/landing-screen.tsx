/* eslint-disable */
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Form, FormText, Button, Navbar, NavbarBrand, NavItem, Label, FormGroup, Input} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addQuestionAction, getTests, setTestBackground} from '../../store/api-actions';
import {setTestId} from '../../store/action';
import {getTotalTests} from "../../store/game-data/selectors";


const LandingScreen: React.FC = () => {


  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalTests = useAppSelector(getTotalTests);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [OptionsSwitch, setOptionsSwitch] = useState(false);
  const [Options, setOptions] = useState(['', '', '', '', '']);


  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );

  function handleOptionChange(index: number, newOpt: string) {
    const nextCounters = Options.map((opt, i) => {
      if (i === index) {
        return newOpt;
      } else {
        return opt;
      }
    });
    setOptions(nextCounters);
  }

  const uuid = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];

  const submitNewQuestion = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(addQuestionAction({
      id: 0,
      text: question,
      withOptions: OptionsSwitch,
      opt1: Options[0],
      opt2: Options[1],
      opt3: Options[2],
      opt4: Options[3],
      opt5: Options[4],
      answer: answer
    }));
  };

  const handleTestSelect = (testId : number) => {
    dispatch(setTestId(testId))
    navigate(`/game/${testId}`)


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
        <div style={{display: 'grid', alignItems: 'right', justifyContent: 'center', height: '50vh'}}>
          <Form>
            <Label className="question">
              Выберите тест
            </Label>

            {
              totalTests.map((test, i) =>
                (
                  <FormGroup>
                    <Button variant="primary" onClick={() => handleTestSelect(test)}>
                      {`Test ${test}`}
                    </Button>
                  </FormGroup>
                )
              )
            }
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
