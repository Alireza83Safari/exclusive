import { OrderContextProvider } from "../../components/Admin/Order/Context/OrderContext";
import { Suspense, lazy } from "react";
import { OrderSkelton } from "../../skelton/admin/Order";
const OrderInfo = lazy(() => import("../../components/Admin/Order/OrderInfo"));
const OrderTable = lazy(
  () => import("../../components/Admin/Order/OrderTable")
);

function Order() {
  return (
    <OrderContextProvider>
      <Suspense fallback={<OrderSkelton />}>
        <div className="grid grid-cols-12 mt-4">
          <OrderInfo />
          <OrderTable />
        </div>
      </Suspense>
    </OrderContextProvider>
  );
}

export default Order;
