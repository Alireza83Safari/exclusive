import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { userProductType } from "../types/product";
import ProductSkelton from "../skelton/ProductSkelton";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const ProductTemplate = lazy(() => import("./Product/ProductTemplate"));

type ProductSliderType = {
  title: string;
  buttonText: string;
  data: any;
  isLoading: boolean;
  href: string;
};
const ProductSlider: React.FC<ProductSliderType> = ({
  title,
  buttonText,
  data,
  isLoading,
  href,
}) => {
  const totalSkeletonShow = Array.from(Array(4).keys());

  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-20 relative sm:px-4 px-1">
      <p className="text-red font-semibold my-5">This Month</p>
      <div className="flex justify-between items-center my-8">
        <h2 className="md:text-4xl text-2xl font-semibold mb-5 border-l-8 border-red">
          {title}
        </h2>
        <Link to={href}>
          <button className="px-4 bg-red text-white h-10 md:text-base text-sm hover:bg-rose-400 duration-300">
            {buttonText}
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {totalSkeletonShow?.map((index) => (
            <React.Fragment key={index}>
              <ProductSkelton />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Swiper
          slidesPerView={4}
          autoplay={{ delay: 10000 }}
          className="mySwiper"
          modules={[Pagination, Autoplay]}
          breakpoints={{
            1: { slidesPerView: 1 },
            400: { slidesPerView: 2 },
            750: { slidesPerView: 3 },
            1000: {
              slidesPerView: 4,
            },
          }}
        >
          {data?.map((product: userProductType) => (
            <SwiperSlide key={product.id}>
              <Suspense fallback={<ProductSkelton />}>
                <ProductTemplate {...product} />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default ProductSlider;
