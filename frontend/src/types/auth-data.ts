export type AuthData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  username: string;
  password: string;
  isSuperuser: boolean;
  adminKey: string;
};
