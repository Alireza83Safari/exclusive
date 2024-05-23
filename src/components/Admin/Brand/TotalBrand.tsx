import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import {
  BrandContext,
  brandContextType,
} from "../../../context/admin/brandContext";
import Spinner from "../../Share/Spinner/Spinner";

function TotalBrand() {
  const { total, brandsLoading } = useContext(BrandContext) as brandContextType;
  return (
    <Card
      sx={{
        boxShadow: "0",
        borderRadius: "12px",
      }}
      className="m-3"
    >
      {brandsLoading ? (
        <div className="min-h-[12rem] flex items-center">
          <Spinner />
        </div>
      ) : (
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
      )}
    </Card>
  );
}

export default TotalBrand;
