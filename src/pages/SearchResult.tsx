/* import React, { Suspense, lazy, useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { userProductType } from "../types/Product.type";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/Spinner/Spinner";
const ProductTemplate = lazy(
  () => import("../components/Product/ProductTemplate")
);
const FilterProducts = lazy(() => import("../components/FilterProducts"));
const Pagination = lazy(() => import("../components/Pagination"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function SearchResult() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitShow = 12;
  const { getFilterProducts, totalProducts, loading } =
    useFetchDataFromUrl<userProductType>(null);
  const {} = usePagination(1, 2);
  const totalPages = Math.ceil(totalProducts / limitShow);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header />
      </Suspense>
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto relative mt-5">
        <Suspense fallback={<Spinner />}>
          <FilterProducts />
        </Suspense>
        {getFilterProducts.length ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
            {loading || loading ? (
              <Spinner />
            ) : (
              getFilterProducts?.map((product) => (
                <Suspense fallback={<Spinner />}>
                  <ProductTemplate {...product} />
                </Suspense>
              ))
            )}
          </div>
        ) : (
          <h2 className="text-4xl font-bold mt-32 text-center">
            No exact matches found
          </h2>
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
 */

import React from 'react'

function SearchResult() {
  return (
    <div>SearchResult</div>
  )
}

export default SearchResult