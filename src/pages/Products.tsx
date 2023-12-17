import React, { Suspense, lazy, useMemo, useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import { userProductType } from "../types/Product.type";
import { userAxios } from "../services/userInterceptor";
import ProductSkelton from "../skelton/ProductSkelton";
import ProductTemplate from "../components/Product/ProductTemplate";
import HeaderSkelton from "../skelton/HeaderSkelton";
import { useLocation } from "react-router-dom";
const FilterProducts = lazy(
  () => import("../components/Product/FilterProducts")
);
const Pagination = lazy(() => import("../components/Pagination"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Products() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limitUrl = searchParams.get("limit");
  const limitShow = limitUrl ? +limitUrl : 12;

  const { getFilterData, total, loading } =
    useFetchDataFromUrl<userProductType>(null, userAxios);

  const { paginationLoading } = usePagination(currentPage, limitShow);

  const totalPages = useMemo(() => {
    return Math.ceil(total / limitShow);
  }, [limitShow, total]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalSkeletonShow = Array.from(Array(12).keys());

  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full min-h-[400px] sm:px-4 px-1 mx-auto relative my-4">
        <Suspense>
          <FilterProducts />
        </Suspense>

        {loading || paginationLoading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
            {totalSkeletonShow?.map((index) => (
              <React.Fragment key={index}>
                <ProductSkelton />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <>
            {getFilterData.length ? (
              <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
                {getFilterData?.map((product) => (
                  <React.Fragment key={product.id}>
                    <ProductTemplate {...product} />
                  </React.Fragment>
                ))}
              </div>
            ) : getFilterData.length >= 1 ? (
              <div className="sm:text-5xl text-2xl flex justify-center items-center mt-28">
                No exact matches found
              </div>
            ) : (
              ""
            )}
          </>
        )}
        {totalPages > 1 && (
          <Suspense>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Suspense>
        )}
      </section>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

export default Products;
