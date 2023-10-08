import React from "react";

function Suggestion() {
  return (
    <div className="max-w-[1170px] mx-auto col-span-10 py-8">
      <div className="w-full md:h-[500px] h-[600px] bg-black lg:px-16 px-5 grid md:grid-cols-2 grid-cols-1 md:py-0 py-10">
        <div className="md:my-16 my-4 md:order-1 order-2 text-center md:text-start">
          <p className="text-green">Categories</p>
          <h2 className="md:text-5xl sm:text-4xl text-3xl text-white font-semibold md:my-10 my-4">
            Enhance Your Music Experience
          </h2>
          <div className="flex md:justify-start justify-center md:my-14 my-10 bg-gradient-to-br">
            <div className="text-sm mr-2 bg-white rounded-full w-12 h-12 text-center">
              <p>23</p>
              <p>Hours</p>
            </div>
            <div className="text-sm mr-2 bg-white rounded-full w-12 h-12 text-center">
              <p>23</p>
              <p>Hours</p>
            </div>
            <div className="text-sm mr-2 bg-white rounded-full w-12 h-12 text-center">
              <p>23</p>
              <p>Hours</p>
            </div>
            <div className="text-sm mr-2 bg-white rounded-full w-12 h-12 text-center">
              <p>23</p>
              <p>Hours</p>
            </div>
          </div>
          <button className="bg-green text-white px-10 py-3">Buy Now!</button>
        </div>
        <div className="md:w-full  m-auto md:h-[344px] h-[220px] md:order-2 order-1">
          <img src="/images/Suggestion.png" className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
