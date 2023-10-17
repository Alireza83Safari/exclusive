import React from "react";

function Arrival() {
  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full px-4 mx-auto relative my-20">
      <div className="px-2">
        <p>Featured</p>
        <h2 className="text-4xl font-semibold my-4">New Arrival</h2>
      </div>
      <div className="grid md:grid-cols-2 relative">
        <div className="bg-black w-full md:h-[550px] h-[400px] relative">
          <div className="flex justify-center">
            <img
              src="/images/ps-5.png"
              alt="ps5"
              className="object-contain md:w-10/12 w-3/4 md:h-5/6 h-3/4 absolute md:bottom-10 md:top-0 top-12"
            />
          </div>
          <div className="text-white absolute md:bottom-20 bottom-10 lg:ml-10 ml-4">
            <h3 className="font-semibold text-2xl my-4">PlayStation 5</h3>
            <p className="my-4 md:text-base text-sm">
              Black and White version of the PS5 coming out on sale.
            </p>
            <p>Shop Now</p>
          </div>
        </div>
        <div className="md:row-span-2 lg:ml-9 md:ml-4 md:mt-0 mt-4">
          <div className="h-11/12 bg-black md:mb-9 mb-4 relative">
            <img
              src="/images/women.png"
              className="h-ful object-contain max-h-64"
              alt="women"
            />
            <div className="absolute top-28 lg:pl-8 pl-4 text-white">
              <h2 className="text-xl font-semibold">Women’s Collections</h2>
              <p className="my-2 md:text-base text-sm">
                Featured woman collections that give you another vibe.
              </p>
              <p>Shop Now</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="h-64 bg-black lg:mr-9 sm:mr-4 mr-2 relative">
              <div className="flex justify-center items-center">
                <img
                  src="/images/speaker.png"
                  className="h-full object-contain max-h-44"
                  alt="perfume"
                />
              </div>
              <div className="absolute top-28 pl-4 text-white">
                <h2 className="text-lg font-semibold">Speakers</h2>
                <p className="my-2 md:text-base text-sm">
                  Amazon wireless speakers
                </p>
                <p>Shop Now</p>
              </div>
            </div>

            <div className="h-11/12 bg-black relative">
              <div className="flex justify-center items-center">
                <img
                  src="/images/prefume.png"
                  className="object-contain max-h-44"
                  alt="perfume"
                />
              </div>
              <div className="absolute top-28 pl-4 text-white">
                <h2 className="text-lg font-semibold">Perfume</h2>
                <p className="my-2 md:text-base text-sm">
                  GUCCI INTENSE OUD EDP
                </p>
                <p>Shop Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Arrival;
