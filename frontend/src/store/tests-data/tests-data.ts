/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TestData} from '../../types/state';
import {getTestConfig, getTests} from '../api-actions';

const initialState: TestData = {
  testId : 0,
  title: 'test',
  loading: false,
  background: '',
  path:'',
  allTest: []
};

export const testData = createSlice({
  name: NameSpace.Test,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

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
        state.allTest = action.payload;
        state.loading = false;
      });
  }
});
