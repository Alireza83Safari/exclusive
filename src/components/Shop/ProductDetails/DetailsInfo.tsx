import { useContext, useEffect, useMemo, useState } from "react";
import {
  useCreateFavoriteMutation,
  useGetFavoriteProductItemMutation,
} from "../../../Redux/apis/user/favoriteUserApi";
import { color } from "../../../types/color";
import { addOrderItem } from "../../../types/order";
import { useCreateOrderItemMutation } from "../../../Redux/apis/user/orderUserApi";
import toast from "react-hot-toast";
import {
  DetailContext,
  DetailContextType,
} from "../../../context/productDetailsContext";
import "./Star.css";
import { ProductDetailsSkeleton } from "../..";

function ProductDetailsInfo() {
  const { productItemLoading, productLoading, productItem, productFind } =
    useContext(DetailContext) as DetailContextType;

  const [count, setCount] = useState<number>(1);

  const [getFavoriteProductItem, { data: isFavorite, isSuccess }] =
    useGetFavoriteProductItemMutation();

  useEffect(() => {
    if (productFind?.itemId) {
      getFavoriteProductItem(`${productFind?.itemId}`);
    }
  }, [productFind?.itemId]);

  const [createFavorite, { isSuccess: createFavoriteSuccess }] =
    useCreateFavoriteMutation();

  useEffect(() => {
    if (createFavoriteSuccess) {
      toast.success("added to favorite is successfully");
    }
  }, [createFavoriteSuccess]);

  const addProductToFavorite = () => {
    const productItemId = {
      productItemId: productFind?.itemId,
    } as any;

    if (!isFavorite?.data) {
      createFavorite(productItemId);
      getFavoriteProductItem(`${productFind?.itemId}`);
    }
  };

  const [createOrderItem, { isSuccess: isSuccessOrder, isLoading }] =
    useCreateOrderItemMutation();

  useEffect(() => {
    if (isSuccessOrder) {
      toast.success("add order item is success");
      setCount(1);
    }
  }, [isSuccessOrder]);

  const addProductToBasket = (id: string) => {
    let orderItemInfo = {
      productItemId: id,
      quantity: count,
    } as addOrderItem;
    createOrderItem(orderItemInfo);
  };

  const isFavoriteImg = useMemo(() => {
    return (
      <>
        {isFavorite?.data || createFavoriteSuccess ? (
          <img src="/images/red-heart.svg" className="w-5 h-5" />
        ) : (
          <img src="/images/favorite.png" className="w-5 h-5" />
        )}
      </>
    );
  }, [isFavorite, , isSuccess, createFavoriteSuccess]);

  if (productItemLoading || productLoading) {
    return <ProductDetailsSkeleton />;
  }
  return (
    <>
      <div className="border-b border-borderColor lg:pb-10 pb-5 relative">
        <h1 className="md:text-xl text-lg font-semibold">
          {productItem?.productTitle}
        </h1>

        <button
          className="px-3 absolute right-0 top-0 z-10"
          disabled={isFavorite?.data}
          onClick={() => addProductToFavorite()}
        >
          {isFavoriteImg}
        </button>
        <div className="flex items-center justify-between my-5">
          <div className="flex items-center">
            <i data-star={productFind.rate}></i>
          </div>

          <p className="text-green">
            {productItem?.data?.status === 0 ? "In Stock" : "Out Stock"}
          </p>
        </div>
        <div className="flex items-center my-5">
          <>
            <p className="text-sm mr-3">Price:</p>
            <div className="flex">
              <p className="text-red mr-4 md:text-base text-sm font-bold">
                $
                {productItem?.discountValue
                  ? productItem?.price -
                    (productItem?.discountValue / 100) * productItem?.price
                  : productItem?.price}
              </p>
              <p className="line-through md:text-base text-sm">
                {productItem?.discountValue ? `$ ${productItem?.price}` : ""}
              </p>
            </div>
          </>
        </div>

        <p className="text-sm">{productItem?.productShortDescription}</p>
      </div>
      <div>
        <div className="flex justify-between lg:mb-10 mb-5 lg:mt-10 mt-5">
          <div className="flex items-center">
            <p className="mr-2 md:text-base text-sm">Colors:</p>
            <div
              className="w-6 h-6 rounded-full mx-1 border border-borderColor"
              style={{
                backgroundColor: productItem?.colors?.find(
                  (color: color) => color?.name === productItem?.color
                )?.colorHex,
              }}
            ></div>
          </div>

          <div className="flex items-center md:text-base text-sm">
            <p className="text-sm mr-2">Brand:</p>
            <p className="font-semibold">{productFind?.brandName}</p>
          </div>

          <div className="flex items-center md:text-base text-sm">
            <p className="text-sm mr-2">Code:</p>
            <p className="font-semibold">#{productItem?.productCode}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:my-12 my-10 gap-x-4 sm:gap-y-0 gap-y-5">
          <div className="border border-borderColor grid grid-cols-4 w-full sm:my-4 my-0">
            <button
              className="text-xl hover:bg-red duration-300 py-1 hover:text-white bg-borderColor"
              onClick={() => setCount(count === 1 ? count : count - 1)}
            >
              -
            </button>
            <button className="col-span-2 py-1">{count}</button>
            <button
              className="text-xl hover:bg-red duration-300 py-1 hover:text-white bg-borderColor"
              onClick={() =>
                setCount(count >= productItem?.quantity ? count : count + 1)
              }
            >
              +
            </button>
          </div>

          <div className="sm:my-4 my-0">
            <button
              className="bg-red hover:border hover:bg-rose-500 duration-300 py-2 w-full text-white"
              onClick={() => {
                !isLoading && addProductToBasket(String(productFind?.itemId));
              }}
            >
              {isLoading ? "Please wait ..." : "Buy Now"}
            </button>
          </div>
        </div>
        <div className="lg:my-12 my-10">
          <>
            <p className="font-semibold">product description:</p>
            <p className="text-sm">{productItem?.productDescription}</p>
          </>
        </div>
        <div>
          <>
            <div className="flex items-center border border-borderColor rounded-sm p-3">
              <img
                src="/images/truck-black.png"
                className="w-7 h-7 mr-3"
                loading="lazy"
              />
              <div>
                <p className="text-sm">Free Delivery</p>
                <p className="text-xs">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-center border-x border-b border-borderColor rounded-sm p-3">
              <img
                src="/images/return.png"
                className="w-7 h-7 mr-3"
                loading="lazy"
              />
              <div>
                <p className="text-sm">Return Delivery</p>
                <p className="text-xs">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsInfo;
