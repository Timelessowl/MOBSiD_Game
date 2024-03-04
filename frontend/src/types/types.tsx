
export type userType = {
  email: string;
  username: string;
  isSuperUser: boolean;
}
export type userDataType = {
  user: userType;
};
export enum userStoreActions {
  GET_USER_INFO,
  CLEAR_USER_INFO
}


