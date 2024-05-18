import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, AuthorizationStatus } from "../../const";
import { UserProcess } from "../../types/state";
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchUsersData,
  setActiveTest,
} from "../api-actions";
import { setActiveTestId } from "../action";

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  allUsers: undefined,
  loading: true,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.loading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(setActiveTest.fulfilled, (state, action) => {
        if (state.user) {
          state.user.activeTestId = action.payload.activeTestId;
        }
      })
      .addCase(setActiveTestId, (state, action) => {
        if (state.user) {
          state.user.activeTestId = action.payload;
        }
      })

      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});
