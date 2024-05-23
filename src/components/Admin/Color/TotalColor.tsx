import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import {
  ColorContext,
  colorContextType,
} from "../../../context/admin/colorContext";
import { TotalColorSkeleton } from "../../../skelton/admin/Color";

function TotalColor() {
  const { total, colorsLoading } = useContext(ColorContext) as colorContextType;
  return (
    <Card
      sx={{
        boxShadow: "0",
        borderRadius: "12px",
      }}
      className="m-3"
    >
      {colorsLoading ? (
        <TotalColorSkeleton />
      ) : (
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
      )}
    </Card>
  );
}

export default TotalColor;
