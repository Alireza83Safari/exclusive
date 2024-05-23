import { useEffect } from "react";
import { useGetCommentsProudctMutation } from "../../../Redux/apis/user/commentUserApi";
import { useParams } from "react-router-dom";
import CommentDetails from "./CommentDetails";
import AddComment from "./AddComment";

function Comment() {
  const { productId } = useParams();
  const [getCommentsProudct, { data: comments }] =
    useGetCommentsProudctMutation();

  useEffect(() => {
    if (productId) {
      getCommentsProudct(productId);
    }
  }, [productId]);
  return (
    <>
      <CommentDetails comments={comments?.data} />
      <AddComment getCommentsProudct={getCommentsProudct} />
    </>
  );
}

export default Comment;
