/* eslint-disable */
import axios, {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Question, Questions, CheckAnsData} from '../types/question';
import {APIRoute} from '../const';
import {AuthData, RegisterData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {GameProgress, GameData} from '../types/state'


export const fetchQuestionAction = createAsyncThunk<Questions, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Questions>(APIRoute.Questions);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.User);
    return data;
  },
);
export const registrationAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async ({email,username, password, isSuperuser, adminKey}, {dispatch, extra: api}) => {
    await api.post(APIRoute.Register, {email, username, password, isSuperuser, adminKey});
    dispatch(loginAction({
      email: email,
      password: password,
    }));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
   await api.post(APIRoute.Login, {email, password});
    dispatch(checkAuthAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.post(APIRoute.Logout, {withCredentials: true});
  },
);

export const addQuestionAction = createAsyncThunk<void, Question, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'data/addQuestion',
  async (data, {dispatch, extra: api}) => {
    await api.post(APIRoute.AddQuestion,
      {
        text: data.text,
        withOptions: data.withOptions,
        opt1:data.opt1,
        opt2:data.opt2,
        opt3:data.opt3,
        opt4:data.opt4,
        opt5:data.opt5,
        answer: data.answer

    });
  },
);

export const checkUserAnswer = createAsyncThunk<void, CheckAnsData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'data/checkUserAnswer',
  async ({questionId, userAnswer}, {dispatch, extra: api}) => {
      await api.post(APIRoute.CheckAnswer,
      {
        id: questionId,
        answer: userAnswer
      });
      dispatch(getUserProgress);
  }
);

export const setTestBackground = createAsyncThunk<void, GameData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'test/background',
  async ({testId, background}, {dispatch, extra: api}) => {
    await api.post(APIRoute.SetTestBackground, {testId: testId, background}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
);

export const getUserProgress = createAsyncThunk<GameProgress, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'user/progress',
  async (_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.Progress);
    return data;

  },
);

export const getTestConfig = createAsyncThunk<GameData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'test/config',
  async (_arg, {extra: api}) => {
    const {data} = await api.get(APIRoute.TestConfig, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;

  },
);
