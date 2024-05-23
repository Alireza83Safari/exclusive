import { useState } from "react";
import { useFetchDataFromUrl } from "../../../../hooks/useFetchDataFromUrl";
import { usePagination } from "../../../../hooks/usePagination";
import { getCommentType } from "../../../../types/comment";
import { AccountCommentSkeleton, Pagination } from "../../../../components";
import { commentUserApi } from "../../../../Redux/apis/user/commentUserApi";
import { userAxios } from "../../../../services/userInterceptor";
import CommentItem from "./CommentItem";

function AccountComments() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data: comments } = commentUserApi.useGetCommentsUserQuery("");

  const {} = usePagination(currentPage, pageSize);
  const { datas, total, loading } = useFetchDataFromUrl<getCommentType>(
    "comment",
    userAxios
  );

  const totalPages = Math.ceil(total / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <AccountCommentSkeleton />;
  }
  return (
    <>
      <div className="container mx-auto border border-borderColor rounded-md">
        {datas?.map((comment, index) => (
          <div
            className={`py-8 px-6 ${
              index !== total - 1 ? "border-b border-borderColor" : ""
            }`}
            key={index}
          >
            <CommentItem comment={comment} />
          </div>
        ))}
      </div>

      {!comments?.length && (
        <div className=" flex justify-center items-center min-h-full w-full">
          <h1 className="text-3xl font-bold py-40 flex justify-center items-center ">
            You Havent Comment
          </h1>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default AccountComments;
