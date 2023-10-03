import React from "react";

function Arrival() {
  return (
    <section className="max-w-[1170px] mx-auto relative my-20">
      <div>
        <p>Featured</p>
        <h2 className="text-4xl font-semibold">New Arrival</h2>
      </div>
      <div className="grid grid-cols-2 relative">
        <div className="bg-black w-full h-[550px]">
          <div className="flex justify-center">
            <img
              src="/images/ps-5.png"
              alt="ps5"
              className="object-contain w-10/12 h-5/6 absolute bottom-10"
            />
          </div>
          <div className="text-white absolute bottom-20 ml-10">
            <h3 className="font-semibold text-2xl my-4">PlayStation 5</h3>
            <p className="my-4">
              Black and White version of the PS5 coming out on sale.
            </p>
            <p>Shop Now</p>
          </div>
        </div>
        <div className="row-span-2 ml-9">
          <div className="h-11/12 bg-black mb-9 relative">
            <img
              src="/images/women.png"
              className="h-ful object-contain max-h-64"
              alt="women"
            />
            <div className="absolute top-28 pl-8 text-white">
              <h2 className="text-xl font-semibold">Women’s Collections</h2>
              <p className="my-2">
                Featured woman collections that give you another vibe.
              </p>
              <p>Shop Now</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="h-64 bg-black mr-9 relative">
              <div className="flex justify-center items-center">
                <img
                  src="/images/speaker.png"
                  className="h-ful object-contain max-h-44"
                  alt="perfume"
                />
              </div>
              <div className="absolute top-28 pl-4 text-white">
                <h2 className="text-lg font-semibold">Speakers</h2>
                <p className="my-2">Amazon wireless speakers</p>
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
                <p className="my-2">GUCCI INTENSE OUD EDP</p>
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
