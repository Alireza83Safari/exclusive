import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TotalBrandSkeleton from "../../../Skeleton/Admin/Brand/TotalBrandSkeleton";
import { TotalColorProps } from "./TotalColor.interface";

function TotalColor(props: TotalColorProps) {
  const { total, colorsLoading } = props;
  console.log("run!!");

  if (colorsLoading) {
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
          Total Color
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

export default React.memo(TotalColor);
