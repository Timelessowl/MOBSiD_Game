import { NameSpace } from "../../const";
import { State } from "../../types/state";
import { AuthorizationStatus } from "../../const";
import { UserData, UsersData } from "../../types/user-data";

export const getAuthorizationStatus = (
  state: Pick<State, NameSpace.User>,
): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (
  state: Pick<State, NameSpace.User>,
): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: State): UserData | undefined =>
  state[NameSpace.User].user as UserData;
export const getUsersData = (state: State): UsersData | undefined =>
  state[NameSpace.User].allUsers as UsersData;
export const getUserLoading = (state: State): boolean =>
  state[NameSpace.User].loading as boolean;
