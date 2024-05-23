import { createContext, useEffect, useState } from "react";
import { authUserApi } from "../Redux";

export type authContextProviderType = {
  children: React.ReactNode;
};

export type userInfosType = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  mobile: string;
  role: {
    code: string;
    createdAt: string;
    createdBy: string;
    createdById: string;
    id: string;
    isSystem: true;
    name: string;
    permissions: string[];
    updatedAt: string;
    updatedBy: string;
    updatedById: string;
  };
};

export type authContextType = {
  userIsLogin: boolean | null;
  setUserIsLogin: (value: boolean) => void;
  userInfos: userInfosType | null;
  isLoading: boolean;
  userPermissions: string[];
  refetch: any;
};

export const authContext = createContext<authContextType | null>(null);

export const AuthContextProvider = ({ children }: authContextProviderType) => {
  const { data, isSuccess, isLoading, refetch } =
    authUserApi.useUserIsAuthenticatedQuery("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [userIsLogin, setUserIsLogin] = useState<null | boolean>(false);
  const [userInfos, setUserInfos] = useState<userInfosType | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setUserInfos(data);
      setUserIsLogin(true);
      setUserPermissions(data?.role?.permissions);
    }
  }, [isSuccess]);

  return (
    <authContext.Provider
      value={{
        userIsLogin,
        setUserIsLogin,
        userInfos,
        isLoading,
        userPermissions,
        refetch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
