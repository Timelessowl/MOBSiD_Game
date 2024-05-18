/* eslint-disable */
import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getCurrentQuestion,
  getQuestions,
  getQuestionsLoading,
} from "../../store/game-data/selectors";
import {
  getBackground,
  getPath,
  getTestLoading,
  getTimer,
} from "../../store/tests-data/selectors";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Navbar,
  NavbarBrand,
  NavItem,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoute } from "../../const";
import { Question } from "../../types/question";
import { JSONObject } from "../../types/types";
import {
  checkUserAnswer,
  fetchQuestionsAction,
  getTestConfig,
  getUserProgress,
  fetchUsersData,
  getUsersPosition,
  setActiveTest,
  getTestTimer,
  setTestTimer,
  setTestQuestion,
  getTestQuestion,
} from "../../store/api-actions";
import {
  getProgressLoading,
  getProgress,
  getPosition,
  getPositionLoading,
} from "../../store/game-process/selectors";
import Load from "../../components/load/load";
import { store } from "../../store";
import GameField from "../../components/game-field/game-field";
import {
  getUserData,
  getUserLoading,
} from "../../store/user-process/selectors";
import { testData } from "../../store/tests-data/tests-data";
import { setTestCurrentQuestion } from "../../store/action";

const GameScreen: React.FC = () => {
  const { id } = useParams();
  const testId = Number(id);
  const dispatch = useAppDispatch();
  const positions = useAppSelector(getPosition);
  const path = useAppSelector(getPath);
  const progress = useAppSelector(getProgress);
  const timer = useAppSelector(getTimer);
  const currentQuestionIndex = useAppSelector(getCurrentQuestion);

  const emptyQuestion: Question = {
    testId: 0,
    id: -1,
    text: "No such question",
    withOptions: false,
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    opt5: "",
    answer: "",
  };

  const navigate = useNavigate();
  const questions = useAppSelector(getQuestions);

  const backgroundImg = useAppSelector(getBackground);
  const isProgressLoading = useAppSelector(getProgressLoading);
  const isPositionLoading = useAppSelector(getPositionLoading);
  const isQuestionsLoading = useAppSelector(getQuestionsLoading);
  const isConfigLoading = useAppSelector(getTestLoading);
  const isUserLoading = useAppSelector(getUserLoading);

  const user = useAppSelector(getUserData);

  const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [prevQuestionIndex, setPrevQuestionIndex] = useState(-1);
  const [currQuestion, setCurrQuestion] = useState<Question>(emptyQuestion);
  const [fQuestionChanged, setFQuestionChanged] = useState(false);

  if (
    questionIndex === -1 &&
    questions[0] !== undefined &&
    currentQuestionIndex !== -1
  ) {
    setQuestionIndex(currentQuestionIndex);
  }

  if (prevQuestionIndex !== questionIndex) {
    setCurrQuestion(questions[questionIndex]);
    setPrevQuestionIndex(questionIndex);
  }

  useEffect(() => {
    store.dispatch(fetchQuestionsAction({ testId: testId }));
    store.dispatch(getTestConfig(testId));
    store.dispatch(fetchUsersData({ testId }));
    store.dispatch(getTestQuestion({ testId: testId }));
    // if (questionIndex === -1 && questions[0] !== undefined) {
    //   setQuestionIndex(0);
    // }
    // if (questionIndex !== -1) {
    //   console.log('~~~~~~~~~~~~~~~~~~~')
    //   console.log(questionIndex)
    //   console.log('~~~~~~~~~~~~~~~~~~~')
    //   setCurrQuestion(questions[questionIndex]);
    // }

    const timer = setInterval(() => {
      store.dispatch(getUsersPosition({ testId }));
      store.dispatch(getUserProgress({ testId }));
      // store.dispatch(getTestTimer({testId:1, questionId: 1}))
      store.dispatch(
        getTestTimer({ testId: testId, questionId: currQuestion.id }),
      );
    }, 1000);
    // очистка интервала
    return () => clearInterval(timer);
  }, [progress, questionIndex]);

  if (user?.activeTestId !== testId) {
    navigate(AppRoute.Root);
  }

  const uuid = ["opt1", "opt2", "opt3", "opt4", "opt5"];
  let successLabel: string = "";
  let triesLabel: string = "";
  let progressParsed: JSONObject = {};
  let userProgressParsed: JSONObject = {};

  const handleAuthButtonClick = () => navigate(AppRoute.Auth);
  const submitAnswer = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(
      checkUserAnswer({
        questionId: questions[questionIndex].id,
        userAnswer: answer,
      }),
    );
  };

  const handlePrevious = (evt: FormEvent) => {
    evt.preventDefault();
    setAnswer("");
    setQuestionIndex(questionIndex - 1);
  };

  const handleNext = (evt: FormEvent) => {
    evt.preventDefault();
    setAnswer("");
    setQuestionIndex(questionIndex + 1);
  };

  const seconds2Timer = (seconds: number) => {
    if (seconds > 0) {
      return `${Math.floor(seconds / 3600)}:${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`;
    } else return "00:00:00";
  };

  if (
    isProgressLoading ||
    isQuestionsLoading ||
    isConfigLoading ||
    isUserLoading ||
    isPositionLoading
  ) {
    return <Load />;
  }

  if (progress !== "" && progress !== undefined && user !== undefined) {
    progressParsed = JSON.parse(progress) as JSONObject;
    // userProgressParsed = JSON.parse(String(progressParsed[user.username]))
    if (progressParsed[currQuestion.id] !== undefined) {
      successLabel = progressParsed[currQuestion.id][0]
        ? "На этот вопрос уже дан правильный ответ"
        : "";
      triesLabel = `Использованно ${progressParsed[currQuestion.id][1] as number} попыток`;
    } else {
      successLabel = "";
      triesLabel = "";
    }
  }

  if (
    timer !== "" &&
    Number(timer) <= 0 &&
    questionIndex !== -1 &&
    !fQuestionChanged
  ) {
    if (questions[questionIndex + 1] === undefined) {
    } else {
      store.dispatch(setTestTimer({ testId: testId }));
      store.dispatch(
        setTestQuestion({ testId: testId, currentQuestion: questionIndex + 1 }),
      );
      store.dispatch(setTestCurrentQuestion(questionIndex + 1));
      setFQuestionChanged(true);
      setAnswer("");
      setQuestionIndex(questionIndex + 1);
    }
  }
  if (fQuestionChanged && timer !== "" && Number(timer) > 0) {
    setFQuestionChanged(false);
  }

  console.log("-----------------");
  console.log(fQuestionChanged);
  console.log(seconds2Timer(Number(timer)));

  const disableSubmit = (): boolean | undefined =>
    userProgressParsed[currQuestion.id] !== undefined
      ? answer === "" || (userProgressParsed[currQuestion.id][0] as boolean)
      : answer === "";

  const getOptionsArray = (): [string] => {
    const options: [string] = [""];
    if (currQuestion.opt1 !== "") {
      options[0] = currQuestion.opt1;
    }
    if (currQuestion.opt2 !== "") {
      options.push(currQuestion.opt2);
    }
    if (currQuestion.opt3 !== "") {
      options.push(currQuestion.opt3);
    }
    if (currQuestion.opt4 !== "") {
      options.push(currQuestion.opt4);
    }
    if (currQuestion.opt5 !== "") {
      options.push(currQuestion.opt5);
    }
    return options;
  }; // yep i know how shitty this solution is. Plan is to redo model to have single option field.

  return (
    <div>
      <nav style={{ marginBottom: "1rem" }}>
        <Navbar color="dark" dark>
          <NavbarBrand>MOBSiD Game</NavbarBrand>
          <NavItem>
            <Button
              onClick={handleAuthButtonClick}
              className="form_btn"
              variant="light"
            >
              Authorisation
            </Button>
          </NavItem>
        </Navbar>
      </nav>
      <div style={{ float: "left", width: "50%" }}>
        <div
          style={{
            display: "block",
            height: "calc(100vh - 3rem)",
            paddingLeft: "3rem",
          }}
        >
          <div
            style={{
              display: "block",
              alignItems: "right",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <Form onSubmit={submitAnswer}>
              <Label className="question">{currQuestion.text}</Label>
              {currQuestion.withOptions ? (
                <FormGroup tag="fieldset">
                  <legend>Выберите правильный вариант ответа</legend>
                  {getOptionsArray().map((option, i) => (
                    <FormGroup check key={uuid[i]}>
                      <Input
                        name="options"
                        type="radio"
                        onChange={(e) => setAnswer(option)}
                      />{" "}
                      <Label check>{option}</Label>
                    </FormGroup>
                  ))}
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label className="answer">Введите ответ на вопрос</Label>
                  <Input
                    name="answer"
                    placeholder="Answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{ maxWidth: "50%" }}
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

              <FormGroup>
                <Label> Оставшееся время {seconds2Timer(Number(timer))}</Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Кнопки пред и след будут удалены на релизе и пока нужны для
                  тестов
                </Label>
              </FormGroup>
              <FormGroup>
                <Button
                  variant="primary"
                  onClick={handlePrevious}
                  disabled={!(questionIndex > 0)}
                >
                  Предыдущий
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={questions[questionIndex + 1] === undefined}
                >
                  Следующий
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    store.dispatch(setActiveTest({ testId: null }));
                    navigate(AppRoute.Root);
                  }}
                  // disabled={questions[questionIndex + 1] === undefined}
                >
                  Закончить попытку
                </Button>
                {/*<button onClick={() => requestProcess()}>Try WS</button>*/}
              </FormGroup>
            </Form>
          </div>
          <GameField
            background={backgroundImg}
            path={path}
            positions={positions}
          />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
