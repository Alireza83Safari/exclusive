import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { OrderInfoProps } from "./OrderInfo.interface";

function OrderInfo(props: OrderInfoProps) {
  const { orders, isLoading } = props;
  console.log(orders);

  const totalOrderPriceWithDiscount = orders?.data.reduce(
    (prev: any, next: any) => {
      return prev + next.totalPrice;
    },
    0
  );

  const totalOrderPrice = orders?.data.reduce((prev: any, next: any) => {
    return prev + next.price;
  }, 0);

  return (
    <div className="grid md:grid-cols-3 col-span-12">
      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography variant="h5" style={{ fontWeight: "bold" }} gutterBottom>
            Total Order
          </Typography>
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", color: "blue", margin: "10px" }}
            gutterBottom
          >
            {orders?.total}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography variant="h5" style={{ fontWeight: "bold" }} gutterBottom>
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

      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography variant="h5" style={{ fontWeight: "bold" }} gutterBottom>
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
    </div>
  );
}

export default OrderInfo;
