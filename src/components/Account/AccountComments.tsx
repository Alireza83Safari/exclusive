import React, { useState } from "react";
import { useGetCommentsUserQuery } from "../../Redux/apis/commentApi"; 
import { useFetchDataFromUrl } from "../../hooks/useFetchDataFromUrl";
import { usePagination } from "../../hooks/usePagination";
import { getCommentType } from "../../types/Comment.type";
import Pagination from "../Pagination";
import ContentLoaders from "../ContentLoaders";

function AccountAddress() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: comments } = useGetCommentsUserQuery("");
  const {} = usePagination(currentPage, pageSize);
  const { getFilterProducts, totalProducts, loading } =
    useFetchDataFromUrl<getCommentType>("comment");
  const totalPages = Math.ceil(totalProducts / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container mx-auto border border-borderColor rounded-md">
        {comments?.data.length
          ? getFilterProducts?.map((comment, index) => (
              <div
                className={`py-8 px-6 ${
                  index !== totalProducts - 1
                    ? "border-b border-borderColor"
                    : ""
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
          : null}
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
