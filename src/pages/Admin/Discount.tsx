import { DiscountContextProvider } from "../../context/admin/discountContext";
import SelectDiscountType from "../../components/Admin/Discount/SelectDiscountType";
import { AddDiscount, DiscountTable } from "../../components";
import TotalDiscount from "../../components/Admin/Discount/TotalDicount";

function Discount() {
  return (
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
  );
}

export default Discount;
