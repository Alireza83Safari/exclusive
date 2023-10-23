import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useGetOrderUserQuery } from "../Redux/apis/orderApi"; 
import Spinner from "../components/Spinner/Spinner";
import { orderUserType } from "../types/Order.type";
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Cart() {
  const { data: order } = useGetOrderUserQuery("");

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto my-10 relative">
        <div className="text-center mt-20">
          <div className="grid grid-cols-4 shadow-md py-5 my-10 ">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {order?.items?.map((order: orderUserType) => (
            <div className="grid grid-cols-4 shadow-md py-5 my-10 hover:bg-gray duration-300">
              <div className="flex justify-center items-center">
                <img
                  src={`http://127.0.0.1:6060/${order.fileUrl}`}
                  className="w-10 mr-4"
                />
                {order.productName}
              </div>
              <p>${order.price}</p>
              <p className="mr-3">{order.quantity}</p>
              <p>$ {order.totalPrice}</p>
            </div>
          ))}

          <div className="flex justify-between">
            <Link
              to="/products"
              className="border py-3 px-4 hover:bg-red duration-500 hover:text-white"
            >
              View All Products
            </Link>
            <Link
              to="/"
              className="border py-3 px-4 hover:bg-red duration-500 hover:text-white"
            >
              Update Cart
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-10">
          <div className="border px-6 py-5 rounded-sm">
            <h3 className="font-semibold text-lg mb-3">Cart Total</h3>
            <div className="flex justify-between py-4 border-b">
              <p>Subtotal:</p>
              <p>${order?.price}</p>
            </div>
            <div className="flex justify-between py-4 border-b">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between py-4">
              <p>Total:</p>
              <p>${order?.price}</p>
            </div>
            <div className="w-full">
              <Link to="shipping">
                <button className="bg-red text-white w-full py-3 hover:bg-gray duration-500 hover:text-red">
                  Shipping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Cart;
