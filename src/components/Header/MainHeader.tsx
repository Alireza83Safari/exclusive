import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import Profile from "../Profile";
import HeaderSkelton from "../../skelton/HeaderSkelton";
import { authContext, authContextType } from "../../context/authContext";

function MainHeader() {
  const { userIsLogin, isLoading, userInfos } = useContext(
    authContext
  ) as authContextType;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    { label: "Admin Panel", link: "/admin" },
    { label: "Home", link: "/" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
    { label: "Products", link: "/products" },
    { label: "Sign Up", link: "/register" },
  ]);
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    if (userIsLogin) {
      setMenuItems((prevItems) =>
        prevItems.filter((menu) => menu.label !== "Sign Up")
      );

      if (
        !(userInfos?.role?.name === "admin" || userInfos?.role?.name === "root")
      ) {
        setMenuItems((prevItems) =>
          prevItems.filter((menu) => menu.label !== "Admin Panel")
        );
      }
    }
  }, [userIsLogin, userInfos]);

  const searchProducts = () => {
    navigate(`/search/product?searchTerm=${searchQuery.replace(/ /g, "_")}`);
    setSearchQuery("");
  };
  const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      searchProducts();
    }
  };

  return (
    <div className="border-b border-borderColor relative px-2">
      <div className="xl:max-w-[1280px] md:max-w-[98%] w-full h-[48px] flex justify-between items-center m-auto text-sm py-10 md:pt-14 lg:px-0 sm:px-4 px-1">
        {isLoading ? (
          <HeaderSkelton />
        ) : (
          <>
            <div className="flex items-center">
              <div
                className="flex items-center mr-3 text-xl lg:hidden"
                onClick={() => setIsMenuVisible(!isMenuVisible)}
              >
                <FaBars />
              </div>
              <Link className="mr-10 text-2xl font-bold sm:flex hidden" to="/">
                Exclusive
              </Link>
            </div>

            {isMenuVisible && (
              <ul className="items-center fixed left-4 top-32 bg-gray rounded-md z-10">
                {menuItems?.map((item, index) => (
                  <Link
                    key={index}
                    className={`mx-5 hover:text-red lg:flex block lg:my-0 my-6 ${
                      item.label === `Admin Panel` ? `font-bold text-base` : ``
                    } `}
                    to={item.link}
                  >
                    {item.label}
                  </Link>
                ))}
              </ul>
            )}

            <ul className="items-center lg:flex hidden z-10">
              {menuItems?.map((item, index) => (
                <Link
                  key={index}
                  className={`mx-5 hover:text-red lg:flex block lg:my-0 my-6 duration-200 ${
                    item.label === `Admin Panel` ? `font-bold text-base` : ``
                  } `}
                  to={item.link}
                >
                  {item.label}
                </Link>
              ))}
            </ul>

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
                <Link to="/cart">
                  <img
                    src="/images/usercart.png"
                    className="w-7 mx-2"
                    alt="Cart"
                  />
                </Link>

                <Link to="/account/favorite">
                  <img
                    src="/images/heart.png"
                    className="w-7 mx-2"
                    alt="favorite"
                  />
                </Link>
                {userIsLogin ? (
                  <Link to="/account/userInfo">
                    <img
                      src="/images/profile.png"
                      className="w-7 mx-2 cursor-pointer"
                      onMouseEnter={() =>
                        setIsProfileVisible(!isProfileVisible)
                      }
                      alt="Profile"
                    />
                  </Link>
                ) : (
                  <Link className="text-2xl" to="/login">
                    <BiLogIn />
                  </Link>
                )}
                {isProfileVisible && (
                  <Profile
                    toggleProfile={() => setIsProfileVisible(!isProfileVisible)}
                  />
                )}
              </>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainHeader;
