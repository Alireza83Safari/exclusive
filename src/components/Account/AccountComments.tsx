import React, { useState } from "react";
import { useFetchDataFromUrl } from "../../hooks/useFetchDataFromUrl";
import { usePagination } from "../../hooks/usePagination";
import { getCommentType } from "../../types/Comment.type";
import Pagination from "../Pagination";
import ContentLoaders from "../ContentLoaders";
import { useGetCommentsUserQuery } from "../../Redux/apis/user/commentUserApi";
import { userAxios } from "../../services/userInterceptor";
import AccountSkelton from "../../skelton/AccountSkelton";

function AccountAddress() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: comments } = useGetCommentsUserQuery("");
  const {} = usePagination(currentPage, pageSize);
  const { getFilterData, total, loading } = useFetchDataFromUrl<getCommentType>(
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
          getFilterData?.map((comment, index) => (
            <div
              className={`py-8 px-6 ${
                index !== total - 1 ? "border-b border-borderColor" : ""
              }`}
              key={index}
            >
              <div className="grid grid-cols-3 gap-y-5">
                {loading ? (
                  <ContentLoaders width={80} height={20} />
                ) : (
                  <div className="flex items-center">
                    <p className="mr-3 text-sm">Product Name:</p>
                    <p className="font-semibold">{comment.productName}</p>
                  </div>
                )}
                {loading ? (
                  <ContentLoaders width={80} height={20} />
                ) : (
                  <div className="flex items-center">
                    <p className="mr-3 text-sm">Rate:</p>
                    <p className="font-semibold">{comment.rate}</p>
                  </div>
                )}
                {loading ? (
                  <ContentLoaders width={120} height={24} />
                ) : (
                  <div className="flex items-center">
                    <p className="mr-3 text-sm">Status:</p>
                    {comment.commentStatus === 1 ? (
                      <p className="font-semibold bg-green text-sm text-lime-800 px-2 py-1 rounded-md">
                        Accept
                      </p>
                    ) : (
                      <p className="font-semibold bg-rose-400 rounded-md text-white text-sm px-2 py-1">
                        Reject
                      </p>
                    )}
                  </div>
                )}
                {loading ? (
                  <ContentLoaders width={80} height={20} />
                ) : (
                  <div className="flex items-center">
                    <p className="mr-3 text-sm">Date:</p>
                    <p className="font-semibold">
                      {comment.createdAt.slice(0, 10)}
                    </p>
                  </div>
                )}
                {loading ? (
                  <ContentLoaders width={80} height={20} />
                ) : (
                  <div className="flex items-center col-span-2">
                    <p className="mr-3 text-sm">Comment:</p>
                    <p className="font-semibold">{comment.text}</p>
                  </div>
                )}
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

export default AccountAddress;
