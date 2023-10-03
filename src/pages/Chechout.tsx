import React from "react";

function Chechout() {
  return (
    <section className="max-w-[1170px] mx-auto my-10 relative">
      <div className="grid grid-cols-2 mt-20">
        <form className="pr-32">
          <h1 className="text-4xl">Billing Details</h1>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              First Name*
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              Company Name
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              Street Address*
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              Apartment, floor, etc. (optional)
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              Town/City*
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              Phone Number*
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="mt-5">
            <label htmlFor="" className="text-[#999999]">
              Email Address*
            </label>
            <input type="text" className="bg-gray w-full py-2 mt-2" w-full />
          </div>
          <div className="flex mt-5">
            <input
              type="checkbox"
              name=""
              id=""
              className="checked:text-red mr-2"
            />
            <p>Save this information for faster check-out next time</p>
          </div>
        </form>

        <div className="pl-32">
          <div className="flex items-center justify-between my-7">
            <div className="flex items-center">
              <img src="/images/product-1.png" className="w-10 mr-4" />
              <p>LCD Monitor</p>
            </div>
            <p>$650</p>
          </div>

          <div className="flex items-center justify-between my-10">
            <div className="flex items-center">
              <img src="/images/monitor.png" className="w-10 mr-4" />
              <p>H1 Gamepad</p>
            </div>
            <p>$1100</p>
          </div>

          <div className="flex justify-between py-4 border-b">
            <p>Subtotal:</p>
            <p>$1750</p>
          </div>
          <div className="flex justify-between py-4 border-b">
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between py-4">
            <p>Total:</p>
            <p>$1750</p>
          </div>

          <div className="flex justify-between items-center mt-5">
            <div className="flex">
              <input type="radio" name="Bank" id="" className="mr-3" />
              <p>Bank</p>
            </div>
            <img src="/images/bank.png" alt="" className="h-8" />
          </div>
          <div className="flex mt-5">
            <input type="radio" name="Bank" id="" className="mr-3" />
            <p>Cash on delivery</p>
          </div>

          <div className="w-full grid grid-cols-12 mt-8">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border py-3 col-span-8 pl-4"
            />
            <button className="bg-red text-white py-3 col-span-4 ml-4">
              Apply Coupon
            </button>
          </div>
          <button className="bg-red text-white py-3 px-5 mt-5">
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default Chechout;
