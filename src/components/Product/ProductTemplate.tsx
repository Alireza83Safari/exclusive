import React from "react";
import star from "../../assets/images/star.png";
import heart from "../../assets/images/heart.png";
import eye from "../../assets/images/eye.png";
import { ProductType } from "../Promotion/Promotion";

function ProductTemplate({
  title,
  name,
  price,
  image,
}: ProductType): JSX.Element {
  console.log(image);

  return (
    <div className="w-[270px] h-[350px] relative group">
      <div className="flex justify-center items-center w-[270px] h-[250px] bg-gray relative">
        <p className="px-3 py-1 rounded-md bg-red absolute top-3 left-3 text-xs text-white">
          -40%
        </p>
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
            <img src={eye} alt="" className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center mt-2">
            <img src={heart} alt="" className="w-6 h-6" />
          </div>
        </div>
        <button className="bg-black w-full absolute bottom-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add To Cart
        </button>
        <img src={image} className="max-w-[190px] object-contain" />
      </div>
      <div>
        <h3>{name}</h3>
        <div className="flex">
          <p className="text-red mr-4">${price}</p>
          <p className="line-through">$160</p>
        </div>
        <div className="flex items-center">
          <img src={star} className="w-4 h-4" alt="Star" />
          <img src={star} className="w-4 h-4" alt="Star" />
          <img src={star} className="w-4 h-4" alt="Star" />
          <img src={star} className="w-4 h-4" alt="Star" />
          <img src={star} className="w-4 h-4" alt="Star" />
          <span>(88)</span>
        </div>
      </div>
    </div>
  );
}

export default ProductTemplate;
