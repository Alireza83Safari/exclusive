export type authType = {
  userInfo: null;
  loginError: string | null;
  error: string | null;
  loading: boolean;
  userIsLogin: boolean | null;
  registerError: string | null;
};

export interface userLoginType {
  username: string;
  password: string;
}

export interface userRegisterType extends userLoginType {
  passwordConfirmation: string;
}

export type recoveryPasswordType = {
  phoneNumberOrEmailAddress: string | number;
};

export type setNewPasswordType = {
  password: string;
  passwordConfirmation: string;
};
