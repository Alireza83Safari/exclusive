import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TotalAppPicProps } from "./TotalAppPic.interface";
import TotalBrandSkeleton from "../../../Skeleton/Admin/Brand/TotalBrandSkeleton";

function TotalAppPic(props: TotalAppPicProps) {
  const { appPics, isLoading } = props;

  if (isLoading) {
    return <TotalBrandSkeleton />;
  }

  return (
    <Card
      sx={{
        boxShadow: "0",
        borderRadius: "12px",
        minHeight: "12rem",
      }}
      className="m-3"
    >
      <CardContent className="text-center">
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", margin: "14px" }}
          gutterBottom
        >
          Total AppPic
        </Typography>
        <Typography
          variant="h2"
          style={{ fontWeight: "bold", color: "blue", margin: "15px" }}
          gutterBottom
        >
          {appPics?.length}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalAppPic;
