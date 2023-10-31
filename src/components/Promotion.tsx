import React, { Suspense, lazy, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";

const ProductTemplate = lazy(() => import("./Product/ProductTemplate"));
const Timer = lazy(() => import("./Timer"));

function Promotion() {
  const { data: products } = useGetProductsUserQuery("");

  const productsHaveDiscount = useMemo(() => {
    return products?.data.filter(
      (product: any) => product.discountValue !== null
    );
  }, [products?.data]);

  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-28 relative px-3">
      <div>
        <p className="text-red font-semibold">Today’s</p>
      </div>
      <div className="sm:flex justify-between items-center my-4">
        <div className="md:mr-28 mr-16">
          <h2 className="md:text-4xl sm:text-3xl text-xl font-semibold">
            Best Have Discount
          </h2>
        </div>
        <div>
          <Suspense fallback={<Spinner />}>
            <Timer hour={24} />
          </Suspense>
        </div>
        <div></div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {productsHaveDiscount?.map((product: any) => (
          <Suspense fallback={<Spinner />}>
            <ProductTemplate {...product} />
          </Suspense>
        ))}
      </div>

      <div className="flex justify-center items-center py-10 text-center">
        <Link to="/products">
          <button className="bg-red text-white py-2 px-4 rounded-md">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Promotion;
