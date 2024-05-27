import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useContext, useState } from "react";
import {
  DetailContext,
  DetailContextType,
} from "../../../context/productDetailsContext";
import ProductDetailesImageSkeleton from "../../Skeleton/ProductDetailesImageSkeleton";

const DetailsImage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const { productItemLoading, productLoading, productItem } = useContext(
    DetailContext
  ) as DetailContextType;

  if (productItemLoading || productLoading) {
    return <ProductDetailesImageSkeleton />;
  }

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {productItem?.files?.map((file: any) => (
          <SwiperSlide key={file?.id}>
            <img
              src={file?.fileUrl}
              className="object-contain sm:w-[34rem] sm:h-[34rem] w-[24rem] h-[24rem] mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-6"
      >
        {productItem?.files?.map((file: any) => (
          <SwiperSlide key={file?.id}>
            <img
              src={file?.fileUrl}
              className="object-contain w-[8rem] h-[8rem]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DetailsImage;
