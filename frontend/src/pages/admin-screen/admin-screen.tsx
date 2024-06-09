/* eslint-disable */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Form,
  FormText,
  Button,
  Navbar,
  NavbarBrand,
  NavItem,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserData } from "../../store/user-process/selectors";
import {
  addQuestionAction,
  addTestAction,
  addToTestPath,
  getTestConfig,
  setTestBackground,
} from "../../store/api-actions";
import { getAllTests } from "../../store/tests-data/selectors";
import { JSONObject } from "../../types/types";
import GameField from "../../components/game-field/game-field";

const AdminScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);
  const totalTests = useAppSelector(getAllTests);

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [OptionsSwitch, setOptionsSwitch] = useState(false);
  const [Options, setOptions] = useState(["", "", "", "", ""]);
  const [backgroundImg, setBackgroundImg] = useState<File>();
  const [backgroundStr, setBackgroundStr] = useState('');
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [testId, setTestId] = useState(1);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [newTestTitle, setNewTestTitle] = useState("Test");
  const [timer, setTimer] = useState("00:00:00");
  const [newTestSetup, setNewTestSetup] = useState(false);

  useEffect(() => {
    if (!user?.isSuperUser) {
      navigate(AppRoute.Auth);
    }

    if (question !== "" && answer !== "") {
      newTestSetup
        ? setDisableSubmit(backgroundImg === undefined)
        : setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
    totalTests.map((currTest) => {
      if(currTest['testId'] === testId){setBackgroundStr(currTest['background'] as string)}
    })
  }, [testId]);

  const handleAuthButtonClick = () => navigate(AppRoute.Auth);

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

  const uuid = ["opt1", "opt2", "opt3", "opt4", "opt5"];

  const submitNewQuestion = (evt: FormEvent) => {
    evt.preventDefault();
    if (newTestSetup) {
      dispatch(
        addTestAction({
          title: newTestTitle,
          text: question,
          withOptions: OptionsSwitch,
          opt1: Options[0],
          opt2: Options[1],
          opt3: Options[2],
          opt4: Options[3],
          opt5: Options[4],
          answer: answer,
          background: backgroundImg,
          path: `{\"1\": [${positionX}, ${positionY}]}`,
        }),
      );
    } else {
      dispatch(
        addQuestionAction({
          testId: testId,
          text: question,
          withOptions: OptionsSwitch,
          opt1: Options[0],
          opt2: Options[1],
          opt3: Options[2],
          opt4: Options[3],
          opt5: Options[4],
          answer: answer,
        }),
      );
      dispatch(
        addToTestPath({
          testId: testId,
          path: [positionX, positionY],
        }),
      );
    }
    window.location.reload();
  };

  const SubmitBackground = (evt: FormEvent) => {
    evt.preventDefault();

    if (backgroundImg) {
      dispatch(
        setTestBackground({
          testId: testId,
          background: backgroundImg,
        }),
      );
    }
    window.location.reload();
  };

  const CreateNewTest = (evt: FormEvent) => {
    evt.preventDefault();
    setNewTestSetup(true);
  };

  const handleBackgroundInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files !== null) {
      setBackgroundImg(files[0]);
    }
    return 1;
  };

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
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 3rem)",
          paddingLeft: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "right",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <Form onSubmit={submitNewQuestion}>
            <FormGroup>
              {newTestSetup ? (
                <FormGroup>
                  <Label className="newTitle">
                    Введите название нового теста
                  </Label>
                  <Input
                    name="newTitle"
                    placeholder="Title"
                    type="text"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                  />
                </FormGroup>
              ) : (
                [
                  <Label key={"title"}>Выберите тест для редактирования</Label>,
                  <Input
                    key={"title"}
                    id="title"
                    name="title"
                    type="select"
                    value={testId}
                    onChange={(e) => setTestId(Number(e.target.value))}
                  >
                    {totalTests.map((test) => (
                      <option key={test["testId"]} value={test["testId"]}>
                        {test["title"]}
                      </option>
                    ))}
                  </Input>,
                  <Button onClick={CreateNewTest} style={{ marginTop: "16px" }}>
                    Создать новый
                  </Button>,
                ]
              )}
            </FormGroup>
            <Label className="question">Введите вопрос</Label>
            <FormGroup>
              <textarea
                style={{ flex: 1, padding: "1rem" }}
                rows={10}
                cols={70}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormGroup>
            <FormGroup switch>
              <Input
                type="switch"
                checked={OptionsSwitch}
                onClick={() => {
                  setOptionsSwitch(!OptionsSwitch);
                }}
              />
              <Label check>С вариантами ответа</Label>
            </FormGroup>
            {OptionsSwitch ? (
              [
                Options.map((option, i) => (
                  <Input
                    key={uuid[i]}
                    name={`opt${i}`}
                    placeholder={`Option ${i + 1}`}
                    type="text"
                    value={Options[i]}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    style={{ marginBottom: "7px" }}
                  />
                )),
                <Label key={"label"}>Выберите правильный вариант</Label>,
                <Input
                  key={"ans"}
                  id="answerSelect"
                  name="answerSelect"
                  type="select"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                >
                  {Options.map((option, i) => (
                    <option key={uuid[i]}>{option}</option>
                  ))}
                </Input>,
              ]
            ) : (
              <FormGroup>
                <Label className="answer">Введите ответ на вопрос</Label>
                <Input
                  name="answer"
                  placeholder="Answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </FormGroup>
            )}
            <FormGroup>
              <Label className="position">
                Введите X позицию игрока после правильного ответа
              </Label>
              <Input
                name="posX"
                placeholder="X"
                type="number"
                min={0}
                max={20}

                value={positionX}
                onChange={(e) => setPositionX(Number(e.target.value))}
              />
              <FormText>X координата позиции студентов, правильно ответивших на этот вопрос</FormText>
            </FormGroup>
            <FormGroup>
              <Label className="position">
                Введите Y позицию игрока после правильного ответа
              </Label>
              <Input
                name="posY"
                placeholder="Y"
                type="number"
                min={0}
                max={20}
                value={positionY}
                onChange={(e) => setPositionY(Number(e.target.value))}
              />
              <FormText>Y координата позиции студентов, правильно ответивших на этот вопрос</FormText>
            </FormGroup>
            <FormGroup>
              <Label className="position">
                Таймер для вопроса
              </Label>
              <Input
                name="posY"
                placeholder="Y"
                type='time'
                step='2'
                value={timer}
                onChange={(e) => setTimer(String(e.target.value))}
              />
              <FormText></FormText>
            </FormGroup>
            <Button variant="primary" type="submit" disabled={disableSubmit}>
              Submit
            </Button>
            {newTestSetup ? (
              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "16px", backgroundColor: "red" }}
                onClick={() => setNewTestSetup(false)}
              >
                Cancel
              </Button>
            ) : (
              <div />
            )}
          </Form>
        </div>
        <div style={{ marginLeft: "16px" }}>
          <Form onSubmit={SubmitBackground}>
            <FormGroup>
              <Label for="exampleFile">Выберите фон</Label>
              <Input
                id="exampleFile"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleBackgroundInput}
              />
              <FormText>Изображение-карта для текущего теста</FormText>
            </FormGroup>
            <FormGroup>
              {newTestSetup ? (
                <div />
              ) : (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </FormGroup>
          </Form>
        </div>
        <div style={{marginLeft:'32px'}}>
          <GameField
            background={backgroundStr}
            path={`{\"1\": [${positionX}, ${positionY}]}`}
            positions={`{\"${user?.username}\" : [1]}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
