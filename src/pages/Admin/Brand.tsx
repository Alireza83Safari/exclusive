import React from "react";
import { BrandContextProvider } from "../../components/Admin/Brand/Context/BrandContext";
import BrandTable from "../../components/Admin/Brand/BrandTable";
import AddBrand from "../../components/Admin/Brand/AddBrand";
import TotalBrand from "../../components/Admin/Brand/TotalBrand";
import AddBrandFile from "../../components/Admin/Brand/AddBrandFile";

function Category() {
  return (
    <BrandContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <BrandTable />
        <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
          <div className="lg:col-span-2 cols-span-1">
            <TotalBrand />
          </div>
          <div className="lg:col-span-2 cols-span-1">
            <AddBrand />
            <AddBrandFile />
          </div>
        </div>
      </div>
    </BrandContextProvider>
  );
}

export default Category;
