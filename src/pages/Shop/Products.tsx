import React from "react";
import { FilterProducts, ProductTemplate } from "../../components";
import { Pagination } from "../../components";
import { ShopLayout } from "../../layout";
import { productUserApi } from "../../Redux";
import { useLocation } from "react-router-dom";
import ProductsSkeleton from "../../components/Skeleton/ProductsSkeleton";

function Products() {
  const location = useLocation();
  const { data: products, isLoading } = productUserApi.useGetProductsUserQuery(
    location.search || "?page=1&limit=12"
  );

  const pageSize = 12;
  const totalPages = Math.ceil(products?.total / pageSize);

  if (!products?.length) {
    <div className="sm:text-5xl text-2xl flex justify-center items-center mt-28">
      No exact matches found
    </div>;
  }

  return (
    <ShopLayout>
      <FilterProducts />
      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
          {products?.data.map((product: any) => (
            <React.Fragment key={product.id}>
              <ProductTemplate {...product} />
            </React.Fragment>
          ))}
        </div>
      )}
      <Pagination totalPages={totalPages} pageSize={pageSize} />
    </ShopLayout>
  );
}

export default Products;
