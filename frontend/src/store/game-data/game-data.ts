import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GameData} from '../../types/state';
import {fetchQuestionsAction, getTestConfig, getTests} from '../api-actions';

const initialState: GameData = {
  totalTests : [0],
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

      .addCase(getTestConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestConfig.fulfilled, (state, action) => {
        state.background = action.payload.background as string;
        state.path = action.payload.path;
        state.loading = false;
      })
      .addCase(getTestConfig.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTests.fulfilled, (state, action) => {
        state.totalTests = action.payload;
        state.loading = false;
      });
  }
});
