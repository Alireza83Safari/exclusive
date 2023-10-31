import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/reduxHooks";

function PrivateRoute({ children }) {
  const { userIsLogin } = useAppSelector((state) => state.auth);

  return userIsLogin ? children : <div>You Havent access here</div>;
}

export default PrivateRoute;
