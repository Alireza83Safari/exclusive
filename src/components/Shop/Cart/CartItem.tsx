import { FaTrashAlt } from "react-icons/fa";
import { orderUserApi } from "../../../Redux";
import { orderUserType } from "../../../types/order";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface CartItemProps {
  order: orderUserType;
  refetch: any;
}

const CartItem = (props: CartItemProps) => {
  const { order, refetch } = props;

  const [deleteOrderItem, { isSuccess }] =
    orderUserApi.useDeleteOrderItemMutation();

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
    <div className="grid sm:grid-cols-5 grid-cols-4 shadow-md py-5 h-[100px] my-10 hover:bg-gray duration-300 relative">
      <div className="flex justify-center items-center">
        <img src={order?.fileUrl} className="w-10 mr-4" />
        {order.productName}
      </div>
      <p className="flex justify-center items-center">${order.price}</p>
      <p className="mr-3 sm:flex hidden justify-center items-center">
        {order.quantity}
      </p>
      <p className="flex justify-center items-center">$ {order.totalPrice}</p>
      <button
        className="flex justify-center items-center"
        onClick={() => deleteOrderItemHandler(order?.productItemId)}
      >
        <FaTrashAlt className="text-red" />
      </button>
    </div>
  );
};

export default CartItem;
