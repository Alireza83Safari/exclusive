import {
  BestDiscount,
  BestSale,
  DashboardChart,
  DashboardTopbar,
  DahboardOrdersTable,
} from "../../components";

function Dashboard() {
  return (
    <section className="pb-8">
      <DashboardTopbar />

      <div className="grid grid-cols-12">
        <div className="grid grid-rows-2 md:col-span-8 col-span-12">
          <DashboardChart />
          <DahboardOrdersTable />
        </div>
        <div className="grid grid-rows-2 md:col-span-4 col-span-12 relative">
          <BestDiscount />
          <BestSale />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
