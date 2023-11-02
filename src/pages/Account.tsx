import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import HeaderSkelton from "../skelton/HeaderSkelton";
const AccountMenu = lazy(() => import("../components/Account/AccountMenu"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Account() {
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-5 relative">
        <div className="grid grid-cols-5">
          <div className="col-span-1">
            <Suspense>
              <AccountMenu />
            </Suspense>
          </div>
          <div className="col-span-4">
            <Outlet />
          </div>
        </div>
      </section>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default Account;
