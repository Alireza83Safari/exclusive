import { OrderContextProvider } from "../../context/admin/orderContext";
import { OrderInfo, OrderTable } from "../../components";

function Order() {
  return (
    <OrderContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <OrderInfo />
        <OrderTable />
      </div>
    </OrderContextProvider>
  );
}

export default Order;
