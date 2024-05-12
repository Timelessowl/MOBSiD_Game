/* eslint-disable */
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {TestData} from '../../types/state';
import {getTestConfig, fetchTestsAction, getTestTimer} from '../api-actions';

const initialState: TestData = {
  testId : 0,
  title: 'test',
  loading: false,
  background: '',
  path:'',
  timer: '',
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
      .addCase(fetchTestsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestsAction.fulfilled, (state, action) => {
        state.allTest = action.payload;
        state.loading = false;
      })
      .addCase(getTestTimer.fulfilled, (state, action) => {
        state.timer = action.payload;
      });
  }
});
