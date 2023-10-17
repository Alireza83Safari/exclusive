import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { Link } from "react-router-dom";
import { getProductsWithOrder } from "../Redux/Store/product";
import Spinner from "./Spinner/Spinner";
const ProductTemplate = lazy(() => import("./Product/ProductTemplate"));
const Timer = lazy(() => import("./Timer"));

function OurProducts() {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { productsWithOrder } = useSelector(
    (state: rootState) => state.product
  );

  let url = "?page=1&limit=4&order=expensive";

  useEffect(() => {
    if (!dataFetched) {
      dispatch(getProductsWithOrder(url) as any);
      setDataFetched(true);
    }
  }, [dataFetched]);

  const ourProducts = productsWithOrder[url];
  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-20 relative px-2">
      <div>
        <p className="text-red font-semibold mb-5">Today’s</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="md:mr-28 mr-10">
          <h2 className="md:text-4xl text-3xl font-semibold mb-5">
            Flash Sales
          </h2>
        </div>
        <div>
          <Suspense fallback={<Spinner />}>
            <Timer hour={24} />
          </Suspense>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {ourProducts?.map((product) => (
          <Suspense fallback={<Spinner />}>
            <ProductTemplate {...product} />
          </Suspense>
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
