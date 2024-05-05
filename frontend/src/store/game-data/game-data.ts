import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GameData} from '../../types/state';
import {fetchQuestionsAction} from '../api-actions';

const initialState: GameData = {
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
      });
  }
});
