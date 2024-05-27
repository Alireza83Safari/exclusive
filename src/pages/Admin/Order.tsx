import { OrderInfo, OrderTable } from "../../components";
import { orderAdminApi } from "../../Redux";
import { useLocation } from "react-router-dom";

function Order() {
  const location = useLocation();

  const { data: orders, isLoading } = orderAdminApi.useGetOrderAdminQuery(
    location.search || "?page=1&limit=12"
  );
  console.log(orders);

  return (
    <div className="grid grid-cols-12 mt-4">
      <OrderInfo orders={orders} isLoading={isLoading} />
      <OrderTable orders={orders} isLoading={isLoading} />
    </div>
  );
}

export default Order;
