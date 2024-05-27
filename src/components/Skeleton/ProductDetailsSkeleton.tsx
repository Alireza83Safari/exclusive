const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[150px] mt-3"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[30px] mt-3"></div>
      </div>

      <div className="flex justify-between mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[100px]"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[100px]"></div>
      </div>

      <div className="flex gap-x-5 mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[50px]"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[50px]"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[50px]"></div>
      </div>

      <div className="flex mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[300px]"></div>
      </div>

      <div className="flex justify-between mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[100px]"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[100px]"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[100px]"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-4 mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[50px] w-full"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[50px] w-full md:mt-0 mt-4"></div>
      </div>

      <div className="mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[30px] w-[100px]"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[50px] md:w-[400px] w-full mt-4"></div>
      </div>

      <div className="mt-7">
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[50px] w-full"></div>
        <div className="bg-slate-100 rounded-[8px] aspect-video h-[50px] w-full mt-2"></div>
      </div>
    </>
  );
};

export default ProductDetailsSkeleton;
