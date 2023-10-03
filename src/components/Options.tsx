import React from "react";

function Options() {
  return (
    <section className="max-w-[1170px] mx-auto relative my-20">
      <div className="grid grid-cols-3 px-16">
        <div className=" text-center">
          <div className="flex justify-center items-center m-auto bg-black h-12 w-12 rounded-full border-8 border-borderColor">
            <img src="/images/truck.png" alt="s" className="w-6 h-6" />
          </div>
          <p className="text-xl font-semibold my-1 mt-3">
            FREE AND FAST DELIVERY
          </p>
          <p className="">Free delivery for all orders over $140</p>
        </div>
        <div className=" text-center">
          <div className="flex justify-center items-center m-auto bg-black h-12 w-12 rounded-full border-8 border-borderColor">
            <img src="/images/headPh.png" alt="s" className="w-6 h-6" />
          </div>
          <p className="text-xl font-semibold my-1 mt-3">
            24/7 CUSTOMER SERVICE
          </p>
          <p className="">Friendly 24/7 customer support</p>
        </div>
        <div className=" text-center">
          <div className="flex justify-center items-center m-auto bg-black h-12 w-12 rounded-full border-8 border-borderColor">
            <img src="/images/secure.png" alt="s" className="w-6 h-6" />
          </div>
          <p className="text-xl font-semibold my-1 mt-3">
            MONEY BACK GUARANTEE
          </p>
          <p>We reurn money within 30 days</p>
        </div>
      </div>
    </section>
  );
}

export default Options;
