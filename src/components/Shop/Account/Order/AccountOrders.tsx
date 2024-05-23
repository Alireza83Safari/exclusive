import { useState } from "react";
import { usePagination } from "../../../../hooks/usePagination";
import { AccountOrderSkeleton, Pagination } from "../../../index";
import { useLocation } from "react-router-dom";
import { profileUserApi } from "../../../../Redux/apis/user/profileUserApi";
import OrderItem from "./OrderItem";

function AccountOrders() {
  const { data: orders, isLoading } =
    profileUserApi.useGetProfileOrdersUserQuery("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagiSize = 4;
  const totalPages = Math.ceil(orders?.length / pagiSize);
  const {} = usePagination(currentPage, pagiSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default AccountOrders;
