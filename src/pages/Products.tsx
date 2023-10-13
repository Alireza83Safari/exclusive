import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { getProducts } from "../Redux/Store/product";
import ProductTemplate from "../components/Product/ProductTemplate";
import Spinner from "../components/Spinner/Spinner";
import { useFetchDataFromUrl } from "../hooks/useFetchDataFromUrl";
import { usePagination } from "../hooks/usePagination";
import Pagination from "../components/Pagination";
function Products() {
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { productLoading } = useSelector((state: rootState) => state.product);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(getProducts(false) as any);
      setDataFetched(true);
    }
  }, [dataFetched]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limitShow = 12;
  const { getFilterProducts, totalProducts, loading } = useFetchDataFromUrl();
  const {} = usePagination(currentPage, limitShow);
  const totalPages = Math.ceil(totalProducts / limitShow);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <section className="max-w-[1170px] mx-auto relative my-20">
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {productLoading || loading ? (
          <Spinner />
        ) : (
          getFilterProducts?.map((product) => <ProductTemplate {...product} />)
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default Products;
