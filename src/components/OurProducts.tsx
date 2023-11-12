import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";
import ProductSkelton from "../skelton/ProductSkelton";
import ProductTemplate from "./Product/ProductTemplate";
const Timer = lazy(() => import("./Timer"));

function OurProducts() {
  const { data: expensiveProducts, isLoading } = useGetProductsUserQuery(
    "?page=1&limit=4&order=expensive"
  );
  const totalSkeletonShow = Array.from(Array(4).keys());

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

      {isLoading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {totalSkeletonShow?.map((index) => (
            <React.Fragment key={index}>
              <ProductSkelton />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {expensiveProducts?.data?.map((product: any) => (
            <React.Fragment key={product.id}>
              <ProductTemplate {...product} />
            </React.Fragment>
          ))}
        </div>
      )}

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
