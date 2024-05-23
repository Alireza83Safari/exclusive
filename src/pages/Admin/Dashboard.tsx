import { BestDiscount, BestSale, DashboardChart } from "../../components";
import Orders from "../../components/Admin/Dashboard/DahboardOrdersTable";
import Topbar from "../../components/Admin/Dashboard/DashboardTopbar";

function Dashboard() {
  return (
    <section className="pb-8">
      <div className="grid sm:grid-cols-3 gap-7 py-3 md:mx-7 mx-3 rounded-xl mt-4 md:ml-7 ml-3 relative">
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
    </section>
  );
}

export default Dashboard;
