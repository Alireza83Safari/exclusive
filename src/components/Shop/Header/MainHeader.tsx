import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import Profile from "../Profile";
import { authContext, authContextType } from "../../../context/authContext";
import MenuItem from "./MenuItem";
import { appRoutes } from "../../../routes/appRoutes";
import { HeaderSkeleton } from "../..";

function MainHeader() {
  const { userIsLogin, isLoading } = useContext(authContext) as authContextType;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const searchProducts = () => {
    navigate(`/products?searchTerm=${searchQuery.replace(/ /g, "_")}`);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      searchProducts();
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const seachTerm = searchParams.get("searchTerm");
    if (seachTerm) {
      setSearchQuery(seachTerm);
    }
  }, [location]);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className="border-b border-borderColor relative px-2">
      <div className="xl:max-w-[1280px] md:max-w-[98%] w-full h-[48px] flex justify-between items-center m-auto text-sm py-10 md:pt-14 lg:px-0 sm:px-4 px-1 relative">
        <div className="flex items-center">
          <div
            className="flex items-center mr-3 text-xl lg:hidden"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <FaBars />
          </div>
          <Link
            className="mr-10 text-2xl font-bold sm:flex hidden"
            to={appRoutes.HOME}
          >
            Exclusive
          </Link>
        </div>

        <MenuItem isMenuVisible={isMenuVisible} />

        <div className="flex items-center">
          <>
            <div
              className="bg-gray relative h-[38px] flex md:px-5 px-2 rounded-lg"
              onKeyPress={handleEnterPress}
            >
              <input
                type="text"
                className="bg-gray outline-none pr-12 md:max-w-[200px] max-w-[140px]"
                placeholder="What are you looking for?"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <img
                src="/images/search.png"
                className="w-6 absolute top-2 right-2"
                alt="Search"
                onClick={searchProducts}
              />
            </div>
            <Link to={appRoutes.CART}>
              <img src="/images/usercart.png" className="w-7 mx-2" alt="Cart" />
            </Link>

            <Link to={appRoutes.ACCOUNT_FAVORITE}>
              <img
                src="/images/heart.png"
                className="w-7 mx-2"
                alt="favorite"
              />
            </Link>
            {userIsLogin ? (
              <div className="group relative">
                <button>
                  <img
                    src="/images/profile.png"
                    className="w-7 mx-2 cursor-pointer"
                    onMouseEnter={() => setIsProfileVisible(!isProfileVisible)}
                    alt="Profile"
                  />

                  <div className="hidden group group-hover:block">
                    <Profile
                      toggleProfile={() =>
                        setIsProfileVisible(!isProfileVisible)
                      }
                    />
                  </div>
                </button>
              </div>
            ) : (
              <Link className="text-2xl" to={appRoutes.LOGIN}>
                <BiLogIn />
              </Link>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
