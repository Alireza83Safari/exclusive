import { UserTable } from "../../components";
import { userAdminApi } from "../../Redux";
import { useLocation } from "react-router-dom";

function User() {
  const location = useLocation();
  const {
    data: users,
    isLoading,
    refetch,
  } = userAdminApi.useGetUserListQuery(location.search || "?page=1&limit=12");
  return (
    <div className="grid grid-cols-12 mt-4">
      <UserTable users={users} isLoading={isLoading} refetchUser={refetch} />
    </div>
  );
}

export default User;
