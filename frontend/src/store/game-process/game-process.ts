/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';
import {isAnswerCorrect} from '../../game';
import {NameSpace, FIRST_GAME_STEP, AuthorizationStatus} from '../../const';
import {GameProgress} from '../../types/state';
import {Question} from '../../types/question';
import {checkUserAnswer, getUserProgress} from "../api-actions";

const initialState: GameProgress = {
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
      // .addCase(checkUserAnswer.fulfilled, (state, action) => {
      //   state.position = action.payload.position;
      //   state.progress = action.payload.progress;
      // })
      // .addCase(checkUserAnswer.rejected, (state) => {
      //   state.authorizationStatus = AuthorizationStatus.NoAuth;
      // })
      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.progress = action.payload.progress;
      })
      // .addCase(loginAction.rejected, (state) => {
      //   state.authorizationStatus = AuthorizationStatus.NoAuth;
      // })
      // .addCase(logoutAction.fulfilled, (state) => {
      //   state.authorizationStatus = AuthorizationStatus.NoAuth;
      // });
  }
});
