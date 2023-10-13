import React, { useState } from "react";
import ProductTemplate from "../Product/ProductTemplate";
import Timer from "../Timer";
import { useSelector } from "react-redux";
import { rootState } from "../../Redux/Store";
import { Link } from "react-router-dom";

function Promotion() {
  const { userProducts } = useSelector((state: rootState) => state.product);
  const [startIndex, setStartIndex] = useState(3);
  const [endIndex, setEndIndex] = useState(7);

  const prevImage = () => {
    if (endIndex < userProducts?.length) {
      setStartIndex(() => startIndex + 1);
      setEndIndex(() => endIndex + 1);
    }
  };
  const nextImage = () => {
    if (startIndex > 0) {
      setStartIndex(() => startIndex - 1);
      setEndIndex(() => endIndex - 1);
    }
  };

  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative px-3">
      <div>
        <p className="text-red font-semibold">Today’s</p>
      </div>
      <div className="sm:flex justify-between items-center my-4">
        <div className="flex">
          <div className="md:mr-28 mr-16">
            <h2 className="md:text-4xl sm:text-3xl text-xl font-semibold">
              Flash Sales
            </h2>
          </div>
          <div>
            <Timer hour={24} />
          </div>
          <div></div>
        </div>
        <div className="flex">
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2"
            onClick={nextImage}
          >
            <img src="/images/left.png" className="w-5" />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2"
            onClick={prevImage}
          >
            <img src="/images/right.png" className="w-5" />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {userProducts?.slice(startIndex, endIndex).map((product) => (
          <ProductTemplate {...product} />
        ))}
      </div>

      <div className="felx justify-center items-center py-10 text-center">
        <Link to="/products">
          <button className="bg-red text-white py-2 px-4 rounded-md">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Promotion;
