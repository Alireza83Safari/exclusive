import BestDiscount from "../../../Admin/Dashboard/BestDiscount/BestDiscount";
import BestSale from "../../../Admin/Dashboard/BestSale/BestSale";
import DashboardChartSkeleton from "./DashboardChartSkeleton";
import DashboardTableSkeleton from "./DashboardTableSkeleton";
import DashboardTopbarSkeleton from "./DashboardTopbarSkeleton";

const DashboardSkeleton = () => {
  return (
    <section className="pb-8">
      <DashboardTopbarSkeleton />

      <div className="grid grid-cols-12">
        <div className="grid grid-rows-2 md:col-span-8 col-span-12">
          <DashboardChartSkeleton />
          <DashboardTableSkeleton />
        </div>
        <div className="grid grid-rows-2 md:col-span-4 col-span-12 relative">
          <BestDiscount />
          <BestSale />
        </div>
      </div>
    </section>
  );
};

export default DashboardSkeleton;
