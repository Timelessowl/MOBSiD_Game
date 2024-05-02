/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import img from './Cmonya.png';
import playerLogo from './player.png';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getBackground, getQuestionsLoading, getTestId} from '../../store/game-data/selectors';
import {Button, Table} from 'reactstrap';
import {getTestConfig, getUserProgress} from '../../store/api-actions';
import {getProgressLoading, getPosition} from '../../store/game-process/selectors';
import {store} from '../../store';
import Load from '../../components/load/load';

type Props = {
  // film: Film,
  // setActiveFilm: (film: Film) => void,
}
const GameScreen: React.FC<Props> = (props) => {
  const {id} = useParams();
  const testId = Number(id)
  console.log(id, testId)
  useEffect(() => {

    store.dispatch(getUserProgress());
    store.dispatch(getTestConfig(testId));

  }, []);

  const dispatch = useAppDispatch();
  const position = useAppSelector(getPosition);
  // const testId = useAppSelector(getTestId);
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

  const [positionT, setPositionT] = useState([0, 0]);



  const isProgressLoading = useAppSelector(getProgressLoading);
  const isQuestionsLoading = useAppSelector(getQuestionsLoading);

  const backgroundImg = useAppSelector(getBackground);

  gameField[positionT[0]][positionT[1]] = 'lol';

  if (isProgressLoading || isQuestionsLoading){
    return <Load/>;
  }

  return (

    <div style={{float: 'right', width:'50%', height:'100%', position:'fixed', right:'0', top:'30px'}}>
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
