import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useGetBrandsUserQuery } from "../Redux/apis/user/brandUserApi";

function Brand() {
  const { data: brands } = useGetBrandsUserQuery("");

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
          spaceBetween={4}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {brands?.data.map((data, index) => (
            <SwiperSlide key={index}>
              <Link to={`/brand/product?brandId=${data.id}`}>
                <div className="border border-borderColor rounded-md h-44 mx-2 text-center flex justify-center items-center my-10 hover:bg-red duration-200 hover:text-white">
                  <div>
                    <img
                      src={`http://127.0.0.1:6060/${data.fileUrl}`}
                      className="w-20 h-20 object-contain m-auto"
                    />
                    <p>{data.name}</p>
                  </div>
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
