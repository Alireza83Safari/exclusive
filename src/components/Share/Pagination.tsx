import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLimit } from "../../utils/getLimit";

interface PaginationProps {
  totalPages: number;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, pageSize }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const { currentPageSize } = getLimit();

  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  /// set currentpage when location change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");

    setCurrentPage(page ? +page : 1);
  }, [location]);

  const limit = currentPageSize ? +currentPageSize : pageSize;
  const onPageChange = (page: number) => {
    navigate(`?page=${page}&limit=${limit}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxPages = 6;

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(startPage + maxPages - 1, totalPages);

    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(maxPages / 2)) {
      endPage = maxPages;
    } else if (currentPage + Math.floor(maxPages / 2) >= totalPages) {
      startPage = totalPages - maxPages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 border ${
            currentPage === i ? "bg-black text-white" : "bg-white"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  if (totalPages !== 1) {
    return (
      <div className="flex items-center justify-center mt-4">
        {canGoBack && (
          <button
            className="px-3 py-1 mx-1 bg-black text-white"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}

        {renderPageNumbers()}

        {canGoForward && (
          <button
            className="px-3 py-1 mx-1 bg-black text-white"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  }
};

export default Pagination;
