import React, { Suspense } from "react";
import { CommentContextProvider } from "../../components/Admin/Comment/Context/CommentContext";
import Spinner from "../../components/Spinner/Spinner";

const CommentTable = React.lazy(() => import("../../components/Admin/Comment/CommentTable"));
const CommentInfo = React.lazy(() => import("../../components/Admin/Comment/CommentInfo"));

function Comment() {
  return (
    <Suspense fallback={<Spinner />}>
      <CommentContextProvider>
        <div className="grid grid-cols-12 mt-4">
          <CommentInfo />
          <CommentTable />
        </div>
      </CommentContextProvider>
    </Suspense>
  );
}

export default Comment;
