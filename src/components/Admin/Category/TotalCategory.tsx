import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import {
  CategoryContext,
  categoryContextType,
} from "./Context/CayegoryContext";
import Spinner from "../../Spinner/Spinner";

function TotalCategory() {
  const { total, categoryLoading } = useContext(
    CategoryContext
  ) as categoryContextType;
  return (
    <Card
      sx={{
        boxShadow: "0",
        borderRadius: "12px",
      }}
      className="m-3"
    >
      {categoryLoading ? (
        <div className="min-h-[12rem] flex items-center">
          <Spinner />
        </div>
      ) : (
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
      )}
    </Card>
  );
}

export default TotalCategory;
