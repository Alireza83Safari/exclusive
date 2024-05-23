import { useContext } from "react";
import ProductsTable from "./ProductsTable";
import AddNewProduct from "./Add/AddProduct";
import Info from "./Info/Info";
import {
  ProductsContext,
  ProductsContextType,
} from "../../../context/admin/productsContext";

function ProductsPanel() {
  const { showProductInfoModal } = useContext(
    ProductsContext
  ) as ProductsContextType;
  return (
    <div>
      <ProductsTable />
      <AddNewProduct />
      {showProductInfoModal && <Info />}
    </div>
  );
}

export default ProductsPanel;
