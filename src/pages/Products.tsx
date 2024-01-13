import React from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import { userProductType } from "../types/Product.type";
import { userAxios } from "../services/userInterceptor";
import ProductSkelton from "../skelton/ProductSkelton";
import ProductTemplate from "../components/Product/ProductTemplate";
import { Footer, Header, Pagination } from "../components";
const FilterProducts = React.lazy(
  () => import("../components/Product/FilterProducts")
);

function Products() {
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

      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full min-h-[400px] sm:px-4 px-1 mx-auto relative my-4">
        <React.Suspense>
          <FilterProducts />
        </React.Suspense>

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

export default Products;
