import React, { Suspense } from "react";
import { BrandContextProvider } from "../../components/Admin/Brand/Context/BrandContext";
import Spinner from "../../components/Spinner/Spinner";

const BrandTable = React.lazy(() => import("../../components/Admin/Brand/BrandTable"));
const TotalBrand = React.lazy(() => import("../../components/Admin/Brand/TotalBrand"));
const AddBrand = React.lazy(() => import("../../components/Admin/Brand/AddBrand"));
const AddBrandFile = React.lazy(() => import("../../components/Admin/Brand/AddBrandFile"));

function Brand() {
  return (
    <BrandContextProvider>
      <div className="grid grid-cols-12 mt-4 ">
        <Suspense fallback={<Spinner />}>
          <BrandTable />
        </Suspense>
        <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
          <div className="lg:col-span-2 cols-span-1">
            <Suspense fallback={<div>Loading...</div>}>
              <TotalBrand />
            </Suspense>
          </div>
          <div className="lg:col-span-2 cols-span-1">
            <Suspense fallback={<div>Loading...</div>}>
              <AddBrand />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <AddBrandFile />
            </Suspense>
          </div>
        </div>
      </div>
    </BrandContextProvider>
  );
}

export default Brand;
