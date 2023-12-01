import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AppPicContext, appPicContextType } from "./Context/AppPicContext";
import Spinner from "../../Spinner/Spinner";

function TotalAppPic() {
  const { appPics, appPicLoading } = useContext(
    AppPicContext
  ) as appPicContextType;

  return (
    <Card
      sx={{
        boxShadow: "0",
        borderRadius: "12px",
        minHeight: "12rem",
      }}
      className="m-3"
    >
      {appPicLoading ? (
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
      )}
    </Card>
  );
}

export default TotalAppPic;
