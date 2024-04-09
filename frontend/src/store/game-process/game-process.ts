/* eslint-disable */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isAnswerCorrect} from '../../game';
import {NameSpace, FIRST_GAME_STEP} from '../../const';
import {GameProcess} from '../../types/state';
import {Question} from '../../types/question';

const initialState: GameProcess = {
  position: 0,
  step: FIRST_GAME_STEP,
};

const STEP_COUNT = 1;

export const gameProcess = createSlice({
  name: NameSpace.Game,
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step = state.step + STEP_COUNT;
    },

    resetGame: (state) => {
      state.position = 0;
      state.step = FIRST_GAME_STEP;
    },
  },
});

export const {incrementStep, resetGame} = gameProcess.actions;
