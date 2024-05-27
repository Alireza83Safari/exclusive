import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TotalBrandSkeleton from "../../../Skeleton/Admin/Brand/TotalBrandSkeleton";
import { TotalCategoryProps } from "./TotalCategory.interface";

function TotalCategory(props: TotalCategoryProps) {
  const { total, categoryLoading } = props;

  if (categoryLoading) {
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
          style={{ fontWeight: "bold", margin: "10px" }}
          gutterBottom
        >
          Total Category
        </Typography>
        <Typography
          variant="h2"
          style={{ fontWeight: "bold", color: "blue", margin: "16px" }}
          gutterBottom
        >
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalCategory;
