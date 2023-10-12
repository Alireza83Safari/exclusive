import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
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

  return (
    <div className="flex items-center justify-center mt-10">
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
};

export default Pagination;
