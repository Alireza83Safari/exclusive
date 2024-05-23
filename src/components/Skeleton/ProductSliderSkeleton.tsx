import { useRef, useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";

const ProductSliderSkeleton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      console.log("Width:", ref.current.offsetWidth);
    }
  }, []);

  const currentWidth = width > 1024 ? 4 : width > 768 ? 3 : width > 400 ? 2 : 1;

  return (
    <div className="my-10 min-w-full">
      <div className="mx-4">
        <div className="bg-slate-100 w-[100px] h-5 rounded-[8px] aspect-video mb-7"></div>

        <div className="flex justify-between">
          <div className="bg-slate-100 sm:w-[340px] w-[150px] h-10 rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 sm:w-[150px] w-[50px] h-10 rounded-[8px] aspect-video"></div>
        </div>
      </div>

      <div
        className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-8"
        ref={ref}
      >
        {Array.from({ length: currentWidth }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductSliderSkeleton;
