import React from "react";
import ColorTable from "../../components/Admin/Color/ColorTable";
import TotalColor from "../../components/Admin/Color/TotalColor";
import AddColor from "../../components/Admin/Color/AddColor";
import { ColorContextProvider } from "../../components/Admin/Color/Context/ColorContext";

function Color() {
  return (
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
  );
}

export default Color;
