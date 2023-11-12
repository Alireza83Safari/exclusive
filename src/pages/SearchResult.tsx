import React, { Suspense, lazy, useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { userProductType } from "../types/Product.type";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/Spinner/Spinner";
import { userAxios } from "../services/userInterceptor";
import HeaderSkelton from "../skelton/HeaderSkelton";
import ProductSkelton from "../skelton/ProductSkelton";
import FilterProducts from "../components/FilterProducts";
const ProductTemplate = lazy(
  () => import("../components/Product/ProductTemplate")
);
const Pagination = lazy(() => import("../components/Pagination"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function SearchResult() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitShow = 12;
  const { getFilterData, total, loading } =
    useFetchDataFromUrl<userProductType>(null, userAxios);
  const {} = usePagination(1, 2);
  const totalPages = Math.ceil(total / limitShow);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const totalSkeletonShow = Array.from(Array(12).keys());

  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative mt-5">
          <FilterProducts />
        {loading || loading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
            {totalSkeletonShow?.map((_, index) => (
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
            ) : !getFilterData.length ? (
              <div className="text-5xl flex justify-center items-center mt-28">
                No exact matches found
              </div>
            ) : ""}
          </>
        )}

        {totalPages > 1 && (
          <Suspense fallback={<Spinner />}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Suspense>
        )}
      </section>

      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default SearchResult;
