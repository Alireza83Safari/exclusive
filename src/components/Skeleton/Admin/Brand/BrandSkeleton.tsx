import AddBrandSkeleton from "./AddBrandSkeleton";
import BrandTableSkeleton from "./BrandTableSkeleton";
import TotalBrandSkeleton from "./TotalBrandSkeleton";

function BrandSkeleton() {
  return (
    <div className="grid grid-cols-12 mt-4">
      <BrandTableSkeleton />

      <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
        <TotalBrandSkeleton />
        <AddBrandSkeleton />
      </div>
    </div>
  );
}

export default BrandSkeleton;
