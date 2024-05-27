import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TotalBrandSkeleton from "../../../Skeleton/Admin/Brand/TotalBrandSkeleton";
import { TotalBrandProps } from "./TotalBrand.interface";

function TotalBrand(props: TotalBrandProps) {
  const { total, isLoadingBrnads } = props;
  if (isLoadingBrnads) {
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
          Total Brand
        </Typography>
        <Typography
          variant="h2"
          style={{ fontWeight: "bold", color: "blue", margin: "28px" }}
          gutterBottom
        >
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalBrand;
