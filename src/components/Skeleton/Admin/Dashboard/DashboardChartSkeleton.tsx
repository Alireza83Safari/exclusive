const DashboardChartSkeleton = () => {
  return (
    <div className="md:ml-7 ml-3 mt-4 md:mr-4 mr-12 md:mb-0">
      <div className="h-[400px] min-w-full rounded-xl bg-slate-100 flex justify-evenly items-end">
        <div className="bg-slate-200 h-[300px] w-[50px] rounded-xl aspect-video"></div>
        <div className="bg-slate-200 h-[240px] w-[50px] rounded-xl aspect-video"></div>
        <div className="bg-slate-200 h-[220px] w-[50px] rounded-xl aspect-video"></div>
        <div className="bg-slate-200 h-[350px] w-[50px] rounded-xl aspect-video"></div>
        <div className="bg-slate-200 h-[270px] w-[50px] rounded-xl aspect-video"></div>
      </div>
    </div>
  );
};

export default DashboardChartSkeleton;
