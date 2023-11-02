import React, { useMemo } from "react";
import { userProductType } from "../../types/Product.type";
import ProductTemplate from "../Product/ProductTemplate";

function RelatedProducts({ products }: any) {
  const memoizedProductsTemplate = useMemo(() => {
    return products?.data?.slice(0, 4)?.map((product: userProductType) => (
      <React.Fragment key={product.id}>
        <ProductTemplate {...product} />
      </React.Fragment>
    ));
  }, [products?.data]);

  return (
    <div className="col-span-10 sm:mt-28 mt-10">
      <h2 className="text-2xl font-semibold mb-5 text-center">Related Item</h2>
      <div className="grid lg:grid-cols-4 grid-cols-2">
        {memoizedProductsTemplate}
      </div>
    </div>
  );
}

export default RelatedProducts;
