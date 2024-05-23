import { RoleTable } from "../../components";
import { RoleContextProvider } from "../../context/admin/roleContext";

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
