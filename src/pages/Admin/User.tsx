import React from "react";
import { UserContextProvider } from "../../components/Admin/User/Context/UserContext";
import UserTable from "../../components/Admin/User/UserTable";

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
