import ReactDOM from "react-dom";
import { AddProductProps } from "./AddProduct.interface";
import {
  AddProductItem,
  AddProductFile,
  AddProductFeature,
  AddProductInfo,
} from "../../../..";
import { useState } from "react";

export default function AddProduct(props: AddProductProps) {
  const { showAddProductModal, setShowAddProductModal, refetchProducts } =
    props;
  const [showAddInfoModal, setShowAddInfoModal] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [createProductId, setCreateProductId] = useState<string>("");
  const [showAddFile, setShowAddFile] = useState(false);

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showAddProductModal ? "visible" : "invisible"
      }`}
    >
      <div className="w-3/7 bg-white max-h-2/3 rounded-lg">
        {showAddInfoModal && (
          <AddProductInfo
            setShowAddInfoModal={setShowAddInfoModal}
            setShowAddItem={setShowAddItem}
            setCreateProductId={setCreateProductId}
            setShowAddProductModal={setShowAddProductModal}
            createProductId={createProductId}
            refetchProducts={refetchProducts}
          />
        )}
        {showAddItem && (
          <AddProductItem
            setShowAddItem={setShowAddItem}
            setShowAddFeature={setShowAddFeature}
            createProductId={createProductId}
            showAddItem={showAddItem}
            setShowAddProductModal={setShowAddProductModal}
            setShowAddInfoModal={setShowAddInfoModal}
            refetchProducts={refetchProducts}
          />
        )}
        {showAddFeature && (
          <AddProductFeature
            createProductId={createProductId}
            setShowAddFile={setShowAddFile}
            setShowAddFeature={setShowAddFeature}
            setShowAddProductModal={setShowAddProductModal}
            setShowAddInfoModal={setShowAddInfoModal}
            refetchProducts={refetchProducts}
          />
        )}
        {showAddFile && (
          <AddProductFile
            setShowAddProductModal={setShowAddProductModal}
            createProductId={createProductId}
            setShowAddFile={setShowAddFile}
            setShowAddInfoModal={setShowAddInfoModal}
            refetchProducts={refetchProducts}
          />
        )}
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}
