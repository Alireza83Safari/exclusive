import { getCommentType } from "../../../../types/comment";

interface CommentItemProps {
  comment: getCommentType;
}

const CommentItem = (props: CommentItemProps) => {
  const { comment } = props;
  return (
    <div className="grid grid-cols-12 gap-y-5">
      <div
        className={`flex items-center md:text-sm text-xs md:col-span-4 col-span-6`}
      >
        <p className="mr-3">Product:</p>
        <p className="font-semibold">{comment.productName}</p>
      </div>

      <div
        className={`flex items-center md:text-sm text-xs md:col-span-4 col-span-6`}
      >
        <p className="mr-3">Rate:</p>
        <p className="font-semibold">{comment.rate}</p>
      </div>

      <div
        className={`flex items-center md:text-sm text-xs md:col-span-4 col-span-6`}
      >
        <p className="mr-3">Status:</p>
        <div className="flex items-center md:col-span-4 col-span-6">
          <p className="mr-3 text-sm">Status:</p>
          {comment.commentStatus === 1 ? (
            <p className="font-semibold bg-green md:text-sm text-xs text-lime-800 px-2 py-1 rounded-md">
              Accept
            </p>
          ) : (
            <p className="font-semibold bg-rose-400 rounded-md text-white md:text-sm text-xs px-2 py-1">
              Reject
            </p>
          )}
        </div>
      </div>

      <div
        className={`flex items-center md:text-sm text-xs md:col-span-4 col-span-6`}
      >
        <p className="mr-3">Date:</p>
        <p className="font-semibold">{comment.createdAt.slice(0, 10)}</p>
      </div>

      <div
        className={`flex items-center md:text-sm text-xs md:col-span-4 col-span-6`}
      >
        <p className="mr-3">Comment:</p>
        <p className="font-semibold">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
