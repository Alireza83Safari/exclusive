import React, { useEffect, useState } from "react";
import ProductTemplate from "./Product/ProductTemplate";
import { getProducts } from "../Redux/Store/product";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { Link } from "react-router-dom";

function BestSelling() {
  const { userProducts } = useSelector((state: rootState) => state.product);
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();
  let url = "?limit=4&order=topSell";
  useEffect(() => {
    dispatch(getProducts(false) as any);
    setDataFetched(true);
  }, [dataFetched]);

  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative px-2">
      <p className="text-red font-semibold my-5">This Month</p>
      <div className="flex justify-between items-center my-8">
        <h2 className="md:text-4xl text-2xl font-semibold mb-5">
          Best Selling Products
        </h2>
        <Link to="/products">
          <button className="px-4 bg-red text-white h-10 md:text-base text-sm">
            View All Products
          </button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {userProducts?.slice(0, 4).map((product) => (
          <ProductTemplate {...product} />
        ))}
      </div>
    </section>
  );
}

export default BestSelling;
