import React from "react";
import { RoleContextProvider } from "../../components/Admin/Role/Context/RoleContext";
import RoleTable from "../../components/Admin/Role/RoleTable";

function Role() {
  return (
    <RoleContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <RoleTable />
      </div>
    </RoleContextProvider>
  );
}

export default Role;
