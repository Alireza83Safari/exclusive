import React from "react";
import { useFetchDataFromUrl } from "../../hooks/useFetchDataFromUrl";
import { usePagination } from "../../hooks/usePagination";
import { userProductType } from "../../types/product";
import { userAxios } from "../../services/userInterceptor";
import { FilterProducts, ProductTemplate } from "../../components";
import { Pagination } from "../../components";
import { ShopLayout } from "../../layout";

function Products() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 12;
  const {} = usePagination(currentPage, limit);
  const {
    datas: products,
    total,
    loading,
  } = useFetchDataFromUrl<userProductType>("product", userAxios);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    const totalSkeletonShow = Array.from(Array(12).keys());
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {totalSkeletonShow?.map((index) => (
          <React.Fragment key={index}>
            {/* <ProductSkelton /> */}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    <div className="sm:text-5xl text-2xl flex justify-center items-center mt-28">
      No exact matches found
    </div>;
  }
  return (
    <ShopLayout>
      <>
        <FilterProducts />
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {products?.map((product) => (
            <React.Fragment key={product.id}>
              <ProductTemplate {...product} />
            </React.Fragment>
          ))}
        </div>
      </>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </ShopLayout>
  );
}

export default Products;
