export type UserData = {
  email: string;
  username: string;
  isSuperUser: boolean;
  avatar: string;
  activeTestId: number | undefined;
};
export type UsersData = UserData[];
