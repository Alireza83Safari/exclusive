import React, { Suspense, lazy, useEffect, useState } from "react";
import { getProducts, getProductsWithOrder } from "../Redux/Store/product";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { Link } from "react-router-dom";
import { userProductType } from "../types/Product.type";
import Spinner from "./Spinner/Spinner";
const ProductTemplate = lazy(() => import("./Product/ProductTemplate"));

function BestSelling() {
  const { productsWithOrder } = useSelector(
    (state: rootState) => state.product
  );
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const dispatch = useDispatch();
  let url = "?order=topSell";
  useEffect(() => {
    dispatch(getProductsWithOrder(url) as any);
    setDataFetched(true);
  }, [dataFetched]);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(getProducts(false) as any);
      setDataFetched(true);
    }
  }, [dataFetched]);
  const dataForExpensiveOrder = productsWithOrder[url];

  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-20 relative px-4">
      <p className="text-red font-semibold my-5">This Month</p>
      <div className="flex justify-between items-center my-8">
        <h2 className="md:text-4xl text-2xl font-semibold mb-5">
          Best Selling Products
        </h2>
        <Link to="/products?product&order=topSell">
          <button className="px-4 bg-red text-white h-10 md:text-base text-sm">
            View All Products
          </button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {dataForExpensiveOrder?.slice(0, 4).map((product: userProductType) => (
          <Suspense fallback={<Spinner />}>
            <ProductTemplate {...product} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

export default BestSelling;
