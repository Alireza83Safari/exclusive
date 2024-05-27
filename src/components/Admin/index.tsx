import Header from "./Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext, authContextType } from "../../context/authContext";

function Index() {
  const { userIsLogin } = useContext(authContext) as authContextType;
  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      {userIsLogin ? (
        <>
          <Header />
          <div className="xl:container xl:mx-auto">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default Index;
