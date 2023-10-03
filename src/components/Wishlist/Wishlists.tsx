import React from "react";
import WishlistTemplate from "./WishlistTemplate";

function Wishlists() {
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
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-10">
          <p> Wishlist(4)</p>
          <button className="py-3 px-5 border border-borderColor">
            View All Products
          </button>
        </div>
        <div className="grid grid-cols-4">
          {productData?.map((product) => (
            <WishlistTemplate
              title={product.title}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-10">
          <p>Just For You</p>
          <button className="py-3 px-10 border border-borderColor">
            See All
          </button>
        </div>
        <div className="grid grid-cols-4">
          {productData?.map((product) => (
            <WishlistTemplate
              title={product.title}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlists;
