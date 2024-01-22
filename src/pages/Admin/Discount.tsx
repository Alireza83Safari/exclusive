import React, { Suspense } from "react";
import { ColorSkeleton } from "../../skelton/admin/Color";
import { DiscountContextProvider } from "../../components/Admin/Discount/Context/DiscountContext";
import SelectDiscountType from "../../components/Admin/Discount/SelectDiscountType";
const DiscountTable = React.lazy(
  () => import("../../components/Admin/Discount/DiscountTable")
);
const TotalDiscount = React.lazy(
  () => import("../../components/Admin/Discount/TotalDicount")
);
const AddDiscount = React.lazy(
  () => import("../../components/Admin/Discount/AddDiscount")
);

function Discount() {
  return (
    <Suspense fallback={<ColorSkeleton />}>
      <DiscountContextProvider>
        <div className="grid grid-cols-12 mt-4">
          <DiscountTable />
          <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
            <div className="lg:col-span-2 cols-span-1">
              <TotalDiscount />
            </div>
            <div className="lg:col-span-2 cols-span-1">
              <AddDiscount />
              <SelectDiscountType />
            </div>
          </div>
        </div>
      </DiscountContextProvider>
    </Suspense>
  );
}

export default Discount;
