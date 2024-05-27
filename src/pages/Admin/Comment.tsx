import { useLocation } from "react-router-dom";
import { CommentInfo, CommentTable } from "../../components";
import { commentAdminApi } from "../../Redux";

function Comment() {
  const location = useLocation();
  const {
    data: comments,
    isLoading,
    refetch: refetchComments,
  } = commentAdminApi.useGetCommentsAdminQuery(
    location.search || "?page=1&limit=9"
  );

  return (
    <div className="grid grid-cols-12 mt-4">
      <CommentInfo comments={comments} isLoading={isLoading} />
      <CommentTable
        comments={comments}
        isLoading={isLoading}
        refetchComments={refetchComments}
      />
    </div>
  );
}

export default Comment;
