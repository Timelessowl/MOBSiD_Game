export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;

export enum AppRoute {
  Auth = '/auth',
  Root = '/',
  Game = '/game/:id',
  Admin = '/admin'
}

export enum APIRoute {
  Questions = '/api/questions',
  User = '/api/user',
  Login = '/api/login',
  Register = '/api/register',
  Logout = '/api/logout',
  AddQuestion = '/api/add-question',
  CheckAnswer = '/api/check-answer',
  Progress = 'api/progress',
  SetTestBackground = 'api/set-background',
  TestConfig = 'api/test-config',
  Tests = 'api/tests'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum NameSpace {
  Data = 'DATA',
  Game = 'GAME',
  User = 'USER',
}
