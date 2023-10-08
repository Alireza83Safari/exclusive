import React, { useState } from "react";
import ProductTemplate from "./Product/ProductTemplate";

export type ProductType = {
  title: string;
  name: string;
  price: number;
};
function BestSelling(): ProductType {
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
      image: "/images/coat.png",
    },
    {
      title: "tey Sales",
      name: "rytgvb Flat Discount",
      price: 45,
      image: "/images/bookSelf.png",
    },
    {
      title: "hkj Sales",
      name: "Cbryt7i Fhgkjhklatuihg iDiscikjount",
      price: 654,
      image: "/images/coat.png",
    },
  ];
  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative px-2">
      <p className="text-red font-semibold my-5">This Month</p>
      <div className="flex justify-between items-center my-8">
        <h2 className="md:text-4xl text-2xl font-semibold mb-5">
          Best Selling Products
        </h2>
        <button className="px-4 bg-red text-white h-10 md:text-base text-sm">
          View All Products
        </button>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {productData?.map((product, index) => (
          <ProductTemplate
            key={index}
            title={product.title}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}

export default BestSelling;
