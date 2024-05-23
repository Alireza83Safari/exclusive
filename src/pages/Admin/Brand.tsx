import { BrandContextProvider } from "../../context/admin/brandContext";
import {
  AddBrand,
  AddBrandFile,
  BrandTable,
  TotalBrand,
} from "../../components";

function Brand() {
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

export default Brand;
