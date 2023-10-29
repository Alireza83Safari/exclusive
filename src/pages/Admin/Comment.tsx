import React from "react";
import { CommentContextProvider } from "../../components/Admin/Comment/Context/CommentContext";
import CommentTable from "../../components/Admin/Comment/CommentTable";
import CommentInfo from "../../components/Admin/Comment/CommentInfo";

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
