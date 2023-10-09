export interface AuthType {
  userInfo: null;
  loginError: string | null;
  error: string | null;
  loading: boolean;
  userIsLogin: boolean | null;
}

export type UserLoginType = {
  username: string;
  password: string;
};
