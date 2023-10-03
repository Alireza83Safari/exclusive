import React from "react";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import phone from "../../assets/images/phone.png";
import computer from "../../assets/images/computer.png";
import whatches from "../../assets/images/whaches.png";
import camera from "../../assets/images/camera.png";
import headPhone from "../../assets/images/headPhone.png";
import gaming from "../../assets/images/gaming.png";

function Category() {
  return (
    <section className="max-w-[1170px] mx-auto py-20 border-b border-borderColor">
      <p className="text-red my-4 font-semibold">Categories</p>
      <div className="flex justify-between">
        <h2 className="text-4xl mb-10 font-semibold">Browse By Category</h2>
        <div className="flex">
          <div className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2">
            <img src={left} className="w-5" />
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2">
            <img src={right} className="w-5" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="border border-borderColor rounded-md p-4 w-44 h-44 flex justify-center items-center">
          <div className="">
            <img src={phone} className="w-14 h-14 object-contain m-auto" />
            <p>Phones</p>
          </div>
        </div>
        <div className="border border-borderColor rounded-md p-4 w-44 h-44 flex justify-center items-center">
          <div className="">
            <img src={computer} className="w-14 h-14 object-contain m-auto" />
            <p>Computers</p>
          </div>
        </div>
        <div className="border border-borderColor rounded-md p-4 w-44 h-44 flex justify-center items-center">
          <div>
            <img src={whatches} className="w-14 h-14 object-contain m-auto" />
            <p>SmartWatch</p>
          </div>
        </div>
        <div className="border border-borderColor rounded-md p-4 w-44 h-44 flex justify-center items-center">
          <div>
            <img src={camera} className="w-14 h-14 object-contain m-auto" />
            <p>Camera</p>
          </div>
        </div>
        <div className="border border-borderColor rounded-md p-4 w-44 h-44 flex justify-center items-center">
          <div>
            <img src={headPhone} className="w-14 h-14 object-contain m-auto" />
            <p>HeadPhones</p>
          </div>
        </div>
        <div className="border border-borderColor rounded-md p-4 w-44 h-44 flex justify-center items-center">
          <div>
            <img src={gaming} className="w-14 h-14 object-contain m-auto" />
            <p>Gaming</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
