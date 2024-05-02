/* eslint-disable */
import React, {useEffect, useState} from 'react';
import img from './Cmonya.png';
import playerLogo from './player.png';
import {Table} from 'reactstrap';
import {JSONObject} from "../../types/types";

type Props = {
  background: string,
  position: number,
  path: string
}

const GameField: React.FC<Props> = (props) => {
  const {background, position, path} = props;

  // useEffect(() => {
  //
  //
  // }, []);


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

  if (path !== '') {
    const pathParsed = JSON.parse(path) as JSONObject;
    if (pathParsed[position] !== undefined){

      gameField[(pathParsed[position] as number[])[0]][(pathParsed[position] as number[])[1]] = 'kek'
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

export default GameField;
