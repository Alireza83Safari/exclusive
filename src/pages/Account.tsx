import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
const AccountMenu = lazy(() => import("../components/Account/AccountMenu"));

function Account() {
  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-5 relative">
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Suspense fallback={<Spinner />}>
            <AccountMenu />
          </Suspense>
        </div>
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Account;
