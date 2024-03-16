// export type UserData = {
//   id: number;
//   email: string;
//   token: string;
// };

export type userType = {
  email: string;
  username: string;
  isSuperUser: boolean;
}
export type UserData = {
  user: userType;
};
