import { getCommentType } from "../../types/Comment.type";

type commentDetailPropsType = {
  comments: getCommentType[];
};
function CommentDetails({ comments }: commentDetailPropsType) {
  return (
    <div className="bg-gray w-full col-span-12 mt-12">
      {comments?.map((comment: getCommentType) => (
        <div
          key={comment.id}
          className="my-8 mx-24 border-b border-borderColor pb-8"
        >
          <div className="grid grid-cols-3">
            <p>{comment.username}</p>
            <p>{comment.createdAt.slice(0, 10)}</p>
            <div className="flex">
              <p>rate: </p>
              <p className={comment.rate > 3 ? `text-lime-500` : `text-red`}>
                {comment.rate}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentDetails;
