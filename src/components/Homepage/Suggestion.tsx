import { Link } from "react-router-dom";
import { useGetAppPicsUserQuery } from "../../Redux/apis/user/appPicUserApi";
import { useEffect, useState } from "react";

function Suggestion() {
  const { data } = useGetAppPicsUserQuery("");
  const appPics = data?.filter((appPic: any) => appPic?.appPicType === 2);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === appPics?.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, appPics]);
  const currentAppPic = appPics && appPics[currentIndex];
  return (
    <div className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto col-span-10 py-8">
      <div className="w-full md:h-[460px] h-[600px] bg-black lg:px-16 px-5 grid md:grid-cols-2 grid-cols-1 md:py-0 py-10">
        <div className="md:my-16 my-4 md:order-1 order-2 text-center md:text-start">
          <p className="text-green">Categories</p>
          <h2 className="md:text-5xl sm:text-4xl text-3xl text-white font-semibold md:my-10 my-4">
            {currentAppPic?.title}
          </h2>

          <Link
            to={currentAppPic?.url}
            className="bg-green text-white px-10 py-3"
          >
            Buy Now!
          </Link>
        </div>
        <div className="md:w-full  m-auto md:h-[344px] h-[220px] md:order-2 order-1">
          <img src={currentAppPic?.fileUrl} className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
