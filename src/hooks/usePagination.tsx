import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (
  currentPage: number | null,
  initialPageSize: number
) => {
  const [paginationLoading, setPaginationLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const limit = new URLSearchParams(location.search).get("limit");
  const pageSize = limit ? +limit : initialPageSize;

  const fetchSearchResults = useCallback(async () => {
    try {
      setPaginationLoading(true);
      const searchParams = new URLSearchParams(location.search);

      searchParams.set(
        "page",
        currentPage !== null ? currentPage.toString() : "1"
      );
      searchParams.set("limit", pageSize !== null ? pageSize.toString() : "12");
      navigate(`?${searchParams.toString()}`);
      setPaginationLoading(false);
    } catch (error) {
      setPaginationLoading(false);
    }
  }, [currentPage, pageSize, location.search]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults, currentPage]);

  return { paginationLoading, pageSize };
};
