import React, { useEffect, useState } from "react";
import ProductTemplate from "./Product/ProductTemplate";
import Timer from "./Timer";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { getProducts } from "../Redux/Store/product";
import { Link } from "react-router-dom";

function OurProducts() {
  const [startIndex, setStartIndex] = useState(2);
  const [endIndex, setEndIndex] = useState(6);

  const prevImage = () => {
    if (endIndex < productData?.length) {
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
  const { userProducts } = useSelector((state: rootState) => state.product);

  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative px-2">
      <div>
        <p className="text-red font-semibold mb-5">Today’s</p>
      </div>
      <div className="md:flex justify-between items-center">
        <div className="flex">
          <div className="md:mr-28 mr-10">
            <h2 className="md:text-4xl text-3xl font-semibold mb-5">
              Flash Sales
            </h2>
          </div>
          <div>
            <Timer hour={24} />
          </div>
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

export default OurProducts;
