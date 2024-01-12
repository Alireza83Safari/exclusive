import React from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import { userProductType } from "../types/Product.type";
import { userAxios } from "../services/userInterceptor";
import ProductSkelton from "../skelton/ProductSkelton";
import {
  FilterProducts,
  Footer,
  Header,
  Pagination,
  ProductTemplate,
} from "../components";

function CategoryResult() {
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

      <section className="xl:max-w-[1280px] md:max-w-[98%] w-full mx-auto mt-5 relative px-2 min-h-[400px]">
        <FilterProducts />

        {loading ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
            {totalSkeletonShow?.map((index) => (
              <React.Fragment key={index}>
                <ProductSkelton />
              </React.Fragment>
            ))}
          </div>
        ) : getFilterData.length >= 1 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
            {getFilterData?.map((product) => (
              <React.Fragment key={product.id}>
                <ProductTemplate {...product} productsLoading={loading} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <h2 className="text-4xl font-bold mt-32 text-center  min-h-[500px]">
            No exact matches found
          </h2>
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

export default CategoryResult;
