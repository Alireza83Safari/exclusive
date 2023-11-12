
function TopHeader() {
  return (
    <div className="bg-black">
      <div className="max-w-[1170px] sm:h-[48px] h-[58px] sm:flex justify-between items-center m-auto md:text-sm text-xs text-center">
        <div className="lg:flex hidden"></div>
        <div className="text-white">
          <p className="">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <span className="font-semibold">ShopNow</span>
          </p>
        </div>
        <div className="text-white flex justify-center items-center">
          <p>English</p>
          <img src="/images/bottom.png" className="w-6" />
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
