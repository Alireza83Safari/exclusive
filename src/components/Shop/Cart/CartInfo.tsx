import { Link } from "react-router-dom";
import { orderUserType } from "../../../types/order";
import { appRoutes } from "../../../routes/appRoutes";

interface CartInfoProps {
  order: orderUserType;
}
const CartInfo = (props: CartInfoProps) => {
  const { order } = props;
  return (
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
          <Link to={appRoutes.CART_SHIPPING}>
            <button className="bg-red text-white w-full py-3 hover:bg-rose-400 duration-500">
              Shipping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
