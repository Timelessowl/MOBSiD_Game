
export type userType = {
  email: string;
  username: string;
  isSuperUser: boolean;
}
export type UserData = {
  user: userType;
};

export type UserProgress = {
  position: number;
  progress: string;
};
