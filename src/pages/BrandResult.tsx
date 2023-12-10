import React, { Suspense, lazy, useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import Spinner from "../components/Spinner/Spinner";
import { userProductType } from "../types/Product.type";
import { userAxios } from "../services/userInterceptor";
import HeaderSkelton from "../skelton/HeaderSkelton";
import ProductTemplate from "../components/Product/ProductTemplate";
import { useLocation } from "react-router-dom";
const Pagination = lazy(() => import("../components/Pagination"));
const FilterProducts = lazy(
  () => import("../components/Product/FilterProducts")
);
const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("../components/Footer"));

function BrandResult() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limitUrl = searchParams.get("limit");
  const limitShow = limitUrl ? +limitUrl : 12;
  const { getFilterData, total, loading } =
    useFetchDataFromUrl<userProductType>(null, userAxios);

  const { paginationLoading } = usePagination(currentPage, limitShow);

  const totalPages = Math.ceil(total / limitShow);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Suspense fallback={<HeaderSkelton />}>
        <Header />
      </Suspense>
      <section className="max-w-[1170px] mx-auto mt-5 relative px-2 min-h-[400px]">
        <Suspense>
          <FilterProducts />
        </Suspense>
        {loading || paginationLoading ? (
          <Spinner />
        ) : getFilterData.length >= 1 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
            {getFilterData?.map((product) => (
              <React.Fragment key={product.id}>
                <ProductTemplate {...product} productsLoading={loading} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <h2 className="text-4xl font-bold mt-32 text-center">
            No exact matches found
          </h2>
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

export default BrandResult;
