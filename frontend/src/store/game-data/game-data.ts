import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { GameData } from "../../types/state";
import {
  fetchQuestionsAction,
  getTestQuestion,
  setTestQuestion,
} from "../api-actions";
import { setTestCurrentQuestion } from "../action";

const initialState: GameData = {
  currentQuestion: -1,
  questions: [],
  loading: false,
};

export const gameData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionsAction.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestionsAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(setTestQuestion.fulfilled, (state, action) => {
        state.currentQuestion = action.payload;
      })
      .addCase(getTestQuestion.fulfilled, (state, action) => {
        state.currentQuestion = action.payload;
      })
      .addCase(setTestCurrentQuestion, (state, action) => {
        state.currentQuestion = action.payload;
      });
  },
});
