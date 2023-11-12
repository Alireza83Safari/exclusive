import { Suspense, lazy } from "react";
const Topbar = lazy(() => import("../../components/Admin/Dashboard/Topbar"));
const DashboardChart = lazy(
  () => import("../../components/Admin/Dashboard/DashboardChart")
);
const BestDiscount = lazy(
  () => import("../../components/Admin/Dashboard/BestDiscount")
);
const BestSale = lazy(
  () => import("../../components/Admin/Dashboard/BestSale")
);
const Orders = lazy(() => import("../../components/Admin/Dashboard/Orders"));

function Dashboard() {
  return (
    <section className="pb-8">
      <Suspense>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 py-3 md:mx-7 mx-3 rounded-xl mt-4 md:ml-7 ml-3 relative">
          <Topbar />
        </div>

        <div className="grid grid-cols-12">
          <div className="grid grid-rows-2 md:col-span-8 col-span-12">
            <DashboardChart />

            <Orders />
          </div>
          <div className="grid grid-rows-2 md:col-span-4 col-span-12 relative">
            <BestDiscount />

            <BestSale />
          </div>
        </div>
      </Suspense>
    </section>
  );
}

export default Dashboard;
