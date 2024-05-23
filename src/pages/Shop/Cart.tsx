import React from "react";
import { Link, Navigate } from "react-router-dom";
import { orderUserType } from "../../types/order";
import { orderUserApi } from "../../Redux/apis/user/orderUserApi";
import { authContext, authContextType } from "../../context/authContext";
import { appRoutes } from "../../routes/appRoutes";
import { ShopLayout } from "../../layout";
import {
  CartHeader,
  CartItem,
  CartInfo,
  CartFooter,
  CartSkeleton,
} from "../../components";

function Cart() {
  const {
    data: order,
    refetch,
    isLoading,
  } = orderUserApi.useGetOrderUserQuery("");

  const { userIsLogin } = React.useContext(authContext) as authContextType;

  if (!userIsLogin) {
    <Navigate to="/" />;
  }

  if (!order?.items?.length) {
    return (
      <div className="min-h-[28rem] flex justify-center items-center">
        <div className="mx-auto">
          <p className="text-4xl font-semibold">Your Cart Is Empty</p>
          <button className="bg-red text-white py-3 px-8 mt-10 flex justify-center text-center m-auto">
            <Link to={appRoutes.PRODUCTS}>Go To Shop</Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <ShopLayout>
      {isLoading ? (
        <CartSkeleton />
      ) : (
        <div className="mx-4">
          <CartHeader />

          {order?.items?.map((order: orderUserType) => (
            <CartItem order={order} refetch={refetch} key={order.id} />
          ))}

          <CartFooter />
          <CartInfo order={order} />
        </div>
      )}
    </ShopLayout>
  );
}

export default Cart;
