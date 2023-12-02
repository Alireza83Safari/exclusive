import React, { Suspense } from "react";
import { AppPicContextProvider } from "../../components/Admin/AppPic/Context/AppPicContext";
import Spinner from "../../components/Spinner/Spinner";
const AppPicTable = React.lazy(
  () => import("../../components/Admin/AppPic/AppPicTable")
);
const TotalAppPic = React.lazy(
  () => import("../../components/Admin/AppPic/TotalAppPic")
);
const AddAppPic = React.lazy(
  () => import("../../components/Admin/AppPic/AddAppPic")
);
const AddAppPicFile = React.lazy(
  () => import("../../components/Admin/AppPic/AppPicFile")
);

function AppPic() {
  return (
    <AppPicContextProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center"><Spinner /></div>}>
        <div className="grid grid-cols-12 mt-4 ">
          <AppPicTable />
          <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
            <div className="lg:col-span-2 cols-span-1">
              <TotalAppPic />
            </div>
            <div className="lg:col-span-2 cols-span-1 ">
              <AddAppPic />
              <AddAppPicFile />
            </div>
          </div>
        </div>
      </Suspense>
    </AppPicContextProvider>
  );
}

export default AppPic;
