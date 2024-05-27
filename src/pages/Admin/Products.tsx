import { useState } from "react";
import { productAdminApi } from "../../Redux";
import { useLocation } from "react-router-dom";
import { AddNewProduct, Info, ProductsTable } from "../../components";

function Products() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  //// edit
  const [showInfo, setShowInfo] = useState(true);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showEditFile, setShowEditFile] = useState(false);
  const [showProductInfoModal, setShowProductInfoModal] = useState(false);
  const [editProductId, setEditProductId] = useState<string>("");

  const [productInfo, setProductInfo] = useState({});
  const location = useLocation();
  const {
    data: products,
    refetch: refetchProducts,
    isLoading,
  } = productAdminApi.useGetProductsAdminQuery(
    location.search.length ? location.search : "?page=1&limit=9"
  );

  return (
    <>
      <ProductsTable
        setShowAddProductModal={setShowAddProductModal}
        setShowProductInfoModal={setShowProductInfoModal}
        setEditProductId={setEditProductId}
        refetchProducts={refetchProducts}
        products={products}
        isLoading={isLoading}
        setProductInfo={setProductInfo}
      />
      <AddNewProduct
        showAddProductModal={showAddProductModal}
        setShowAddProductModal={setShowAddProductModal}
        refetchProducts={refetchProducts}
      />
      {showProductInfoModal && (
        <Info
          showProductInfoModal={showProductInfoModal}
          setShowInfo={setShowInfo}
          setShowEditItem={setShowEditItem}
          setShowEditFile={setShowEditFile}
          showInfo={showInfo}
          showEditItem={showEditItem}
          showEditFile={showEditFile}
          setShowProductInfoModal={setShowProductInfoModal}
          editProductId={editProductId}
          refetchProducts={refetchProducts}
        />
      )}
    </>
  );
}

export default Products;
