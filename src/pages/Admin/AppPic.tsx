import React, { Suspense } from "react";
import { AppPicContextProvider } from "../../components/Admin/AppPic/Context/AppPicContext";
import Spinner from "../../components/Spinner/Spinner";

const AppPicTable = React.lazy(() => import("../../components/Admin/AppPic/AppPicTable"));
const TotalAppPic = React.lazy(() => import("../../components/Admin/AppPic/TotalAppPic"));
const AddAppPic = React.lazy(() => import("../../components/Admin/AppPic/AddAppPic"));

function AppPic() {
  return (
    <AppPicContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <Suspense fallback={<Spinner/>}>
          <AppPicTable />
        </Suspense>
        <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
          <div className="lg:col-span-2 cols-span-1">
            <Suspense fallback={<div>Loading...</div>}>
              <TotalAppPic />
            </Suspense>
          </div>
          <div className="lg:col-span-2 cols-span-1">
            <Suspense fallback={<div>Loading...</div>}>
              <AddAppPic />
            </Suspense>
          </div>
        </div>
      </div>
    </AppPicContextProvider>
  );
}

export default AppPic;
