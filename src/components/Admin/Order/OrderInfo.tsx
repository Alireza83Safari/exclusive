import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { OrderContext, orderContextType } from "../../../context/admin/orderContext";
import { OrderInfosSkeleton } from "../../../skelton/admin/Order";

function OrderInfo() {
  const { totalOrders, orderLoading } = useContext(
    OrderContext
  ) as orderContextType;
  const totalOrderPriceWithDiscount = totalOrders?.data.reduce(
    (prev: any, next: any) => {
      return prev + next.totalPrice;
    },
    0
  );

  const totalOrderPrice = totalOrders?.data.reduce((prev: any, next: any) => {
    return prev + next.price;
  }, 0);

  return (
    <div className="grid md:grid-cols-3 col-span-12">
      {orderLoading ? (
        <OrderInfosSkeleton />
      ) : (
        <Card
          sx={{
            boxShadow: "0",
            borderRadius: "12px",
          }}
          className="m-3"
        >
          <CardContent className="text-center">
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              gutterBottom
            >
              Total Order
            </Typography>
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", color: "blue", margin: "10px" }}
              gutterBottom
            >
              {totalOrders?.total}
            </Typography>
          </CardContent>
        </Card>
      )}

      {orderLoading ? (
        <OrderInfosSkeleton />
      ) : (
        <Card
          sx={{
            boxShadow: "0",
            borderRadius: "12px",
          }}
          className="m-3"
        >
          <CardContent className="text-center">
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              gutterBottom
            >
              Total Order Price
              <br />
              <span className="text-xs">(without discount)</span>
            </Typography>
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", color: "orange", margin: "10px" }}
              gutterBottom
            >
              {Math.floor(totalOrderPrice)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {orderLoading ? (
        <OrderInfosSkeleton />
      ) : (
        <Card
          sx={{
            boxShadow: "0",
            borderRadius: "12px",
          }}
          className="m-3"
        >
          <CardContent className="text-center">
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              gutterBottom
            >
              Total Order Price <br />{" "}
              <span className="text-xs">(with discount)</span>
            </Typography>
            <Typography
              variant="h3"
              style={{ fontWeight: "bold", color: "green", margin: "10px" }}
              gutterBottom
            >
              {Math.floor(totalOrderPriceWithDiscount)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default OrderInfo;
