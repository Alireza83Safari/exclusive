const ProductTableSkeleton = () => {
  return (
    <div className="px-6 m-5 h-[34rem] rounded-xl relative bg-slate-100">
      <div className="flex justify-between pt-4">
        <div className="bg-slate-200 h-[40px] sm:w-[140px] w-[100px] rounded-lg aspect-video"></div>
        <div className="bg-slate-200 h-[40px] sm:w-[140px] w-[100px] rounded-lg aspect-video"></div>
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex justify-between px-4 mt-7" key={index}>
          <div className="bg-slate-200 h-[30px] w-[100px] m-auto rounded-lg aspect-video md:flex hidden"></div>
          <div className="bg-slate-200 h-[30px] w-[100px] m-auto rounded-lg aspect-video sm:flex hidden"></div>
          <div className="bg-slate-200 h-[30px] sm:w-[100px] w-[70px] m-auto rounded-lg aspect-video"></div>
          <div className="bg-slate-200 h-[30px] sm:w-[100px] w-[70px] m-auto rounded-lg aspect-video"></div>
          <div className="bg-slate-200 h-[30px] sm:w-[100px] w-[70px] m-auto rounded-lg aspect-video"></div>
          <div className="bg-slate-200 h-[30px] sm:w-[100px] w-[70px] m-auto rounded-lg aspect-video"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductTableSkeleton;
