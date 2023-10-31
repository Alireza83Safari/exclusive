import React from "react";
import DashboardChart from "../../components/Admin/Dashboard/DashboardChart";
import Topbar from "../../components/Admin/Dashboard/Topbar";
import BestDiscount from "../../components/Admin/Dashboard/BestDiscount";
import BestSale from "../../components/Admin/Dashboard/BestSale";
import Orders from "../../components/Admin/Dashboard/Orders";

function Dashboard() {
  return (
    <section className="pb-8">
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
    </section>
  );
}

export default Dashboard;
