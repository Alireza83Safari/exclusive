import React, { useState } from "react";
import searchIcon from "../../assets/images/search.png";
import usercart from "../../assets/images/usercart.png";
import heart from "../../assets/images/heart.png";
import Profile from "../Profile";

function MainHeader() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const toggleProfile = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <div className="border-b relative">
      <div className="max-w-[1170px] h-[48px] flex justify-between items-center m-auto text-sm py-10 pt-14">
        <div className="flex">
          <h1 className="mr-10 text-2xl font-bold">Exclusive</h1>
        </div>
        <ul className="flex items-center">
          <li className="mx-5">Home</li>
          <li className="mx-5">Contact</li>
          <li className="mx-5">About</li>
          <li className="mx-5">Sign Up</li>
        </ul>
        <div className="flex items-center">
          <div className="bg-gray relative h-[38px] flex px-5 rounded-lg">
            <input
              type="text"
              className="bg-gray pr-12"
              placeholder="What are you looking for?"
            />
            <img src={searchIcon} className="w-6 absolute top-2 right-2" />
          </div>
          <img src={usercart} className="w-7 mx-2" />
          <img src={heart} className="w-7 mx-2" />
          <img
            src="/images/profile.png"
            className="w-7 mx-2 cursor-pointer"
            onMouseEnter={toggleProfile}
            onMouseLeave={toggleProfile}
          />
          {isProfileVisible && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
