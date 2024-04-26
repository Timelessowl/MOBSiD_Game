import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GameData} from '../../types/state';
import {fetchQuestionAction, getTestConfig} from '../api-actions';

const initialState: GameData = {
  testId : 0,
  questions: [],
  loading: false,
  background: '',
  path:''
};

export const gameData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestionAction.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestionAction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getTestConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestConfig.fulfilled, (state, action) => {
        state.background = action.payload.background as string;
        state.loading = false;
      })
      .addCase(getTestConfig.rejected, (state) => {
        state.loading = false;
      });

  }
});
