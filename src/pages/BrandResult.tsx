import React, { Suspense, lazy, useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/Spinner/Spinner";
import { userProductType } from "../types/Product.type";
const ProductTemplate = lazy(
  () => import("../components/Product/ProductTemplate")
);
const Pagination = lazy(() => import("../components/Pagination"));
const FilterProducts = lazy(() => import("../components/FilterProducts"));

function BrandResult() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitShow = 12;
  const { getFilterProducts, totalProducts, loading } =
    useFetchDataFromUrl<userProductType>(null);
  const {} = usePagination(currentPage, limitShow);
  const totalPages = Math.ceil(totalProducts / limitShow);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log(getFilterProducts);

  return (
    <section className="max-w-[1170px] mx-auto mt-5 relative px-2 min-h-[400px]">
      <Suspense fallback={<Spinner />}>
        <FilterProducts />
      </Suspense>
      {loading ? (
        <Spinner />
      ) : getFilterProducts.length >= 1 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {getFilterProducts?.map((product) => (
            <Suspense fallback={<Spinner />}>
              <ProductTemplate {...product} productsLoading={loading} />
            </Suspense>
          ))}
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
  );
}

export default BrandResult;
