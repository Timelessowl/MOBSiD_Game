/* eslint-disable */
import React, {useEffect, useState} from 'react';
import playerLogo from './player.png';
import {Table} from 'reactstrap';
import {JSONObject} from "../../types/types";
import {useAppSelector} from "../../hooks";
import {getUserData, getUsersData} from "../../store/user-process/selectors";
import {UserData} from "../../types/user-data";

type Props = {
  background: string,
  positions: string,
  path: string,
}

const GameField: React.FC<Props> = (props) => {
  const {background, positions, path} = props;

  // useEffect(() => {
  //
  //
  // }, []);


  const gameFieldRows = 20;
  const gameFieldColumns = 20;
  const user = useAppSelector(getUserData);
  const users = useAppSelector(getUsersData);
  const avatars: string[] = [];
  const cellWidth = `${100 / gameFieldColumns}%`;
  const cellHeight = `${100 / gameFieldRows}%`;
  const gameField: string[][] = [];
  for (let i = 0; i < gameFieldRows; i++) {
    gameField[i] = [];
    for (let j = 0; j < gameFieldColumns; j++) {
      gameField[i][j] = '';
    }
  }
  let positionsParsed : JSONObject = {};
  if(positions !== "" && positions !== undefined) {
    positionsParsed = JSON.parse(positions) as JSONObject;

  }

  if (path !== '' && user !== undefined) {
    const pathParsed = JSON.parse(path) as JSONObject;
    if (pathParsed[String(positionsParsed[user.username])] !== undefined){
      users?.map((_user, i)=>{
        // console.log('-----------------------------')
        gameField[(pathParsed[String(positionsParsed[_user.username])] as number[])[0]]
          [(pathParsed[String(positionsParsed[_user.username])] as number[])[1]] = _user['avatar'];
      })
    }
  }

  return (

    <div style={{float: 'right', width:'800px', height:'800px', position:'absolute', right:'0', top:'80px'}}>
      <div style={{ flex: 2, display: 'block', justifyContent: 'center', alignItems: 'stretch'}}>
        <img src={`data:image/*;base64,${background}`} alt='Image' style={{width:'100%', height:'100%', zIndex: 1, position: 'absolute'}} />
        <Table
          borderless
          style={{zIndex: 5, position:'absolute', top:'20px',width: '100%', height: '100%'}}
        >
          <tbody style={{backgroundColor:'#transparent'}}>
          {gameField.map((row, i)=>
            (<tr key={`row${gameFieldRows - i}`}>{
              row.map((cell, j)=>
                (<td key={`row${gameFieldRows - i}column${gameFieldColumns - j}`} style={{backgroundColor:'transparent', width: cellWidth, height: cellHeight}} >{
                  (cell ? <img src={`data:image/*;base64,${gameField[i][j]}`} style={{borderRadius: '50%',  width: '50px', height: '50px'}}/> : '')
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

export default GameField;
