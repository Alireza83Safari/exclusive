import { CommentContextProvider } from "../../context/admin/commentContext";
import { CommentInfo, CommentTable } from "../../components";

function Comment() {
  return (
    <CommentContextProvider>
      <div className="grid grid-cols-12 mt-4">
        <CommentInfo />
        <CommentTable />
      </div>
    </CommentContextProvider>
  );
}

export default Comment;
