import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductTemplate from "../components/Product/ProductTemplate";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { useParams } from "react-router-dom";
import { getProducts } from "../Redux/Store/product";
import { getProductItemWithItemId } from "../Redux/Store/productItem";
import Spinner from "../components/Spinner/Spinner";
import { userProductType } from "../types/Product.type";
import {
  addFavoriteType,
  addfavorite,
  isFavoriteHandler,
} from "../Redux/Store/favorite";
import { addOrderItem } from "../Redux/Store/order";
import { addOrderItemType } from "../types/Order.type";
import ContentLoaders from "../components/ContentLoaders";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productFind, setProductFind] = useState<userProductType>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [count, setCount] = useState<number>(1);

  const { isFavorite, favoriteLoading } = useSelector(
    (state: rootState) => state.favorite
  );
  const { userProducts, productLoading } = useSelector(
    (state: rootState) => state.product
  );
  const { productItem, productItemLoading } = useSelector(
    (state: rootState) => state.productItem
  );

  useEffect(() => {
    dispatch(getProducts(false) as any);
  }, [dispatch, productId]);

  useEffect(() => {
    let findProduct = userProducts.find((product) => product.id == productId);
    setProductFind(findProduct);
  }, [userProducts]);

  useEffect(() => {
    if (productFind) {
      dispatch(isFavoriteHandler(productFind?.itemId) as any);
      dispatch(getProductItemWithItemId(productFind?.itemId) as any);
    }
  }, [productFind]);

  const memoizedProductsTemplate = useMemo(() => {
    return userProducts
      ?.slice(2, 10)
      ?.map((product) => <ProductTemplate {...product} />);
  }, [userProducts]);

  const addProductToFavorite = () => {
    const productItemId = {
      productItemId: productFind?.itemId,
    } as addFavoriteType;
    if (!isFavorite) {
      dispatch(addfavorite(productItemId) as any);
    }
    if (productFind) {
      dispatch(isFavoriteHandler(productFind?.itemId) as any);
    }
  };

  const addProductToBasket = (id: string) => {
    let orderItemInfo = {
      productItemId: id,
      quantity: count,
    } as addOrderItemType;
    dispatch(addOrderItem(orderItemInfo));
    setCount(1);
  };
  return (
    <section className="max-w-[1170px] mx-auto relative my-10 grid grid-cols-10">
      {productItemLoading || productLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="lg:col-span-5 col-span-10">
            {productItemLoading || productLoading ? (
              <ContentLoaders width={350} height={350} />
            ) : (
              <Swiper
                style={{
                  width: "full",
                  height: "500px",
                }}
                navigation={true}
                thumbs={thumbsSwiper}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <div className="w-full h-full flex justify-center">
                    <img
                      src={`http://127.0.0.1:6060/${productFind?.fileUrl}`}
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            )}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper mt-2"
            >
              {productItem?.files?.map((file, index) => (
                <div key={index}>
                  {productItemLoading || productLoading ? (
                    <ContentLoaders width={150} height={30} />
                  ) : (
                    <SwiperSlide>
                      <img
                        src={`http://127.0.0.1:6060/${file?.fileUrl}`}
                        className="object-contain w-full"
                      />
                    </SwiperSlide>
                  )}
                </div>
              ))}
            </Swiper>
          </div>
          <div className="lg:col-span-5 col-span-10 lg:px-16 sm:px-8 px-3 lg:py-0 py-7">
            <div className="border-b border-borderColor lg:pb-10 pb-5 relative">
              {productItemLoading || productLoading ? (
                <ContentLoaders width={80} height={20} />
              ) : (
                <h1 className="text-xl font-semibold">
                  {productItem?.productTitle}
                </h1>
              )}

              <button
                className="px-3 absolute right-0 top-0 z-10"
                disabled={isFavorite == true}
                onClick={() => addProductToFavorite()}
              >
                {favoriteLoading ? (
                  <ContentLoaders width={30} height={25} />
                ) : (
                  <>
                    {isFavorite ? (
                      <img src="/images/red-heart.svg" className="w-5 h-5" />
                    ) : (
                      <img src="/images/favorite.png" className="w-5 h-5" />
                    )}
                  </>
                )}
              </button>
              <div className="flex items-center justify-between my-5">
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={70} height={25} />
                ) : (
                  <div className="flex">
                    <img src="/images/star.png" className="w-3 h-3" />
                    <img src="/images/star.png" className="w-3 h-3" />
                    <img src="/images/star.png" className="w-3 h-3" />
                    <img src="/images/star.png" className="w-3 h-3" />
                    <img src="/images/star.png" className="w-3 h-3" />
                  </div>
                )}
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={50} height={25} />
                ) : (
                  <p className="text-green">
                    {productItem?.status === 0 ? "In Stock" : "Out Stock"}
                  </p>
                )}
              </div>
              <div className="flex items-center my-5">
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={80} height={25} />
                ) : (
                  <>
                    <p className="text-sm mr-3">Price:</p>
                    <p className="font-semibold">${productFind?.price}</p>
                  </>
                )}
              </div>
              {productItemLoading || productLoading ? (
                <ContentLoaders width={200} height={40} />
              ) : (
                <p className="text-sm">
                  {productItem?.productShortDescription}
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between lg:mb-10 mb-5 lg:mt-10 mt-5">
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={100} height={30} />
                ) : (
                  <div className="flex items-center">
                    <p className="mr-2">Colors:</p>
                    <div
                      className="w-6 h-6 rounded-full mx-1 border border-borderColor"
                      style={{
                        backgroundColor: productItem?.colors?.find(
                          (color) => color?.name === productItem?.color
                        )?.colorHex,
                      }}
                    ></div>
                  </div>
                )}

                {productItemLoading || productLoading ? (
                  <ContentLoaders width={100} height={30} />
                ) : (
                  <div className="flex items-center">
                    <p className="text-sm mr-2">Brand:</p>
                    <p className="font-semibold">{productFind?.brandName}</p>
                  </div>
                )}

                {productItemLoading || productLoading ? (
                  <ContentLoaders width={100} height={30} />
                ) : (
                  <div className="flex items-center">
                    <p className="text-sm mr-2">Code:</p>
                    <p className="font-semibold">#{productItem?.productCode}</p>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 lg:my-12 my-10 gap-x-4 sm:gap-y-0 gap-y-5">
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={200} height={40} />
                ) : (
                  <div className="border border-borderColor grid grid-cols-4 w-full sm:my-4 my-0">
                    <button
                      className="text-xl hover:bg-red duration-300 py-1 hover:text-white"
                      onClick={() => setCount(count === 1 ? count : count - 1)}
                    >
                      -
                    </button>
                    <button className="col-span-2 py-1">{count}</button>
                    <button
                      className="text-xl hover:bg-red duration-300 py-1 hover:text-white"
                      onClick={() =>
                        setCount(
                          count >= productItem?.quantity ? count : count + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                )}
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={200} height={40} />
                ) : (
                  <div className="sm:my-4 my-0">
                    <button
                      className="bg-red hover:bg-white hover:border hover:text-red duration-300 py-2 w-full text-white"
                      onClick={() => addProductToBasket(productFind?.itemId)}
                    >
                      Buy Now
                    </button>
                  </div>
                )}
              </div>
              <div className="lg:my-12 my-10">
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={280} height={80} />
                ) : (
                  <>
                    <p className="font-semibold">product description:</p>
                    <p className="text-sm">{productItem?.productDescription}</p>
                  </>
                )}
              </div>
              <div>
                {productItemLoading || productLoading ? (
                  <ContentLoaders width={300} height={100} />
                ) : (
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
                )}
              </div>
            </div>
          </div>
          <div className="col-span-10 sm:mt-28 mt-10">
            <h2 className="text-2xl font-semibold mb-5 text-center">
              Related Item
            </h2>
            <div className="grid lg:grid-cols-4 grid-cols-2">
              {memoizedProductsTemplate}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProductDetails;
