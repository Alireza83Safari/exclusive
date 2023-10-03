import React from "react";

function Suggestion() {
  return (
    <div className="max-w-[1170px] mx-auto col-span-10  py-8">
      <div className="w-full h-[500px] bg-black px-16 grid grid-cols-2">
        <div className=" my-16">
          <p className="text-green">Categories</p>
          <h2 className="text-5xl text-white font-semibold my-10">
            Enhance Your Music Experience
          </h2>
          <div className="flex my-14 bg-gradient-to-br">
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
        <div className="w-full m-auto h-[344px]">
          <img src="/images/Suggestion.png" className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
