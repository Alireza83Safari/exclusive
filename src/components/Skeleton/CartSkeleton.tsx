const CartSkeleton = () => {
  return (
    <div className="mx-4 mt-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex justify-between my-10" key={index}>
          <div className="bg-slate-100 h-[35px] sm:w-[140px] w-[110px] rounded-[8px] aspect-video md:flex hidden"></div>
          <div className="bg-slate-100 h-[35px] sm:w-[140px] w-[110px] rounded-[8px] aspect-video sm:flex hidden"></div>
          <div className="bg-slate-100 h-[35px] sm:w-[140px] w-[110px] rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 h-[35px] sm:w-[140px] w-[110px] rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 h-[35px] sm:w-[140px] w-[110px] rounded-[8px] aspect-video"></div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="bg-slate-100 h-[50px] sm:w-[170px] w-[140px] rounded-[8px] aspect-video"></div>
        <div className="bg-slate-100 h-[50px] sm:w-[170px] w-[140px] rounded-[8px] aspect-video"></div>
      </div>

      <div className="bg-slate-100 h-[300px] md:w-[600px] w-full mt-10 rounded-[8px] aspect-video"></div>
    </div>
  );
};

export default CartSkeleton;
