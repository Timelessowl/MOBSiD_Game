/* eslint-disable */
import React, {useEffect, useState} from 'react';
import img from './Cmonya.png';
import playerLogo from './player.png';
import { useAppSelector} from '../../hooks';
import {getBackground, getQuestionsLoading} from '../../store/game-data/selectors';
import {Button, Table} from 'reactstrap';
import {getUserProgress} from '../../store/api-actions';
import {getProgressLoading, getPosition} from '../../store/game-process/selectors';
import {store} from '../../store';
import Load from '../../components/load/load';


const GameScreen: React.FC = () => {
  store.dispatch(getUserProgress());

  const gameFieldRows = 20;
  const gameFieldColumns = 20;
  const cellWidth = `${100 / gameFieldColumns}%`;
  const cellHeight = `${100 / gameFieldRows}%`;
  const gameField: string[][] = [];
  for (let i = 0; i < gameFieldRows; i++) {
    gameField[i] = [];
    for (let j = 0; j < gameFieldColumns; j++) {
      gameField[i][j] = '';
    }
  }


  const [positionH, setPositionH] = useState(0);
  const [positionV, setPositionV] = useState(0);
  const isProgressLoading = useAppSelector(getProgressLoading);
  const isQuestionsLoading = useAppSelector(getQuestionsLoading);

  const position = useAppSelector(getPosition);

  useEffect(() => {
    if (positionV !== position){
      setPositionV(position);
      setPositionH(position);
    }

  }, [position]);

  const backgroundImg = useAppSelector(getBackground);

  gameField[positionV][positionH] = img;

  if (isProgressLoading || isQuestionsLoading){
    return <Load/>;
  }

  return (

    <div style={{float: 'right', width:'50%', height:'100%', position:'fixed', right:'0', top:'30px'}}>
      <Button onClick={()=> setPositionH(positionH + 1)}>D</Button>
      <Button onClick={()=> setPositionH(positionH - 1)}>A</Button>
      <Button onClick={()=> setPositionV(positionV + 1)}>S</Button>
      <Button onClick={()=> setPositionV(positionV - 1)}>W</Button>
      <div style={{ flex: 2, display: 'block', justifyContent: 'center', alignItems: 'stretch'}}>
        <img src={`data:image/*;base64,${backgroundImg}`} alt='Image' style={{ maxWidth: '100%', maxHeight: '100%', width:'100%', zIndex: 1, position: 'absolute'}} />
        <Table
          borderless
          style={{zIndex: 5, position:'absolute', top:'20px',width: '100%', height: '100%'}}
        >
          <tbody style={{backgroundColor:'#transparent'}}>
            {gameField.map((row, i)=>
              (<tr key={`row${gameFieldRows - i}`}>{
                row.map((cell, j)=>
                  (<td key={`row${gameFieldRows - i}column${gameFieldColumns - j}`} style={{backgroundColor:'transparent', width: cellWidth, height: cellHeight}} >{
                    (cell ? <img src={playerLogo}/> : '')
                  }</td>)
                )
              }</tr>)
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GameScreen;
