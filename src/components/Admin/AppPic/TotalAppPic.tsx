import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";

function TotalAppPic() {
  const { appPics } = useContext(AppPicContext) as appPicContextType;
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
          Total AppPic
        </Typography>
        <Typography
          variant="h2"
          style={{ fontWeight: "bold", color: "blue", margin: "20px" }}
          gutterBottom
        >
          {appPics?.length}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TotalAppPic;
