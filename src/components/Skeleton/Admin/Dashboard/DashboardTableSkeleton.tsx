const DashboardTableSkeleton = () => {
  return (
    <div className="md:ml-7 ml-3 md:mr-4 mr-3 md:mt-4 mt-2 md:mb-0 mb-4 text-center">
      <div className="sm:px-6 h-[25rem] rounded-xl relative bg-slate-100">
        <div className="bg-slate-200 h-[30px] w-[100px] m-auto rounded-lg aspect-video pt-3"></div>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="flex justify-between px-4 mt-7" key={index}>
            <div className="bg-slate-200 h-[30px] w-[60px] m-auto rounded-lg aspect-video"></div>
            <div className="bg-slate-200 h-[30px] w-[60px] m-auto rounded-lg aspect-video"></div>
            <div className="bg-slate-200 h-[30px] w-[60px] m-auto rounded-lg aspect-video"></div>
            <div className="bg-slate-200 h-[30px] w-[60px] m-auto rounded-lg aspect-video"></div>
            <div className="bg-slate-200 h-[30px] w-[60px] m-auto rounded-lg aspect-video"></div>
            <div className="bg-slate-200 h-[30px] w-[60px] m-auto rounded-lg aspect-video"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTableSkeleton;
