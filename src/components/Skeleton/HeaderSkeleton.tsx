const HeaderSkeleton = () => {
  return (
    <div className="m-4">
      {/*  <div className="flex justify-between sm:gap-x-4 gap-x-2 mb-4">
        <div className="lg:flex hidden"></div>
        <div className="bg-slate-100 w-[400px] h-10 rounded-[8px] aspect-video sm:flex hidden"></div>
        <div className="bg-slate-100 sm:w-[100px] h-10 rounded-[12px] aspect-video w-full"></div>
      </div> */}

      <div className="flex justify-between items-center h-[70px]">
        <div className="flex sm:gap-x-4 gap-x-2">
          <div className=" bg-slate-100 w-[40px] h-[38px] rounded-[8px] aspect-video lg:hidden flex"></div>
          <div className=" bg-slate-100 w-[100px] h-[38px] rounded-[12px] aspect-video sm:flex hidden"></div>
        </div>

        {/* navigation manu */}
        <div className="sm:gap-x-4 gap-x-2 lg:flex hidden">
          <div className=" bg-slate-100 w-[80px] h-[38px] rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[60px] h-[38px] rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[65px] h-[38px] rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[60px] h-[38px] rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[70px] h-[38px] rounded-[8px] aspect-video"></div>
        </div>

        <div className="flex sm:gap-x-4 gap-x-2">
          <div className=" bg-slate-100 md:w-[240px] w-[140px] h-[38px] rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[38px] h-10 rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[38px] h-10 rounded-[8px] aspect-video"></div>
          <div className=" bg-slate-100 w-[38px] h-10 rounded-[8px] aspect-video"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
