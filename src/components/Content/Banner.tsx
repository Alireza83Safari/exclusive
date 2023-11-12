import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  return (
    <div className="lg:col-span-10 col-span-12 lg:py-8 lg:order-1 order-1">
      <div
        className="lg:w-[78%] w-full min-h-[344px] bg-black sm:px-16 grid sm:grid-cols-2 lg:absolute right-0 sm:py-0 py-10"
        onClick={() =>
          navigate(`/search/product?searchTerm=Iphone_14
        `)
        }
      >
        <div className="mx-auto sm:order-1 order-2">
          <div className="flex items-center sm:pt-14">
            <img src="/images/apple.png" className="w-10" />
            <p className="text-white md:text-base text-sm">iPhone 14 Series</p>
          </div>
          <div className="text-white md:text-5xl text-4xl font-semibold my-5">
            Up to 10% <br /> off Voucher
          </div>
          <div className="text-white flex  items-center">
            <p className="mr-3 md:text-base text-sm">Shop Now</p>
            <img src="/images/arrowRight.png" className="w-4" />
          </div>
        </div>
        <div className="sm:h-[344px] h-[200px] m-auto sm:order-2 order-1">
          <img
            src="/images/iphoneBanner.png"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
