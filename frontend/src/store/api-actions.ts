/* eslint-disable */
import axios, {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State, TestData} from '../types/state.js';
import {Question, Questions, CheckAnsData} from '../types/question';
import {APIRoute} from '../const';
import {AuthData, RegisterData} from '../types/auth-data';
import {UserData, UsersData} from '../types/user-data';
import {GameProgress, GameData} from '../types/state'


export const fetchQuestionsAction = createAsyncThunk<Questions, {testId: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async ({testId}, {extra: api}) => {
    const {data} = await api.post<Questions>(APIRoute.Questions, {testId: testId});
    return data;
  },
);

export const fetchTestsAction = createAsyncThunk<TestData[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTests',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TestData[]>(APIRoute.Tests);
    return data;
  },
);

export const fetchUsersData = createAsyncThunk<UsersData, {testId: Number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/fetchData',
  async ({testId}, {extra: api}) => {
    const {data} = await api.post<UserData[]>(APIRoute.UsersData, {testId: testId});
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

export const setActiveTest = createAsyncThunk<UserData, {testId : Number | null}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'user/setActiveTest',
  async ({testId}, {dispatch, extra: api}) => {
    const {data} = await api.post(APIRoute.SetActive,
      {
        testId: testId
      });
    return data
  }
);

export const registrationAction = createAsyncThunk<void, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async ({email,username, password, isSuperuser, adminKey, avatar}, {dispatch, extra: api}) => {
    await api.post(APIRoute.Register, {email, username, password, isSuperuser, adminKey, avatar}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
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

export const addQuestionAction = createAsyncThunk<void, Partial<Question>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'data/addQuestion',
  async (data, {dispatch, extra: api}) => {
    await api.post(APIRoute.AddQuestion,
      {
        testId: data.testId,
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

export const addTestAction = createAsyncThunk<void, Partial<TestData & Question>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'data/addQuestion',
  async (data, {dispatch, extra: api}) => {
    await api.post(APIRoute.AddTest,
      {
        title: data.title,
        text: data.text,
        withOptions: data.withOptions,
        opt1:data.opt1,
        opt2:data.opt2,
        opt3:data.opt3,
        opt4:data.opt4,
        opt5:data.opt5,
        answer: data.answer,
        path: data.path,
        background: data.background
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
  }
);

export const setTestBackground = createAsyncThunk<void, Partial<TestData>, {
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


export const getTestTimer = createAsyncThunk<string, {testId: Number, questionId: Number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'test/getTimer',
  async ({testId, questionId}, {extra: api}) => {
    const {data} = await api.post<string>(APIRoute.GetTestTimer, {testId: testId, questionId: questionId});
    return data;
  },
);

export const setTestTimer = createAsyncThunk<string, {testId: Number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'test/setTimer',
  async ({testId}, {extra: api}) => {
    const {data} = await api.post<string>(APIRoute.SetTestTimer, {testId: testId});

    return data;
  },
);


export const getTestQuestion = createAsyncThunk<number, {testId: Number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'test/getQuestion',
  async ({testId}, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.GetTestQuestion, {testId: testId});
    return data;
  },
);

export const setTestQuestion = createAsyncThunk<number, {testId: Number, currentQuestion: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'test/setQuestion',
  async ({testId, currentQuestion}, {extra: api}) => {
    const {data} = await api.post<number>(APIRoute.SetTestQuestion, {testId: testId, currentQuestion: currentQuestion});

    return data;
  },
);

export const addToTestPath = createAsyncThunk<void, {testId: number, path: [number, number]}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'test/path',
  async ({testId, path}, {dispatch, extra: api}) => {
    await api.post(APIRoute.SetTestPath, {testId: testId, path: path});
  },
);

export const getUserProgress = createAsyncThunk<string, {testId: Number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'user/progress',
  async ({testId}, {extra: api}) => {
    const {data} = await api.post(APIRoute.Progress, {testId: testId});
    return data;

  },
);

export const getUsersPosition = createAsyncThunk<string, {testId: Number }, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'user/positions',
  async ({testId}, {extra: api}) => {
    const {data} = await api.post(APIRoute.Position, {testId: testId});
    return data;

  },
);

export const getTestConfig = createAsyncThunk<TestData, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,

}>(
  'test/config',
  async (testId, {extra: api}) => {
    const {data} = await api.post(APIRoute.TestConfig, {testId: testId}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;

  },
);

