import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
function Category() {
  const categoryData = [
    { img: "/images/phone.png", title: "Phones" },
    { img: "/images/computer.png", title: "Computers" },
    { img: "/images/whaches.png", title: "SmartWatch" },
    { img: "/images/headPhone.png", title: "HeadPhones" },
    { img: "/images/gaming.png", title: "Gaming" },
    { img: "/images/phone.png", title: "Phones" },
    { img: "/images/computer.png", title: "Computers" },
    { img: "/images/whaches.png", title: "SmartWatch" },
    { img: "/images/headPhone.png", title: "HeadPhones" },
    { img: "/images/gaming.png", title: "Gaming" },
  ];

  const swiperRef = useRef<Swiper | null>(null);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  return (
    <section className="max-w-[1170px] mx-auto min-h-[400px] my-20 border-b border-borderColor">
      <p className="text-red my-4 font-semibold md:text-base text-sm">Categories</p>
      <div className="flex justify-between">
        <h2 className="md:text-4xl text-2xl md:mb-4 font-semibold">Browse By Category</h2>
        <div className="flex">
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2"
            onClick={handlePrevClick}
          >
            <img src="/images/left.png" className="w-5" alt="Previous" />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2"
            onClick={handleNextClick}
          >
            <img src="/images/right.png" className="w-5" alt="Next" />
          </div>
        </div>
      </div>
      <div className="">
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
          {categoryData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="border border-borderColor rounded-md h-44 mx-2 text-center flex justify-center items-center my-10 hover:bg-red duration-200 hover:text-white">
                <div>
                  <img
                    src={data.img}
                    className="w-14 h-14 object-contain m-auto"
                  />
                  <p>{data.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Category;
