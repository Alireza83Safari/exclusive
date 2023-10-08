import React, { useState } from "react";
import ProductTemplate from "../Product/ProductTemplate";
import Timer from "../Timer";

export type ProductType = {
  key: number;
  title: string;
  name: string;
  price: number;
  image: string;
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
      name: "Cbryt7i FiDiscikjount",
      price: 654,
      image: "/images/bookSelf.png",
    },
    {
      title: "xcv Sales",
      name: "Cgkhgkhggkunt",
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
      name: "Caghkutiuygount",
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
        {productData?.slice(startIndex, endIndex).map((product, index) => (
          <ProductTemplate
            key={index}
            title={product.title}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      <div className="felx justify-center items-center py-10 text-center">
        <button className="bg-red text-white py-2 px-4 rounded-md">
          View All Products
        </button>
      </div>
    </section>
  );
}

export default Promotion;
