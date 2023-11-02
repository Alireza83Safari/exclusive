import React, { Suspense, lazy, useMemo, useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import { userProductType } from "../types/Product.type";
import { userAxios } from "../services/userInterceptor";
import ProductSkelton from "../skelton/ProductSkelton";
import ProductTemplate from "../components/Product/ProductTemplate";
import HeaderSkelton from "../skelton/HeaderSkelton";
const FilterProducts = lazy(() => import("../components/FilterProducts"));
const Pagination = lazy(() => import("../components/Pagination"));
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function Products() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitShow = 12;
  const { getFilterData, total, loading } =
    useFetchDataFromUrl<userProductType>(null, userAxios);

  const {} = usePagination(currentPage, limitShow);

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
      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full min-h-[400px] px-4 mx-auto relative my-4">
        <Suspense>
          <FilterProducts />
        </Suspense>

        {loading ? (
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
              <div className="text-5xl flex justify-center items-center mt-28">
                No exact matches found
              </div>
            ) : null}
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
