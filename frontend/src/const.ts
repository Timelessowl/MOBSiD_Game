export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;

export enum AppRoute {
  Auth = '/auth',
  Root = '/',
  Game = '/game'
}

export enum APIRoute {
  Questions = '/api/questions',
  User = '/api/user',
  Login = '/api/login',
  Logout = '/api/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


export enum NameSpace {
  AuthInfo = 'AUTH_INFO',
  Data = 'DATA',
  Game = 'GAME',
  User = 'USER',
}
