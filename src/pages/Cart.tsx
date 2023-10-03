import React from "react";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <section className="max-w-[1170px] mx-auto my-10 relative">
      <div className="text-center mt-20">
        <div className="grid grid-cols-4 shadow-md py-5 my-10 ">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="grid grid-cols-4 shadow-md py-5 my-10">
          <div className="flex justify-center items-center">
            <img src="/images/monitor.png" className="w-10 mr-4" /> LCD Monitor
          </div>
          <p>$650</p>
          <div className="flex justify-center items-center">
            <div className="border border-gray w-14 flex py-2 px-2">
              <p className="mr-3">01</p>
              <div>
                <img src="/images/upSmall.png" className="mb-2 w-3" />
                <img src="/images/downSmall.png" className="mt-2 w-3" />
              </div>
            </div>
          </div>
          <p>$650</p>
        </div>
        <div className="grid grid-cols-4 shadow-md py-5 my-10">
          <div className="flex justify-center items-center">
            <img src="/images/product-1.png" className="w-10 mr-4" /> LCD
            Monitor
          </div>
          <p>$650</p>
          <div className="flex justify-center items-center">
            <div className="border border-gray w-14 flex py-2 px-2">
              <p className="mr-3">01</p>
              <div>
                <img src="/images/upSmall.png" className="mb-2 w-3" />
                <img src="/images/downSmall.png" className="mt-2 w-3" />
              </div>
            </div>
          </div>
          <p>$650</p>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="border py-3 px-4">
            View All Products
          </Link>
          <Link to="/" className="border py-3 px-4">
            Update Cart
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-32">
        <div className="w-full">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border px-7 py-3"
          />
          <button className="bg-red text-white py-3 px-4 ml-5">
            Apply Coupon
          </button>
        </div>
        <div className="border px-6 py-5 rounded-sm">
          <h3 className="font-semibold text-lg mb-3">Cart Total</h3>
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
          <div className="flex justify-center">
            <button className="bg-red text-white py-4 px-5">
              View All Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
