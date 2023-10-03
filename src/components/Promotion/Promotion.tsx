import React, { useState } from "react";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import ProductTemplate from "../Product/ProductTemplate";

export type ProductType = {
  title: string;
  name: string;
  price: number;
};
function Promotion(): ProductType {
  const productData = [
    {
      title: "Flash Sales",
      name: "Cart With Flat Discount",
      price: 160,
      image: "/images/bookSelf.png",
    },
    {
      title: "urt Sales",
      name: "yjthghjgj Flat Discount",
      price: 1450,
      image: "/images/bookSelf.png",
    },
    {
      title: "tey Sales",
      name: "rytgvb Flat Discount",
      price: 45,
      image: "/images/product-1.png",
    },
    {
      title: "hkj Sales",
      name: "Cbryt7i Fhgkjhklatuihg iDiscikjount",
      price: 654,
      image: "/images/bookSelf.png",
    },
    {
      title: "xcv Sales",
      name: "Cgkhgkhgkhgkunt",
      price: 645,
      image: "/images/product-1.png",
    },
    {
      title: "yut Sales",
      name: "Caghkhgkhgjkunt",
      price: 645,
      image: "/images/product-1.png",
    },
    {
      title: "fgh Sales",
      name: "Caghkutiuyjgount",
      price: 546,
      image: "/images/product-1.png",
    },
  ];
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  console.log(productData.length);

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
  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative text-center">
      <div>
        <p className="text-red font-semibold">Today’s</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="mr-28">
            <h2 className="text-4xl font-semibold">Flash Sales</h2>
          </div>
          <div className="flex">
            <div className="mr-5">
              <span>Days</span>
              <p>03</p>
            </div>
            <div className="mr-5">
              <span>Days</span>
              <p>03</p>
            </div>
            <div className="mr-5">
              <span>Days</span>
              <p>03</p>
            </div>
            <div className="mr-5">
              <span>Days</span>
              <p>03</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex">
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2"
            onClick={nextImage}
          >
            <img src={left} className="w-5" />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray rounded-full mx-2"
            onClick={prevImage}
          >
            <img src={right} className="w-5" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {productData?.slice(startIndex, endIndex).map((product) => (
          <ProductTemplate
            title={product.title}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      <div className="felx justify-center items-center py-10 mx-auto">
        <button className="bg-red text-white py-2 px-4 rounded-md">
          View All Products
        </button>
      </div>
    </section>
  );
}

export default Promotion;
