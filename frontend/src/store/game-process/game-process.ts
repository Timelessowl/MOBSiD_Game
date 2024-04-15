/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';
import {isAnswerCorrect} from '../../game';
import {NameSpace, FIRST_GAME_STEP, AuthorizationStatus} from '../../const';
import {GameProgress} from '../../types/state';
import {Question} from '../../types/question';
import {checkUserAnswer, getUserProgress} from "../api-actions";

const initialState: GameProgress = {
  loading: true,
  position: 0,
  progress: '',
};

const STEP_COUNT = 1;

export const gameProcess = createSlice({
  name: NameSpace.Game,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.progress = action.payload.progress;
        state.loading = false;
      })

  }
});
