/* eslint-disable */
import React, {FormEvent, useEffect, useState} from 'react';
import img from './Cmonya.png';
import playerLogo from './player.png'
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getQuestions} from '../../store/game-data/selectors';
import {Button, Form, FormGroup, Input, Label, Navbar, NavbarBrand, NavItem, Table} from 'reactstrap';
import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Question} from '../../types/question';
import {checkUserAnswer, getUserProgress} from "../../store/api-actions";
import {getLoading, getPosition} from "../../store/game-process/selectors";
import {getUserData} from "../../store/user-process/selectors";
import {store} from "../../store";
import Load from "../../components/load/load";




const GameScreen: React.FC = () => {
  store.dispatch(getUserProgress());

  const gameFieldRows = 20;
  const gameFieldColumns = 20;
  const cellWidth: string = String(100/gameFieldColumns)+'%';
  const cellHeight: string = String(100/gameFieldRows)+'%';
  const gameField: string[][] = [];
  for (let i = 0; i < gameFieldRows; i++) {
    gameField[i] = [];
    for (let j = 0; j < gameFieldColumns; j++) {
      gameField[i][j] = '';
    }
  }


  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);

  var position = useAppSelector(getPosition);


  const [positionH, setPositionH] = useState(0);
  const [positionV, setPositionV] = useState(0);

  useEffect(() => {
    if (positionV !== position){
      setPositionV(position);
      setPositionH(position);
      console.log(positionH, positionV, position)
    }

  }, [position]);
  if (useAppSelector(getLoading)){
    return <Load/>;
  }




  gameField[positionV][positionH] = img;

  const handleAuthButtonClick = () => (
    navigate(AppRoute.Auth)
  );


  return (

    <div style={{float: "right", width:"50%", height:'100%', position:'fixed', right:"0", top:"30px"}}>
      <Button onClick={()=> setPositionH(positionH+1)}>D</Button>
      <Button onClick={()=> setPositionH(positionH-1)}>A</Button>
      <Button onClick={()=> setPositionV(positionV+1)}>S</Button>
      <Button onClick={()=> setPositionV(positionV-1)}>W</Button>
        <div style={{ flex: 2, display: 'block', justifyContent: 'center', alignItems: 'stretch'}}>
          <img src={img} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%', width:"100%", zIndex: 1, position: "absolute"}} />
          <Table
            borderless
            style={{zIndex: 5, position:"absolute", top:'20px',width: "100%", height: "100%"}}>
            <tbody style={{backgroundColor:"#transparent"}}>
              {gameField.map((row)=> {
                return (<tr>{
                  row.map((cell)=> {
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
