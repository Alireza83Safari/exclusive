import { SelectDiscountType } from "../../components";
import { AddDiscount, DiscountTable } from "../../components";
import TotalDiscount from "../../components/Admin/Discount/TotalDicount/TotalDicount";
import { discountAdminApi } from "../../Redux";
import { useState } from "react";

function Discount() {
  const [discountType, setDiscountType] = useState("");

  const {
    data: discounts,
    isLoading,
    refetch,
  } = discountAdminApi.useGetDiscountAdminQuery(
    location.search || "?page=1&limit=10"
  );
  return (
    <div className="grid grid-cols-12 mt-4">
      <DiscountTable
        discounts={discounts}
        isLoading={isLoading}
        refetchDiscount={refetch}
      />
      <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
        <div className="lg:col-span-2 cols-span-1">
          <TotalDiscount total={discounts?.total} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2 cols-span-1">
          <AddDiscount refetchDiscount={refetch} discountType={discountType} />
          <SelectDiscountType
            setDiscountType={setDiscountType}
            discountType={discountType}
          />
        </div>
      </div>
    </div>
  );
}

export default Discount;
