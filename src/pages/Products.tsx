import React, { Suspense, lazy, useMemo, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import { userProductType } from "../types/Product.type";
const ProductTemplate = lazy(
  () => import("../components/Product/ProductTemplate")
);
const FilterProducts = lazy(() => import("../components/FilterProducts"));
const Pagination = lazy(() => import("../components/Pagination"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Products() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const limitShow = 12;
  const { getFilterProducts, totalProducts, loading } =
    useFetchDataFromUrl<userProductType>(null);

  const {} = usePagination(currentPage, limitShow);

  const totalPages = useMemo(() => {
    return Math.ceil(totalProducts / limitShow);
  }, [limitShow, totalProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Header />
      </Suspense>

      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full min-h-[400px] px-4 mx-auto relative my-4">
        <Suspense fallback={<Spinner />}>
          <FilterProducts />
        </Suspense>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {getFilterProducts.length ? (
              <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
                {getFilterProducts?.map((product) => (
                  <Suspense fallback={<Spinner />}>
                    <ProductTemplate {...product} />
                  </Suspense>
                ))}
              </div>
            ) : (
              <div className="text-5xl flex justify-center items-center mt-28">
                No exact matches found
              </div>
            )}
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

export default Products;
