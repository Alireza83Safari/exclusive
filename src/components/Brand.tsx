import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../Redux/Store/brand";
import { rootState } from "../Redux/Store";
import { Link } from "react-router-dom";

function Brand() {
  const dispatch = useDispatch();
  const { brandsUser } = useSelector((state: rootState) => state.brand);
  const [dateIsFetched, setDateIsFetched] = useState<boolean>(false);
  useEffect(() => {
    if (!dateIsFetched) {
      dispatch(getBrands(false) as any);
      setDateIsFetched(true);
    }
  }, [dateIsFetched]);

  return (
    <section className="max-w-[1170px] mx-auto min-h-[400px] my-20 border-b border-borderColor">
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
          
          {brandsUser.map((data, index) => (
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
