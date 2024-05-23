import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAppPicType } from "../../../types/appPic";

interface ContentProps {
  data: any;
  isLoading: boolean;
}

const Content = (props: ContentProps) => {
  const { data, isLoading } = props;
  const navigate = useNavigate();

  const [appPics, setAppPics] = useState<getAppPicType[]>([]);
  useEffect(() => {
    if (data) {
      const totalAppPics = data?.filter(
        (item: getAppPicType) => item.appPicType === 0
      );
      setAppPics(totalAppPics);
    }
  }, [data]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * appPics?.length);
      setCurrentIndex(randomIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [appPics]);

  return (
    <div
      className="lg:w-[83.3%] w-full sm:px-16 grid sm:grid-cols-2 lg:absolute right-0 sm:py-0 py-10 bg-gradient-to-r from-customGrayLight via-gray-300 to-customGrayDark"
      onClick={() => navigate(appPics[currentIndex]?.url)}
    >
      <div className="mx-auto sm:order-1 order-2">
        <div className="flex items-center sm:pt-14">
          <p className="md:text-base text-sm"></p>
        </div>
        <div
          className="md:text-5xl text-4xl font-semibold my-5 sm:text-start text-center"
          style={{ lineHeight: "60px" }}
        >
          {appPics[currentIndex]?.title}
        </div>
        <div className="md:block flex text-center justify-center items-center">
          {!isLoading && (
            <button className="flex text-center justify-center items-center md:text-base text-sm bg-black py-2 px-5 text-white mt-7 rounded-lg">
              Shop Now
              <img src="/images/arrowRight.png" className="w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="sm:h-[344px] h-[200px] m-auto sm:order-2 order-1">
        <img
          src={appPics[currentIndex]?.fileUrl}
          className="h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Content;
