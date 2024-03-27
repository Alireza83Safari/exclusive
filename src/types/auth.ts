export type auth = {
  userInfo: null;
  loginError: string | null;
  error: string | null;
  loading: boolean;
  userIsLogin: boolean | null;
  registerError: string | null;
};

export interface userLogin {
  username: string;
  password: string;
}

export interface userRegisterType extends userLogin {
  passwordConfirmation: string;
}

export type recoveryPasswordType = {
  phoneNumberOrEmailAddress: string | number;
};

export type setNewPasswordType = {
  password: string;
  passwordConfirmation: string;
};
