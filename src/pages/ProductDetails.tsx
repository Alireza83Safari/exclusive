import  { Suspense, lazy, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { userProductType } from "../types/Product.type";
import ContentLoaders from "../components/ContentLoaders";
import { useGetProductItemUserMutation } from "../Redux/apis/user/productItemUserApi";
import HeaderSkelton from "../skelton/HeaderSkelton";
import ProductDetailsInfo from "../components/ProductDetails/ProductDetailsInfo";
import ProductDetailsSkelton from "../skelton/ProductDetailsSkelton";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";
import Comment from "./Comment";
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function ProductDetails() {
  const { productId } = useParams();
  const [productFind, setProductFind] = useState<userProductType>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  const { data: products, isLoading: productLoading } =
    useGetProductsUserQuery("");

  useEffect(() => {
    let findProduct = products?.data.find(
      (product: userProductType) => product.id == productId
    );
    setProductFind(findProduct);
  }, [products?.data, productId]);

  const [
    getProductItemUser,
    { data: productItem, isLoading: productItemLoading },
  ] = useGetProductItemUserMutation();

  useEffect(() => {
    if (productFind) {
      getProductItemUser(productFind?.itemId);
    }
  }, [productFind]);

  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative my-10 grid grid-cols-10">
        {productItemLoading || productLoading ? (
          <ProductDetailsSkelton />
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
                        src={productFind?.fileUrl}
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
                {productItem?.files?.map((file: any, index: number) => (
                  <div key={index}>
                    {productItemLoading || productLoading ? (
                      <ContentLoaders width={150} height={30} />
                    ) : (
                      <SwiperSlide>
                        <img
                          src={file?.fileUrl}
                          className="object-contain w-full"
                        />
                      </SwiperSlide>
                    )}
                  </div>
                ))}
              </Swiper>
            </div>
            <ProductDetailsInfo />
            <Comment />
            <RelatedProducts products={products} />
          </>
        )}
      </section>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default ProductDetails;
