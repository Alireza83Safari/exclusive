import React from "react";
import { AppPicContextProvider } from "../../components/Admin/AppPic/Context/AppPicContext";
import AddAppPic from "../../components/Admin/AppPic/AddAppPic";
import TotalAppPic from "../../components/Admin/AppPic/TotalAppPic";
import AppPicTable from "../../components/Admin/AppPic/AppPicTable";

function AppPic() {
  return (
    <AppPicContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <AppPicTable />
        <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
          <div className="lg:col-span-2 cols-span-1">
            <TotalAppPic />
          </div>
          <div className="lg:col-span-2 cols-span-1">
            <AddAppPic />
          </div>
        </div>
      </div>
    </AppPicContextProvider>
  );
}

export default AppPic;
