import React from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { userProductType } from "../types/Product.type";
import { usePagination } from "../hooks/usePagination";
import { userAxios } from "../services/userInterceptor";
import ProductSkelton from "../skelton/ProductSkelton";
import { Footer, Header, Pagination, FilterProducts } from "../components";
const ProductTemplate = React.lazy(
  () => import("../components/Product/ProductTemplate")
);

function SearchResult() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const limit = 12;
  const { getFilterData, total, loading } =
    useFetchDataFromUrl<userProductType>(null, userAxios);
  const {} = usePagination(currentPage, limit);
  const totalPages = Math.ceil(total / limit);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const totalSkeletonShow = Array.from(Array(12).keys());

  return (
    <>
      <Header />

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
              <div className="sm:text-5xl text-2xl flex justify-center items-center mt-28">
                No exact matches found
              </div>
            ) : (
              ""
            )}
          </>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      <Footer />
    </>
  );
}

export default SearchResult;
