// App.tsx
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
          <Toaster />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default Index;
