import { ContentLoaders } from "../../components";

function CommentSkeleton() {
  return (
    <div className="my-2">
      <ContentLoaders width="lg:25vw 100vw" height={200} />
    </div>
  );
}

function CommentTable() {
  return (
    <div className="my-2">
      <ContentLoaders width="100vw" height={500} />
    </div>
  );
}

function CommentPageSkeleton() {
  return (
    <div className="grid grid-cols-12 mt-4">
      <CommentSkeleton />
      <CommentTable />
    </div>
  );
}

export { CommentSkeleton, CommentPageSkeleton, CommentTable };
