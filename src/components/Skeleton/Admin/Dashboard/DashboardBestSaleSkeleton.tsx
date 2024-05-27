const DashboardBestSaleSkeleton = () => {
  return (
    <div className="min-w-full pr-7 mt-4">
      <div className="h-[400px] w-full bg-slate-100 rounded-xl p-3">
        <div className="bg-slate-200 h-[40px] w-[200px] m-auto rounded-lg aspect-video mt-3"></div>
        <div className="bg-slate-200 h-[250px] lg:w-[250px] max-w-[400px] w-full m-auto rounded-lg aspect-video mt-3"></div>
        <div className="flex justify-between">
          <div className="bg-slate-200 h-[40px] w-[100px] m-auto rounded-lg aspect-video mt-3"></div>
          <div className="bg-slate-200 h-[40px] w-[100px] m-auto rounded-lg aspect-video mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBestSaleSkeleton;
