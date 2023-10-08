import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductTemplate from "../components/Product/ProductTemplate";

function ProductDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>() as any;
  const productData = [
    {
      title: "Flash Sales",
      name: "Cart With Flat Discount",
      price: 160,
      image: "/images/bookSelf.png",
    },
    {
      title: "urt Sales",
      name: "yjthghjgj Flat Discount",
      price: 1450,
      image: "/images/bookSelf.png",
    },
    {
      title: "tey Sales",
      name: "rytgvb Flat Discount",
      price: 45,
      image: "/images/product-1.png",
    },
    {
      title: "hkj Sales",
      name: "Cbryt7i Fhgkjhklatuihg iDiscikjount",
      price: 654,
      image: "/images/bookSelf.png",
    },
    {
      title: "xcv Sales",
      name: "Cgkhgkhgkhgkunt",
      price: 645,
      image: "/images/product-1.png",
    },
    {
      title: "yut Sales",
      name: "Caghkhgkhgjkunt",
      price: 645,
      image: "/images/product-1.png",
    },
    {
      title: "fgh Sales",
      name: "Caghkutiuyjgount",
      price: 546,
      image: "/images/product-1.png",
    },
    {
      title: "fgh Sales",
      name: "Caghkutiuyjgount",
      price: 546,
      image: "/images/product-1.png",
    },
  ];
  return (
    <section className="max-w-[1170px] mx-auto my-10 relative grid grid-cols-9">
      <div className="lg:col-span-5 col-span-9">
        <Swiper
          style={{ width: "full", height: "500px" }}
          navigation={true}
          thumbs={thumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          <SwiperSlide>
            <div className="w-full h-full">
              <img
                src="/images/game.png"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-2"
        >
          <SwiperSlide>
            <img src="/images/game.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/game.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/game.png" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/game.png" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="lg:col-span-4 col-span-9 lg:px-16 sm:px-8 px-3 lg:py-0 py-7">
        <div className="border-b border-borderColor lg:pb-10 pb-5">
          <h1 className="text-lg font-semibold">Havic HV G-92 Gamepad</h1>
          <div className="flex items-center my-5">
            <div className="flex mr-3">
              <img src="/images/star.png" className="w-3 h-3" />
              <img src="/images/star.png" className="w-3 h-3" />
              <img src="/images/star.png" className="w-3 h-3" />
              <img src="/images/star.png" className="w-3 h-3" />
              <img src="/images/star.png" className="w-3 h-3" />
            </div>
            <p className="mr-3">(150 Reviews)</p>
            <p className="text-green mr-3">In Stock</p>
          </div>
          <p className="my-5">$192.00</p>
          <p>
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </p>
        </div>
        <div>
          <div className="flex items-center lg:mb-10 mb-5 lg:mt-10 mt-5">
            <p className="mr-2">Colours:</p>
            <div className="w-5 h-5 rounded-full bg-red mx-1 border border-borderColor"></div>
            <div className="w-5 h-5 rounded-full bg-gray mx-1 border border-borderColor"></div>
          </div>
          <div className="flex items-center lg:my-12 my-6">
            <p>Size:</p>
            <div className="border border-borderColor w-7 h-7 flex justify-center items-center sm:mx-2 mx-1 text-sm">
              xs
            </div>
            <div className="border border-borderColor w-7 h-7 flex justify-center items-center sm:mx-2 mx-1 text-sm">
              s
            </div>
            <div className="border border-borderColor w-7 h-7 flex justify-center items-center sm:mx-2 mx-1 text-sm">
              M
            </div>
            <div className="border border-borderColor w-7 h-7 flex justify-center items-center sm:mx-2 mx-1 text-sm">
              L
            </div>
            <div className="border border-borderColor w-7 h-7 flex justify-center items-center sm:mx-2 mx-1 text-sm">
              XL
            </div>
          </div>
          <div className="xl:flex lg:block sm:flex  items-center lg:my-12 my-6">
            <div className="border border-borderColor xl:w-1/3 sm:w-2/4 grid grid-cols-4 sm:mr-5 lg:w-full w-full">
              <button className="text-xl hover:bg-red py-1 hover:text-white">
                -
              </button>
              <button className="col-span-2 py-1">2</button>
              <button className="text-xl hover:bg-red py-1 hover:text-white">
                +
              </button>
            </div>
            <div>
              <button className="bg-red py-2 xl:px-14 lg:px-9 px-16 lg:w-full text-white sm:mr-5 xl:my-0 lg:my-4 sm:w-auto w-full sm:my-0 my-4">
                Buy Now
              </button>
              <button className="border border-borderColor py-3 px-3 rounded-md lg:orde">
                <img src="/images/favorite.png" className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
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
          </div>
        </div>
      </div>
      <div className="col-span-9 sm:mt-28 mt-14">
        <h2 className="text-2xl font-semibold mb-7 text-center">
          Related Item
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-2">
          {productData?.slice(0, 4).map((product, index) => (
            <ProductTemplate
              key={index}
              title={product.title}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
