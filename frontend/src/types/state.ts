import {store} from '../store/index.js';
import {Questions} from './question.js';
import {AuthorizationStatus} from '../const.js';
import {UserData} from './user-data';

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
  position: number;
  progress: string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
