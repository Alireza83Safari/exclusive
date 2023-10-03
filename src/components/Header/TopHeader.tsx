import React from "react";
import arrowBottom from "../../assets/images/bottom.png";

function TopHeader() {
  return (
    <div className="bg-black">
      <div className="max-w-[1170px] h-[48px] flex justify-between items-center m-auto text-sm">
        <div></div>
        <div className="text-white">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span className="font-semibold">ShopNow</span>
          </p>
        </div>
        <div className="text-white flex">
          <p>English</p>
          <img src={arrowBottom} className="w-6" />
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
