import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { getBrand } from "../../../types/brand";
import { brandUserApi } from "../../../Redux";
import { appRoutes } from "../../../routes/appRoutes";
import BrandsSkeleton from "../../Skeleton/BrandsSkeleton";

function Brand() {
  const { data: brands, isLoading } = brandUserApi.useGetBrandsUserQuery("");

  if (isLoading) {
    return <BrandsSkeleton />;
  }

  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto min-h-[400px] my-20 border-b border-borderColor px-3">
      <p className="text-red my-4 font-semibold md:text-base text-sm">Brands</p>
      <div className="flex justify-between">
        <h2 className="md:text-4xl text-2xl md:mb-4 font-semibold">
          Browse By Brand
        </h2>
      </div>
      <div>
        <Swiper
          loop={true}
          rewind={true}
          breakpoints={{
            1: { slidesPerView: 2 },
            650: { slidesPerView: 4 },
            880: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          spaceBetween={6}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {brands?.data?.map((data: getBrand) => (
            <SwiperSlide key={data.id} data-aos="fade-left">
              <Link to={appRoutes.PRODUCTS + `?brandId=${data.id}`}>
                <div className="border border-borderColor rounded-md h-44 text-center flex justify-center items-center my-10 hover:bg-red duration-300">
                  <img
                    src={data.fileUrl}
                    className="w-20 h-20 object-contain m-auto"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Brand;
