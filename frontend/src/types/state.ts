import {store} from '../store/index.js';
import {Questions} from './question.js';
import {AuthorizationStatus} from '../const.js';
import {UserData} from './user-data';

export type GameData = {
  questions: Questions;
  isQuestionsDataLoading: boolean;
  hasError: boolean;
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
