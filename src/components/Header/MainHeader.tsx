import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import Profile from "../Profile";
import { useSelector } from "react-redux";
import ContentLoaders from "../ContentLoader/ContentLoaders";
import { rootState } from "../../Redux/Store";

function MainHeader() {
  const { userIsLogin, loading } = useSelector(
    (state: rootState) => state?.auth
  );
  const [menuItems, setMenuItems] = useState([
    { label: "Home", link: "/" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
    { label: "Sign Up", link: "/register" },
  ]);
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    if (userIsLogin === true) {
      setMenuItems(menuItems.filter((menu) => menu.label !== "Sign Up"));
    }
  }, [userIsLogin]);

  return (
    <div className="border-b border-borderColor relative px-2">
      <div className="max-w-[1170px] h-[48px] flex justify-between items-center m-auto text-sm py-10 md:pt-14 lg:px-0 sm:px-4 px-1">
        {loading ? (
          <ContentLoaders width={100} height={40} />
        ) : (
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
        )}

        {isMenuVisible && (
          <ul className="items-center fixed left-4 top-32 bg-gray rounded-md z-10">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
                to={item.link}
              >
                {item.label}
              </Link>
            ))}
          </ul>
        )}

        <ul className="items-center lg:flex hidden z-10">
          {loading ? (
            <ContentLoaders width={280} height={40} />
          ) : (
            menuItems.map((item, index) => (
              <Link
                key={index}
                className="mx-5 hover:text-red lg:flex block lg:my-0 my-6 duration-200"
                to={item.link}
              >
                {item.label}
              </Link>
            ))
          )}
        </ul>

        <div className="flex items-center">
          {loading ? (
            <ContentLoaders width={300} height={40} />
          ) : (
            <>
              <div className="bg-gray relative h-[38px] flex md:px-5 px-2 rounded-lg">
                <input
                  type="text"
                  className="bg-gray outline-none pr-12 md:max-w-[200px] max-w-[140px]"
                  placeholder="What are you looking for?"
                />
                <img
                  src="/images/search.png"
                  className="w-6 absolute top-2 right-2"
                  alt="Search"
                />
              </div>
              <Link to="/cart/chechout">
                <img
                  src="/images/usercart.png"
                  className="w-7 mx-2"
                  alt="Cart"
                />
              </Link>

              <Link to="/wishlist">
                <img
                  src="/images/heart.png"
                  className="w-7 mx-2"
                  alt="Wishlist"
                />
              </Link>
              {userIsLogin ? (
                <Link to="/account">
                  <img
                    src="/images/profile.png"
                    className="w-7 mx-2 cursor-pointer"
                    onMouseEnter={() => setIsProfileVisible(!isProfileVisible)}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
