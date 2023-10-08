import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Profile from "../Profile";

function MainHeader() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="border-b border-borderColor relative">
      <div className="max-w-[1170px] h-[48px] flex justify-between items-center m-auto text-sm py-10 md:pt-14 lg:px-0 sm:px-4 px-1">
        <div className="flex items-center">
          <div
            className="flex items-center mr-3 text-xl lg:hidden"
            onClick={toggleMenu}
          >
            <FaBars />
          </div>
          <Link className="mr-10 text-2xl font-bold sm:flex hidden" to="/">
            Exclusive
          </Link>
        </div>

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
          {menuItems.map((item, index) => (
            <Link
              key={index}
              className="mx-5 hover:text-red lg:flex block lg:my-0 my-6 duration-200"
              to={item.link}
            >
              {item.label}
            </Link>
          ))}
        </ul>

        <div className="flex items-center">
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
            <img src="/images/usercart.png" className="w-7 mx-2" alt="Cart" />
          </Link>

          <Link to="/wishlist">
            <img src="/images/heart.png" className="w-7 mx-2" alt="Wishlist" />
          </Link>
          <Link to="/account">
            <img
              src="/images/profile.png"
              className="w-7 mx-2 cursor-pointer"
              onMouseEnter={toggleProfile}
              alt="Profile"
            />
          </Link>
          {isProfileVisible && <Profile toggleProfile={toggleProfile} />}
        </div>
      </div>
    </div>
  );
}

const menuItems = [
  { label: "Home", link: "/" },
  { label: "Contact", link: "/contact" },
  { label: "About", link: "/about" },
  { label: "Sign Up", link: "/register" },
];

export default MainHeader;
