import React from "react";
import { Link } from "react-router-dom";
import { userProductType } from "../../types/Product.type";
import { addOrderItem } from "../../Redux/Store/order";
import { useDispatch } from "react-redux";
import { addOrderItemType } from "../../types/Order.type";

function ProductTemplate({
  name,
  price,
  fileUrl,
  id,
  discountValue,
  itemId,
}: userProductType) {
  const dispatch = useDispatch();

  const addProductToBasket = () => {
    let orderItemInfo = {
      productItemId: itemId,
      quantity: 1,
    } as addOrderItemType;
    dispatch(addOrderItem(orderItemInfo) as any);
  };

  return (
    <div className="relative group my-4 px-2" key={id}>
      <Link to={`/product/${id}`}>
        <div className="flex justify-center items-center sm:h-[250px] h-[220px] bg-gray relative">
          {discountValue && (
            <p className="sm:px-3 px-1 py-1 rounded-md bg-red absolute top-3 left-3 sm:text-xs text-[10px] text-white">
              {discountValue}%
            </p>
          )}

          <div className="absolute top-3 right-3">
            <div className="sm:w-8 sm:h-8 w-6 h-6 bg-white hover:bg-green duration-300 rounded-full flex justify-center items-center">
              <img src="/images/eye.png" className="sm:w-5 sm:h-5 h-4 w-4" />
            </div>
          </div>
          <button
            className="bg-black w-full absolute bottom-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            onClick={() => addProductToBasket()}
          >
            Add To Cart
          </button>
          <div className="w-9/12 h-3/4 ">
            <img
              src={`http://127.0.0.1:6060/${fileUrl}`}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <h3 className="md:text-base text-sm">{name}</h3>
          <div className="flex  my-1">
            <p className="text-red mr-4 md:text-base text-sm">${price}</p>
            <p className="line-through md:text-base text-sm">$160</p>
          </div>
          <div className="flex items-center">
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <span className="md:text-base text-sm">(88)</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductTemplate;
