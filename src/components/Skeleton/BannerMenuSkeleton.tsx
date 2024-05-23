const BannerMenuSkeleton = () => {
  return (
    <div className="lg:flex lg:flex-col gap-y-5 mt-4 grid sm:grid-cols-4 grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className=" bg-slate-100 w-[100px] h-7 rounded-[8px] aspect-video"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default BannerMenuSkeleton;
