import { Suspense, lazy, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderSkelton from "../skelton/HeaderSkelton";
import { authContext, authContextType } from "../context/authContext";
import { FaBars } from "react-icons/fa";
const AccountMenu = lazy(() => import("../components/Account/AccountMenu"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Account() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { userIsLogin } = useContext(authContext) as authContextType;
  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>

      {userIsLogin ? (
        <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-5 relative">
          <div className="grid grid-cols-5">
            <div
              className="flex justify-center col-span-5"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaBars className="md:hidden text-xl text-center" />
            </div>
            <div className="col-span-5">
              <Suspense>{showMenu && <AccountMenu />}</Suspense>
            </div>
            <div className="col-span-1 md:block hidden">
              <Suspense>
                <AccountMenu />
              </Suspense>
              <button></button>
            </div>
            <div className="md:col-span-4 col-span-5">
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
