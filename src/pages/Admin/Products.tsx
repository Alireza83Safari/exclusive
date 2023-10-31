import React from "react";
import { ProductsContextProvider } from "../../components/Admin/Products/Context/ProductsContext";
import ProductsPanel from "../../components/Admin/Products/ProductsPanel";

function Products() {
  return (
    <ProductsContextProvider>
      <ProductsPanel />
    </ProductsContextProvider>
  );
}

export default Products;
