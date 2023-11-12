import  { useEffect } from "react";
import CommentDetails from "../components/Comment/CommentDetails";
import AddComment from "../components/Comment/AddComment";
import { useGetCommentsProudctMutation } from "../Redux/apis/user/commentUserApi";
import { useParams } from "react-router-dom";

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
