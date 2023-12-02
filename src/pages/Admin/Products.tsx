import { ProductsContextProvider } from "../../components/Admin/Products/Context/ProductsContext";
  import { lazy, Suspense } from 'react';
import Spinner from "../../components/Spinner/Spinner";
const ProductsPanel = lazy(() => import("../../components/Admin/Products/ProductsPanel"));

function Products() {
  return (
    <ProductsContextProvider>
        <Suspense
        fallback={
          <div className="min-h-screen flex items-center">
            <Spinner />
          </div>
        }
      >

      <ProductsPanel />
      </Suspense>
    </ProductsContextProvider>
  );
}

export default Products;
