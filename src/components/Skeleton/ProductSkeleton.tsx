const ProductSkeleton = () => {
  return (
    <div className="my-4 mx-2 px-2 col-span-1">
      {/* image */}
      <div className=" bg-slate-100 rounded-[8px] aspect-video h-[240px] w-full"></div>
      {/* title */}
      <div className=" bg-slate-100 rounded-[8px] aspect-video h-[20px] w-[140px] mt-3"></div>

      {/* accessories and quantity */}
      <div className="flex justify-between">
        <div className=" bg-slate-100 rounded-[8px] aspect-video h-[20px] w-[100px] mt-3"></div>
        <div className=" bg-slate-100 rounded-[8px] aspect-video h-[20px] w-[100px] mt-3"></div>
      </div>

      {/* accessories and price */}
      <div className="flex">
        <div className=" bg-slate-100 rounded-[8px] aspect-video h-[20px] w-[40px] mt-3 mr-4"></div>
        <div className=" bg-slate-100 rounded-[8px] aspect-video h-[20px] w-[40px] mt-3"></div>
      </div>
      {/* accessories and starts */}
      <div className=" bg-slate-100 rounded-[8px] aspect-video h-[20px] w-[140px] mt-3"></div>
    </div>
  );
};

export default ProductSkeleton;
