import React, { Suspense, lazy } from "react";
import Spinner from "../components/Spinner/Spinner";
const TopHeader = lazy(() => import("../components/Header/TopHeader"));
const MainHeader = lazy(() => import("../components/Header/MainHeader"));
function Header() {
  return (
    <header>
      <Suspense fallback={<Spinner />}>
        <TopHeader />
        <MainHeader />
      </Suspense>
    </header>
  );
}

export default Header;
