const DashboardTopbarSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-3 gap-7 py-3 md:mx-7 mx-3 rounded-xl mt-4 md:ml-7 ml-3 relative">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="h-[144px] w-full rounded-lg min-w-full bg-slate-100 p-3"
          key={index}
        >
          <div className="flex justify-between">
            <div className="bg-slate-200 h-[30px] w-[140px] rounded-lg aspect-video"></div>
            <div className="bg-slate-200 h-[30px] w-[100px] rounded-lg aspect-video"></div>
          </div>
          <div className="bg-slate-200 h-[30px] w-[100px] rounded-lg aspect-video mt-4 m-auto"></div>
          <div className="bg-slate-200 h-[30px] w-[100px] rounded-lg aspect-video mt-4"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardTopbarSkeleton;
