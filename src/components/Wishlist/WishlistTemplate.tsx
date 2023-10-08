import React from "react";

type WishlistProps = {
  key: number;
  title: string;
  name: string;
  price: number;
  image: string;
};
function WishlistTemplate({ key, title, name, price, image }: WishlistProps) {
  console.log(image);

  return (
    <div className="relative group m-2" key={key}>
      <div className="flex justify-center items-center h-[250px] bg-gray relative">
        <p className="px-3 py-1 rounded-md bg-red absolute top-3 left-3 text-xs text-white">
          -40%
        </p>
        <div className="absolute top-3 right-3">
          <div className="w-7 h-7 bg-white rounded-full flex justify-center items-center">
            <img src="/images/garbage.png" alt="" className="w-5 h-5" />
          </div>
        </div>
        <button className="bg-black w-full absolute bottom-0 text-white py-2">
          Add To Cart
        </button>
        <img src={image} className="w-7/12 object-contain" />
      </div>
      <div>
        <h3>{title}</h3>
        <div className="flex">
          <p className="text-red mr-4">${price}</p>
          <p className="line-through">$160</p>
        </div>
        <div className="flex items-center">
          <img src="/images/star.png" className="w-4 h-4" alt="Star" />
          <img src="/images/star.png" className="w-4 h-4" alt="Star" />
          <img src="/images/star.png" className="w-4 h-4" alt="Star" />
          <img src="/images/star.png" className="w-4 h-4" alt="Star" />
          <img src="/images/star.png" className="w-4 h-4" alt="Star" />
          <span>(88)</span>
        </div>
      </div>
    </div>
  );
}

export default WishlistTemplate;
