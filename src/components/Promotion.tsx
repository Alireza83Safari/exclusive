import React, { Suspense, lazy, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";
import ProductSkelton from "../skelton/ProductSkelton";
import ProductTemplate from "./Product/ProductTemplate";
const Timer = lazy(() => import("./Timer"));

function Promotion() {
  const { data: products, isLoading } = useGetProductsUserQuery("?onlyDiscount=true");

  const productsHaveDiscount = useMemo(() => {
    return products?.data.filter(
      (product: any) => product.discountValue !== ""
    );
  }, [products?.data]);

  const totalSkeletonShow = Array.from(Array(4).keys());

  return (
    <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-28 relative px-3">
      {productsHaveDiscount?.length ? (
        <>
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
              <Suspense>
                <Timer hour={24} />
              </Suspense>
            </div>
            <></>
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
              {productsHaveDiscount?.slice(0, 4)?.map((product: any) => (
                <React.Fragment key={product.id}>
                  <ProductTemplate {...product} />
                </React.Fragment>
              ))}
            </div>
          )}
          <div className="flex justify-center items-center py-10 text-center">
            <Link to="/products?onlyDiscount=true">
              <button className="bg-red text-white py-2 sm:px-4 px-2 rounded-md hover:bg-rose-400 duration-300 md:text-base text-sm">
                View All Products Have Discount
              </button>
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

export default Promotion;
