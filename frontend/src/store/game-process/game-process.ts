/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, FIRST_GAME_STEP, AuthorizationStatus } from "../../const";
import { GameProgress } from "../../types/state";
import { Question } from "../../types/question";
import { getUsersPosition, getUserProgress } from "../api-actions";

const initialState: GameProgress = {
  progressLoading: true,
  positionLoading: true,
  positions: "",
  progress: "",
};

const STEP_COUNT = 1;

export const gameProcess = createSlice({
  name: NameSpace.Game,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
        state.progressLoading = false;
      })
      .addCase(getUsersPosition.fulfilled, (state, action) => {
        state.positions = action.payload;
        state.positionLoading = false;
      });
  },
});
