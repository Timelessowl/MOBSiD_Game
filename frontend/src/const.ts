export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;

export enum AppRoute {
  Auth = "/auth",
  Root = "/",
  Game = "/game/:id",
  Admin = "/admin",
}

export enum APIRoute {
  Questions = "/api/questions",
  User = "/api/user",
  UsersData = "api/users-data",
  Login = "/api/login",
  Register = "/api/register",
  Logout = "/api/logout",
  AddQuestion = "/api/add-question",
  CheckAnswer = "/api/check-answer",
  Progress = "api/progress",
  Position = "api/positions",
  SetTestBackground = "api/set-background",
  SetTestPath = "api/set-test-path",
  SetTestTimer = "api/set-timer",
  GetTestTimer = "api/get-timer",
  GetTestQuestion = "api/get-current-question",
  SetTestQuestion = "api/set-current-question",
  TestConfig = "api/test-config",
  Tests = "api/tests",
  SetActive = "api/set-active-test",
  AddTest = "api/add-test",
}

export enum AuthorizationStatus {
  Auth = "AUTH",
  NoAuth = "NO_AUTH",
  Unknown = "UNKNOWN",
}

export enum NameSpace {
  Data = "DATA",
  Game = "GAME",
  User = "USER",
  Test = "TEST",
}
