import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { BrandContext, brandContextType } from "./Context/BrandContext";

function TotalBrand() {
  const { brands } = useContext(BrandContext) as brandContextType;
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
          style={{ fontWeight: "bold", color: "blue", margin: "20px" }}
          gutterBottom
        >
          {brands?.total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalBrand;
