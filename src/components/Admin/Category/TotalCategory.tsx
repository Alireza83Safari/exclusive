import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import {
  CategoryContext,
  categoryContextType,
} from "./Context/CayegoryContext";

function TotalCategory() {
  const { category } = useContext(CategoryContext) as categoryContextType;
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
          {category?.total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalCategory;
