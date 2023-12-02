import { Suspense, lazy } from "react";
import { UserContextProvider } from "../../components/Admin/User/Context/UserContext";
import Spinner from "../../components/Spinner/Spinner";
const UserTable = lazy(() => import("../../components/Admin/User/UserTable"));

function User() {
  return (
    <UserContextProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center">
            <Spinner />
          </div>
        }
      >
        <div className="grid grid-cols-12 mt-4">
          <UserTable />
        </div>
      </Suspense>
    </UserContextProvider>
  );
}

export default User;
