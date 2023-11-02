import React, { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../Pagination";
import { useLocation } from "react-router-dom";
import { useGetProfileOrdersUserQuery } from "../../Redux/apis/user/prodileUserApi";
import AccountSkelton from "../../skelton/AccountSkelton";

function AccountOrders() {
  const { data: orders, isLoading } = useGetProfileOrdersUserQuery("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagiSize = 4;
  const totalPages = Math.ceil(orders?.length / pagiSize);
  const {} = usePagination(currentPage, pagiSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page: number | null = parseInt(searchParams.get("page") as string);
  const limit: number | null = parseInt(searchParams.get("limit") as string);

  const pageMinusOne = page - 1;
  const limitMinusOne = page + limit - 1;
  const totalSkeletonShow = Array.from(Array(pagiSize).keys());
  return (
    <div>
      {isLoading
        ? totalSkeletonShow.map((index) => (
            <React.Fragment key={index}>
              <AccountSkelton />
            </React.Fragment>
          ))
        : orders?.slice(pageMinusOne, limitMinusOne).map((order: any) => (
            <div key={order.id} className="bg-gray p-6 my-5 rounded-md">
              <div className="border-b border-borderColor pb-5 flex justify-between">
                <p>#{order.code}</p>
                <p>{order.createdAt.slice(0, 10)}</p>
                <p>${order.price}</p>
                <p>
                  {order.status === 1 ? (
                    <button className="bg-lime-400 text-lime-900 px-3 py-1 text-sm rounded-md">
                      Received
                    </button>
                  ) : (
                    <button>Cancel</button>
                  )}
                </p>
              </div>
              <div className="flex pt-5">
                {order.fileUrls.map((url: any) => (
                  <div key={url}>
                    <img
                      src={`http://127.0.0.1:6060/${url}`}
                      className="w-12 h-12 mx-2 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default AccountOrders;
