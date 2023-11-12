import { useContext, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import Spinner from "../../../Spinner/Spinner";
import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";

const AddProductInfo = lazy(() => import("./AddProductInfo"));
const AddProductItem = lazy(() => import("./AddProductItem"));
const AddProductFeature = lazy(() => import("./AddProductFeature"));
const AddProductFile = lazy(() => import("./AddProductFile"));

export default function AddProduct() {
  const {
    showAddProductModal,
    showAddInfoModal,
    showAddItem,
    showAddFile,
    showAddFeature,
  } = useContext(ProductsContext) as ProductsContextType;

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showAddProductModal ? "visible" : "invisible"
      }`}
    >
      <div className="w-3/7 bg-white max-h-2/3 rounded-lg">
        <Suspense fallback={<Spinner />}>
          {showAddInfoModal && <AddProductInfo />}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          {showAddItem && <AddProductItem />}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          {showAddFeature && <AddProductFeature />}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          {showAddFile && <AddProductFile />}
        </Suspense>
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}
