import React, { useState } from "react";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import ProductTemplate from "../components/Product/ProductTemplate";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner/Spinner";

function CategoryResult() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitShow = 12;
  const { getFilterProducts, totalProducts, loading } = useFetchDataFromUrl();
  const {} = usePagination(currentPage, limitShow);
  const totalPages = Math.ceil(totalProducts / limitShow);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="max-w-[1170px] mx-auto mt-20 relative px-2 min-h-[400px]">
      {loading ? (
        <Spinner />
      ) : getFilterProducts.length >= 1 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {getFilterProducts?.map((product) => (
            <ProductTemplate {...product} />
          ))}
        </div>
      ) : (
        <h2 className="text-4xl font-bold mt-32 text-center">
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
  );
}

export default CategoryResult;
