const AccountOrderSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="my-12">
          <div className="flex justify-between">
            <div className="bg-slate-100 aspect-video h-[30px] rounded-lg w-[140px]"></div>
            <div className="bg-slate-100 aspect-video h-[30px] rounded-lg w-[140px]"></div>
            <div className="bg-slate-100 aspect-video h-[30px] rounded-lg w-[140px]"></div>
            <div className="bg-slate-100 aspect-video h-[30px] rounded-lg w-[140px]"></div>
          </div>

          <div className="bg-slate-100 aspect-video h-[50px] rounded-lg w-[300px] mt-5"></div>
        </div>
      ))}
    </>
  );
};

export default AccountOrderSkeleton;
