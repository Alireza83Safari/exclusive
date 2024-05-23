const AccountCommentSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, item) => (
        <div
          className="grid md:grid-cols-3 grid-cols-2 my-10 gap-y-4"
          key={item}
        >
          <div className="bg-slate-100 sm:w-[150px] w-[120px] h-10 rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 sm:w-[150px] w-[120px] h-10 rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 sm:w-[150px] w-[120px] h-10 rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 sm:w-[150px] w-[120px] h-10 rounded-[8px] aspect-video"></div>
          <div className="bg-slate-100 sm:w-[150px] w-[120px] h-10 rounded-[8px] aspect-video"></div>
        </div>
      ))}
    </>
  );
};

export default AccountCommentSkeleton;
