import { Link } from "react-router-dom";
import { userProductTypeWithLoading } from "../../types/Product.type";
import { addOrderItemType } from "../../types/Order.type";
import ContentLoaders from "../ContentLoaders";
import toast from "react-hot-toast";
import { useCreateOrderItemMutation } from "../../Redux/apis/user/orderUserApi";
import "../ProductDetails/Star.css";

function ProductTemplate({
  name,
  price,
  fileUrl,
  id,
  discountValue,
  itemId,
  categoryName,
  quantity,
  productsLoading,
  rate,
}: userProductTypeWithLoading) {
  const [createOrderItem] = useCreateOrderItemMutation();
  const addProductToBasket = () => {
    let orderItemInfo = {
      productItemId: itemId,
      quantity: 1,
    } as addOrderItemType;
    createOrderItem(orderItemInfo)
      .unwrap()
      .then(() => toast.success(`${name} Added To Cart`));
  };

  return (
    <div
      className="relative group my-4 mx-2 px-2 z-10"
      key={id}
      style={{
        background:
          "radial-gradient(circle, rgb(255, 255, 255) 30%, rgba(190, 190, 190, 0.3) 97%)",
      }}
    >
      <div className="flex justify-center items-center sm:h-[250px] h-[220px] bg-gra relative">
        {discountValue && (
          <p className="sm:px-3 px-1 py-1 rounded-md bg-red absolute top-3 left-3 sm:text-xs text-[10px] text-white">
            {discountValue}%
          </p>
        )}

        <div className="absolute top-3 right-3">
          <Link
            to={`/product/${id}`}
            className="sm:w-8 sm:h-8 w-6 h-6 bg-white hover:bg-green duration-300 rounded-full flex justify-center items-center"
          >
            <img src="/images/eye.png" className="sm:w-5 sm:h-5 h-4 w-4" />
          </Link>
        </div>
        <button
          className="bg-black w-full absolute bottom-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          onClick={() => addProductToBasket()}
        >
          Add To Cart
        </button>
        <Link to={`/product/${id}`} className="w-9/12 h-3/4 ">
          <img
            src={fileUrl}
            className="object-contain md:w-full md:h-full w-10/12 h-5/6"
            loading="lazy"
          />
        </Link>
      </div>
      <Link to={`/product/${id}`} className="mt-2">
        {productsLoading ? (
          <ContentLoaders width={100} height={20} />
        ) : (
          <h3 className="font-semibold md:text-lg text-base">{name}</h3>
        )}
        <div className="flex justify-between mt-2">
          <p className="text-emerald-600 font-semibold md:text-base text-sm">
            {categoryName}
          </p>
          <p className="md:text-base text-sm sm:block hidden">
            quantity:{quantity}
          </p>
        </div>

        {productsLoading ? (
          <div className="my-1">
            <ContentLoaders width={100} height={20} />
          </div>
        ) : (
          <div className="flex mt-2">
            <p className="text-red mr-4 md:text-base text-sm font-bold">
              ${discountValue ? price - (discountValue / 100) * price : price}
            </p>
            <p className="line-through md:text-base text-sm">
              {discountValue ? `$ ${price}` : ""}
            </p>
          </div>
        )}

        {productsLoading ? (
          <div className="my-1">
            <ContentLoaders width={200} height={40} />
          </div>
        ) : (
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              <i data-star={rate}></i>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

export default ProductTemplate;
