export type authType = {
  userInfo: null;
  loginError: string | null;
  error: string | null;
  loading: boolean;
  userIsLogin: boolean | null;
  registerError: string | null;
};

export type userRegisterType = {
  password: string;
  passwordConfirmation: string;
  username: string;
};

export type userLoginType = {
  username: string;
  password: string;
};
