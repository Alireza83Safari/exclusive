import { Link } from "react-router-dom";
import { appRoutes } from "../../../routes/appRoutes";

const CartFooter = () => {
  return (
    <div className="flex justify-between">
      <Link
        to={appRoutes.PRODUCTS}
        className="border border-borderColor py-3 px-4 hover:bg-red duration-500 hover:text-white"
      >
        View All Products
      </Link>
      <Link
        to={appRoutes.HOME}
        className="border border-borderColor py-3 px-4 hover:bg-red duration-500 hover:text-white"
      >
        Update Cart
      </Link>
    </div>
  );
};

export default CartFooter;
