import React from "react";
import apple from "../../assets/images/apple.png";
import arrowRight from "../../assets/images/arrowRight.png";
import iphoneBanner from "../../assets/images/iphoneBanner.png";

function Banner() {
  return (
    <div className="col-span-10  py-8" >
      <div className="w-[892px] h-[344px] bg-black px-16 grid grid-cols-2  absolute right-1">
        <div className="">
          <div className="flex items-center pt-14">
            <img src={apple} className="w-10" />
            <p className="text-white ml-">iPhone 14 Series</p>
          </div>
          <div className="text-white text-5xl font-semibold my-5">
            Up to 10% <br /> off Voucher
          </div>
          <div className="text-white flex  items-center">
            <p className="mr-3">Shop Now</p>
            <img src={arrowRight} className="w-4" />
          </div>
        </div>
        <div className=" h-[344px]">
          <img src={iphoneBanner} className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
