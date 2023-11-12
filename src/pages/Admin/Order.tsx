import OrderTable from "../../components/Admin/Order/OrderTable";
import { OrderContextProvider } from "../../components/Admin/Order/Context/OrderContext";
import OrderInfo from "../../components/Admin/Order/OrderInfo";

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
