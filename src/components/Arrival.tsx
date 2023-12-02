import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAppPicsUserQuery } from "../Redux/apis/user/appPicUserApi";

function Arrival() {
  const { data } = useGetAppPicsUserQuery("");
  const appPics = data?.filter((appPic: any) => appPic?.appPicType === 1);


  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full sm:px-4 px-1 mx-auto relative my-20">
      <div className="px-2">
        <p>Featured</p>
        <h2 className="text-4xl font-semibold my-4">New Arrival</h2>
      </div>

      <div className="grid md:grid-cols-2 relative">
        <div className="bg-black w-full md:h-[550px] h-[400px] relative hover:opacity-70 duration-300">
          <Link to={appPics && appPics[0]?.url}>
            <div className="flex justify-center">
              <img
                src={appPics && appPics[0]?.fileUrl}
                alt="ps5"
                className="object-contain md:w-10/12 w-3/4 md:h-5/6 h-3/4 absolute md:bottom-10 md:top-0 top-12"
              />
            </div>
            <div className="text-white absolute md:bottom-20 bottom-10 lg:ml-10 ml-4">
              <h3 className="font-semibold text-2xl my-4">
                {appPics && appPics[0]?.title}
              </h3>
              <p className="my-4 md:text-base text-sm">
                {appPics && appPics[0]?.description}
              </p>
              <p>Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="md:row-span-2 lg:ml-9 md:ml-4 md:mt-0 mt-4">
          <div className="h-11/12 bg-black md:mb-9 mb-4 relative hover:opacity-70 duration-300">
            <Link to={appPics && appPics[3]?.url}>
              <img
                src={appPics && appPics[3]?.fileUrl}
                className="h-ful object-contain max-h-64"
                alt="women"
              />
              <div className="absolute top-28 lg:pl-8 pl-4 text-white">
                <h2 className="text-xl font-semibold">
                  {appPics && appPics[3]?.title}
                </h2>
                <p className="my-2 md:text-base text-sm">
                  {appPics && appPics[3]?.description}
                </p>
                <p>Shop Now</p>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2">
            <div className="h-64 bg-black lg:mr-9 sm:mr-4 mr-2 relative hover:opacity-70 duration-300">
              <Link to={appPics && appPics[2]?.url}>
                <div className="flex justify-center items-center">
                  <img
                    src={appPics && appPics[2]?.fileUrl}
                    className="h-full object-contain max-h-44"
                    alt="speaker"
                  />
                </div>
                <div className="absolute top-28 pl-4 text-white">
                  <h2 className="text-lg font-semibold">
                    {appPics && appPics[2]?.title}
                  </h2>
                  <p className="my-2 md:text-base text-sm">
                    {appPics && appPics[2]?.description}
                  </p>
                  <p>Shop Now</p>
                </div>
              </Link>
            </div>

            <div className="h-11/12 bg-black relative hover:opacity-70 duration-300">
              <Link to="/search/product?searchTerm=Perfume_Gucci">
                <div className="flex justify-center items-center">
                  <img
                    src={appPics && appPics[1]?.fileUrl}
                    className="object-contain max-h-44"
                    alt="perfume"
                  />
                </div>
                <div className="absolute top-28 pl-4 text-white">
                  <h2 className="text-lg font-semibold">
                    {appPics && appPics[1]?.title}
                  </h2>
                  <p className="my-2 md:text-base text-sm">
                    {appPics && appPics[1]?.description}
                  </p>
                  <p>Shop Now</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Arrival;
