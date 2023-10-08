import React from "react";
import { ProductType } from "../Promotion/Promotion";
import { Link } from "react-router-dom";

function ProductTemplate({ title, name, price, image, key }: ProductType) {
  return (
    <div className="relative group my-4 px-2" key={key}>
      <Link to={`/product/${name}`}>
        <div className="flex justify-center items-center sm:h-[250px] h-[220px] bg-gray relative">
          <p className="sm:px-3 px-1 py-1 rounded-md bg-red absolute top-3 left-3 sm:text-xs text-[10px] text-white">
            -40%
          </p>
          <div className="absolute top-3 right-3">
            <div className="sm:w-8 sm:h-8 w-6 h-6 bg-white rounded-full flex justify-center items-center">
              <img src="/images/eye.png" className="sm:w-5 sm:h-5 h-4 w-4" />
            </div>
            <div className="sm:w-8 sm:h-8 w-6 h-6 bg-white rounded-full flex justify-center items-center mt-2">
              <img src="/images/heart.png" className="h-5 w-5" />
            </div>
          </div>
          <button className="bg-black w-full absolute bottom-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            Add To Cart
          </button>
          <img src={image} className="w-7/12 object-contain" />
        </div>
        <div>
          <h3 className="md:text-base text-sm">{title}</h3>
          <div className="flex  my-1">
            <p className="text-red mr-4 md:text-base text-sm">${price}</p>
            <p className="line-through md:text-base text-sm">$160</p>
          </div>
          <div className="flex items-center">
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <span className="md:text-base text-sm">(88)</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductTemplate;
