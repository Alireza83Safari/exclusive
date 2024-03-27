import React, { useState } from "react";
import { useFetchDataFromUrl } from "../../hooks/useFetchDataFromUrl";
import { usePagination } from "../../hooks/usePagination";
import { getCommentType } from "../../types/comment";
import Pagination from "../Pagination";
import ContentLoaders from "../ContentLoaders";
import { useGetCommentsUserQuery } from "../../Redux/apis/user/commentUserApi";
import { userAxios } from "../../services/userInterceptor";
import AccountSkelton from "../../skelton/AccountSkelton";

function AccountComments() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: comments } = useGetCommentsUserQuery("");
  const {} = usePagination(currentPage, pageSize);
  const { datas, total, loading } = useFetchDataFromUrl<getCommentType>(
    "comment",
    userAxios
  );
  const totalPages = Math.ceil(total / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const totalSkeletonShow = Array.from(Array(pageSize).keys());
  return (
    <>
      <div className="container mx-auto border border-borderColor rounded-md">
        {loading ? (
          totalSkeletonShow?.map((index) => (
            <React.Fragment key={index}>
              <AccountSkelton />
            </React.Fragment>
          ))
        ) : comments?.data.length ? (
          datas?.map((comment, index) => (
            <div
              className={`py-8 px-6 ${
                index !== total - 1 ? "border-b border-borderColor" : ""
              }`}
              key={index}
            >
              <div className="grid grid-cols-12 gap-y-5">
                <CommentDetails
                  loading={loading}
                  label="Product"
                  value={comment.productName}
                  justify="start"
                />

                <CommentDetails
                  loading={loading}
                  label="Rate"
                  value={comment.rate}
                  justify="center"
                />
                {loading ? (
                  <ContentLoaders width={120} height={24} />
                ) : (
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
                )}

                <CommentDetails
                  loading={loading}
                  label="Date"
                  value={comment.createdAt.slice(0, 10)}
                  justify="center"
                />

                <div className="flex items-center md:text-sm text-xs col-span-12">
                  <p className="mr-3">Comment:</p>
                  <p className="font-semibold">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className=" flex justify-center items-center min-h-full w-full">
            <h1 className="text-3xl font-bold py-40 flex justify-center items-center ">
              You Havent Comment
            </h1>
          </div>
        )}
      </div>
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

const CommentDetails = ({
  label,
  value,
  loading,
  justify,
}: {
  label: string;
  value: string | number;
  loading: boolean;
  justify: string;
}) => (
  <>
    {loading ? (
      <ContentLoaders width={80} height={20} />
    ) : (
      <div
        className={`flex items-center md:text-sm text-xs md:col-span-4 col-span-6 justify-${justify}`}
      >
        <p className="mr-3">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    )}
  </>
);
