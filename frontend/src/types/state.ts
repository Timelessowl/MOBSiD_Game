import {store} from '../store/index.js';
import {Questions} from './question.js';
import {AuthorizationStatus} from '../const.js';
import {UserData, UsersData} from './user-data';

export type GameData = {
  questions: Questions;
  loading: boolean;
};

export type TestData = {
  testId: number;
  title: string;
  background: File | string;
  path: string;
  allTest: TestData[];
  loading: boolean;
};

export type GameProgress = {
  loading: boolean;
  positions: string;
  progress: string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
  allUsers: UsersData | undefined;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
