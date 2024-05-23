import { useRef, useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";

const BrandsSkeleton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      console.log("Width:", ref.current.offsetWidth);
    }
  }, []);

  const currentWidth = width > 1024 ? 6 : width > 870 ? 5 : width > 650 ? 4 : 2;

  return (
    <div className="my-10 min-w-full">
      <div className="mx-4">
        <div className=" bg-slate-100 w-[100px] h-5 rounded-[8px] aspect-video mb-7"></div>

        <div className="flex justify-between">
          <div className="bg-slate-100 sm:w-[340px] w-[150px] h-10 rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 sm:w-[150px] w-[50px] h-10 rounded-[8px] aspect-video"></div>
        </div>
      </div>

      <div
        className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 mx-4 gap-y-8 mt-5"
        ref={ref}
      >
        {Array.from({ length: currentWidth }).map((_, index) => (
          <div
            className=" bg-slate-100 sm:max-w-[170px] max-w-[150px] min-h-[180px] rounded-[8px] aspect-video"
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BrandsSkeleton;
