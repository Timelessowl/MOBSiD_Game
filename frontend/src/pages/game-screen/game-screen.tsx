/* eslint-disable */
import styles from './Component.module.css'
import React, {FormEvent, useState} from 'react';
import img from './Cmonya.png';
import playerLogo from './player.png'
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getQuestions} from '../../store/game-data/selectors';
import {Button, Form, FormGroup, Input, Label, Navbar, NavbarBrand, NavItem, Table} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Question} from '../../types/question';
import {checkUserAnswer, getUserProgress} from "../../store/api-actions";
import {getPosition} from "../../store/game-process/selectors";
import {getUserData} from "../../store/user-process/selectors";
import {store} from "../../store";




const GameScreen: React.FC = () => {
  store.dispatch(getUserProgress());
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
  const gameFieldRows = 20;
  const gameFieldColumns = 20;
  const cellWidth: string = String(100/gameFieldColumns)+'%';
  const cellHeight: string = String(100/gameFieldRows)+'%';
  const gameField: string[][] = [];
  for (let i = 0; i < gameFieldRows; i++) {
    gameField[i] = [];
    for (let j = 0; j < gameFieldColumns; j++) {
      // gameField[i][j] = String.fromCharCode(65 + i) + (j + 1);
      gameField[i][j] = '';
    }
  }


  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);
  var position = useAppSelector(getPosition);
  const [positionS, setPositionS] = useState(position);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [prevQuestionIndex, setPrevQuestionIndex] = useState(-1);
  const [currQuestion, setCurrQuestion] = useState<Question>(emptyQuestion);

  gameField[positionS][positionS] = img;

  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );


  return (
    <div style={{float: "right", width:"50%", height:'100%', position:'fixed', right:"0", top:"100px"}}>
      <Button onClick={()=> setPositionS(positionS+1)}>+</Button>
      <Button onClick={()=> setPositionS(positionS-1)}>-</Button>
        <div style={{ flex: 2, display: 'block', justifyContent: 'center', alignItems: 'stretch'}}>
          <img src={img} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%', width:"100%", zIndex: 1, position: "absolute"}} />
          <Table
            borderless
            style={{zIndex: 5, position:"absolute", top:'20px',width: "100%", height: "100%"}}>
            <tbody style={{backgroundColor:"#transparent"}}>
              {gameField.map(function(row) {
                return (<tr>{
                  row.map(function(cell) {
                    return (<td style={{backgroundColor:"transparent", width: cellWidth, height: cellHeight}} >{
                      (cell ? <img src={playerLogo}/>: '')
                    }</td>)
                  })

                }</tr>)
              })
              }

            </tbody>

          </Table>
        </div>

    </div>
  );
};

export default GameScreen;
