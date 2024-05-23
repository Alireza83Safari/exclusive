import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AccountMenu } from "../../components";
import { authContext, authContextType } from "../../context/authContext";
import { ShopLayout } from "../../layout";

function Account() {
  const { userIsLogin } = React.useContext(authContext) as authContextType;
  const [showMenu, setShowMenu] = React.useState(false);

  if (!userIsLogin) {
    <Navigate to="/" />;
  }

  return (
    <ShopLayout>
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
        </div>
        <div className="md:col-span-4 col-span-5">
          <Outlet />
        </div>
      </div>
    </ShopLayout>
  );
}

export default Account;
