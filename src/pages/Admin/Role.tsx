import { Suspense, lazy } from "react";
import { RoleContextProvider } from "../../components/Admin/Role/Context/RoleContext";
import { Spinner } from "../../components";
const RoleTable = lazy(() => import("../../components/Admin/Role/RoleTable"));

function Role() {
  return (
    <RoleContextProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center">
            <Spinner />
          </div>
        }
      >
        <div className="grid grid-cols-12 mt-4">
          <RoleTable />
        </div>
      </Suspense>
    </RoleContextProvider>
  );
}

export default Role;
