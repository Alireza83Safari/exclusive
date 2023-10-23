import React, { useContext, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import Spinner from "../../../Spinner/Spinner";

import {
  ProductsContext,
  ProductsContextType,
} from "../Context/ProductsContext";
const ProductInfo = lazy(() => import("./ProductInfo"));
const ProductItemInfo = lazy(() => import("./ProductItemInfo"));
/* const AddProductInfo = lazy(() => import("./AddProductInfo"));
const AddProductItem = lazy(() => import("./AddProductItem"));
const AddProductFeature = lazy(() => import("./AddProductFeature"));
const AddProductFile = lazy(() => import("./AddProductFile")); */

export default function Info() {
  const { showProductInfoModal } = useContext(
    ProductsContext
  ) as ProductsContextType;

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-[#dddd] -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition overflow-auto duration-400 ${
        showProductInfoModal ? "visible" : "invisible"
      }`}
    >
      <div className="w-auto bg-white min-h-5/6 rounded-lg">
        <Suspense fallback={<Spinner />}>
          <ProductInfo />
        </Suspense>
        <Suspense fallback={<Spinner />}>
        <ProductItemInfo />
        </Suspense>
      
        {/*
          {showAddFeature && <AddProductFeature />}
          {showAddFile && <AddProductFile />} */}
      </div>
    </section>,
    document.getElementById("portal") as any
  );
}
