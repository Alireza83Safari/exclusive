import React, { Suspense } from "react";
import { ColorContextProvider } from "../../components/Admin/Color/Context/ColorContext";
import Spinner from "../../components/Spinner/Spinner";

const ColorTable = React.lazy(() => import("../../components/Admin/Color/ColorTable"));
const TotalColor = React.lazy(() => import("../../components/Admin/Color/TotalColor"));
const AddColor = React.lazy(() => import("../../components/Admin/Color/AddColor"));

function Color() {
  return (
    <Suspense fallback={<Spinner />}>
      <ColorContextProvider>
        <div className="grid grid-cols-12 mt-4">
          <ColorTable />
          <div className="lg:col-span-4 col-span-12 grid grid-cols-1 lg:order-2 order-1">
            <div className="lg:col-span-2 cols-span-1">
              <TotalColor />
            </div>
            <div className="lg:col-span-2 cols-span-1">
              <AddColor />
            </div>
          </div>
        </div>
      </ColorContextProvider>
    </Suspense>
  );
}

export default Color;
