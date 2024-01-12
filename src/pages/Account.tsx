import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authContext, authContextType } from "../context/authContext";
import { FaBars } from "react-icons/fa";
import { AccountMenu, Footer, Header } from "../components";

function Account() {
  const { userIsLogin } = React.useContext(authContext) as authContextType;
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <>
      <Header />

      {userIsLogin ? (
        <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-5 relative">
          <div className="grid grid-cols-5">
            <div
              className="flex justify-center col-span-5"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaBars className="md:hidden text-xl text-center" />
            </div>
            <div className="col-span-5">{showMenu && <AccountMenu />}</div>
            <div className="col-span-1 md:block hidden">
              <AccountMenu />

              <button></button>
            </div>
            <div className="md:col-span-4 col-span-5">
              <Outlet />
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/" />
      )}

      <Footer />
    </>
  );
}

export default Account;
