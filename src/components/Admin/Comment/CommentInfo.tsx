import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext, useMemo } from "react";
import { CommentContext, commentContextType } from "./Context/CommentContext";
import { getCommentType } from "../../../types/Comment.type";

function CommentInfo() {
  const { commentsTotal } = useContext(CommentContext) as commentContextType;
console.log(commentsTotal);

  const totalPendingComments = useMemo(() => {
    return commentsTotal?.data.filter(
      (comment: getCommentType) => comment.commentStatus === 0
    );
  }, [commentsTotal]);

  const totalAcceptComments = useMemo(() => {
    return commentsTotal?.data.filter(
      (comment: getCommentType) => comment.commentStatus === 1
    );
  }, [commentsTotal]);

  const totalRejectComments = useMemo(() => {
    return commentsTotal?.data.filter(
      (comment: getCommentType) => comment.commentStatus === 2
    );
  }, [commentsTotal]);

  return (
    <div className="grid grid-cols-4 col-span-12">
      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", margin: "14px" }}
            gutterBottom
          >
            Total Comment
          </Typography>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", color: "blue", margin: "20px" }}
            gutterBottom
          >
            {commentsTotal?.total}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", margin: "14px" }}
            gutterBottom
          >
            Pendding Comment
          </Typography>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", color: "orange", margin: "20px" }}
            gutterBottom
          >
            {totalPendingComments?.length}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", margin: "14px" }}
            gutterBottom
          >
            Accept Comment
          </Typography>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", color: "green", margin: "20px" }}
            gutterBottom
          >
            {totalAcceptComments?.length}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          boxShadow: "0",
          borderRadius: "12px",
        }}
        className="m-3"
      >
        <CardContent className="text-center">
          <Typography
            variant="h5"
            style={{ fontWeight: "bold", margin: "14px" }}
            gutterBottom
          >
            Reject Comment
          </Typography>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", color: "red", margin: "20px" }}
            gutterBottom
          >
            {totalRejectComments?.length}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommentInfo;
