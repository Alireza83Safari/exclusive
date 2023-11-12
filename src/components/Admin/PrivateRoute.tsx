import React from "react";
import { useContext } from "react";
import { authContext, authContextType } from "../../context/authContext";

function PrivateRoute(children: React.ReactNode) {
  const { userIsLogin } = useContext(authContext) as authContextType;

  return userIsLogin ? children : <div>You Havent access here</div>;
}

export default PrivateRoute;
