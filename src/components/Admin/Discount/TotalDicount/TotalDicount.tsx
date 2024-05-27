import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TotalDiscountProps } from "./TotalDicount.interface";
import TotalBrandSkeleton from "../../../Skeleton/Admin/Brand/TotalBrandSkeleton";

function TotalDiscount(props: TotalDiscountProps) {
  const { total, isLoading } = props;

  if (isLoading) {
    return <TotalBrandSkeleton />;
  }
  return (
    <Card
      sx={{
        boxShadow: "0",
        borderRadius: "12px",
      }}
      className="m-3"
    >
      <CardContent className="text-center">
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", margin: "14px" }}
          gutterBottom
        >
          Total Discount
        </Typography>
        <Typography
          variant="h2"
          style={{ fontWeight: "bold", color: "blue", margin: "20px" }}
          gutterBottom
        >
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalDiscount;
