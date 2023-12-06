import { Suspense, lazy, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory
import { orderUserType } from "../types/Order.type";
import {
  useDeleteOrderItemMutation,
  useGetOrderUserQuery,
} from "../Redux/apis/user/orderUserApi";
import HeaderSkelton from "../skelton/HeaderSkelton";
import { authContext, authContextType } from "../context/authContext";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Cart() {
  const { data: order, refetch } = useGetOrderUserQuery("");
  const navigate = useNavigate();
  const { userIsLogin } = useContext(authContext) as authContextType;

  useEffect(() => {
    refetch();
  }, []);

  const [deleteOrderItem, { isSuccess }] = useDeleteOrderItemMutation();
  const deleteOrderItemHandler = (id: string) => {
    deleteOrderItem(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("delete orderItem is success");
      refetch();
    }
  }, [isSuccess]);

  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      {userIsLogin ? (
        <>
          {order?.items?.length ? (
            <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto my-10 px-4 relative">
              <div className="text-center mt-20">
                <div className="grid grid-cols-4 shadow-md py-5 my-10 ">
                  <p>Product</p>
                  <p>Price</p>
                  <p>Quantity</p>
                  <p>Subtotal</p>
                </div>
                {order?.items?.map((order: orderUserType) => (
                  <div
                    className="grid grid-cols-4 shadow-md py-5 my-10 hover:bg-gray duration-300"
                    key={order.id}
                  >
                    <div className="flex justify-center items-center">
                      <img src={order?.fileUrl} className="w-10 mr-4" />
                      {order.productName}
                    </div>
                    <p>${order.price}</p>
                    <p className="mr-3">{order.quantity}</p>
                    <p>$ {order.totalPrice}</p>
                    <button
                      className=" absolute sm:right-10 right-2"
                      onClick={() =>
                        deleteOrderItemHandler(order?.productItemId)
                      }
                    >
                      <FaTrashAlt className="text-red" />
                    </button>
                  </div>
                ))}

                <div className="flex justify-between">
                  <Link
                    to="/products"
                    className="border border-borderColor py-3 px-4 hover:bg-red duration-500 hover:text-white"
                  >
                    View All Products
                  </Link>
                  <Link
                    to="/"
                    className="border border-borderColor py-3 px-4 hover:bg-red duration-500 hover:text-white"
                  >
                    Update Cart
                  </Link>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 mt-10">
                <div className="border border-borderColor px-6 py-5 rounded-sm">
                  <h3 className="font-semibold text-lg mb-3">Cart Total</h3>
                  <div className="flex justify-between py-4 border-b border-borderColor">
                    <p>Subtotal:</p>
                    <p>${order?.price}</p>
                  </div>
                  <div className="flex justify-between py-4 border-b border-borderColor">
                    <p>Shipping:</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between py-4">
                    <p>Total:</p>
                    <p>${order?.price}</p>
                  </div>
                  <div className="w-full">
                    <Link to="shipping">
                      <button className="bg-red text-white w-full py-3 hover:bg-rose-400 duration-500">
                        Shipping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="min-h-[28rem] flex justify-center items-center">
              <div className="mx-auto">
                <p className="text-4xl font-semibold">Your Cart Is Empty</p>
                <button className="bg-red text-white py-3 px-8 mt-10 flex justify-center text-center m-auto">
                  <Link to="/products">Go To Shop</Link>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>{navigate("/")}</>
      )}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default Cart;
