import React, { Suspense } from "react";
import { CommentContextProvider } from "../../components/Admin/Comment/Context/CommentContext";
import { CommentPageSkeleton } from "../../skelton/admin/Comment";

const CommentTable = React.lazy(
  () => import("../../components/Admin/Comment/CommentTable")
);
const CommentInfo = React.lazy(
  () => import("../../components/Admin/Comment/CommentInfo")
);

function Comment() {
  return (
    <Suspense fallback={<CommentPageSkeleton />}>
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
