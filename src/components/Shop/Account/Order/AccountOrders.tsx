import { AccountOrderSkeleton, Pagination } from "../../../index";
import { useLocation } from "react-router-dom";
import { profileUserApi } from "../../../../Redux/apis/user/profileUserApi";
import OrderItem from "./OrderItem";

function AccountOrders() {
  const { data: orders, isLoading } =
    profileUserApi.useGetProfileOrdersUserQuery("");
  const pageSize = 4;
  const totalPages = Math.ceil(orders?.length / pageSize);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page: number | null = parseInt(searchParams.get("page") as string);
  const limit: number | null = parseInt(searchParams.get("limit") as string);

  const pageMinusOne = page - 1;
  const limitMinusOne = page + limit - 1;

  if (isLoading) {
    return <AccountOrderSkeleton />;
  }
  return (
    <div>
      {orders?.slice(pageMinusOne, limitMinusOne)?.map((order: any) => (
        <OrderItem order={order} />
      ))}

      <Pagination totalPages={totalPages} pageSize={pageSize} />
    </div>
  );
}

export default AccountOrders;
