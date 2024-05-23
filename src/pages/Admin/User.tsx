import { UserContextProvider } from "../../context/admin/userContext";
import { UserTable } from "../../components";

function User() {
  return (
    <UserContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <UserTable />
      </div>
    </UserContextProvider>
  );
}

export default User;
