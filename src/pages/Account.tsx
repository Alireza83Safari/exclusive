import  { Suspense, lazy, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderSkelton from "../skelton/HeaderSkelton";
import { authContext, authContextType } from "../context/authContext";
const AccountMenu = lazy(() => import("../components/Account/AccountMenu"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Account() {
  const navigate = useNavigate();
  const { userIsLogin } = useContext(authContext) as authContextType;
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>

      {userIsLogin ? (
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
      ) : (
        <>{navigate("/")}</>
      )}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default Account;
