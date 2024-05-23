import { ProductsPanel } from "../../components";
import { ProductsContextProvider } from "../../context/admin/productsContext";

function Products() {
  return (
    <ProductsContextProvider>
      <ProductsPanel />
    </ProductsContextProvider>
  );
}

export default Products;
