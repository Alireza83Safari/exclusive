const ArrivalSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 justify-center relative my-20 sm:mx-0 mx-4">
      <div className="bg-slate-100 aspect-video md:h-[570px] h-[400px] md:w-[46vw] w-[95vw]"></div>

      <div className="md:h-[550px] h-[400px] md:w-[46vw] w-[95vw]">
        <div className="bg-slate-100 aspect-video h-1/2 w-full"></div>
        <div className="bg-slate-100 aspect-video mt-5 h-1/2 w-full"></div>
      </div>
    </div>
  );
};

export default ArrivalSkeleton;
