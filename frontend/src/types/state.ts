import { store } from "../store/index.js";
import { Questions } from "./question.js";
import { AuthorizationStatus } from "../const.js";
import { UserData, UsersData } from "./user-data";

export type GameData = {
  currentQuestion: number;
  questions: Questions;
  loading: boolean;
};

export type TestData = {
  testId: number;
  title: string;
  background: File | string;
  path: string;
  timer: string;
  allTest: TestData[];
  loading: boolean;
};

export type GameProgress = {
  progressLoading: boolean;
  positionLoading: boolean;
  positions: string;
  progress: string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | undefined;
  allUsers: UsersData | undefined;
  loading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
