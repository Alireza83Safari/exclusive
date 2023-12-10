import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (
  currentPage: number | null,
  initialPageSize: number
) => {
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  const fetchSearchResults = useCallback(async () => {
    try {
      setPaginationLoading(true);
      searchParams.set(
        "page",
        currentPage !== null ? currentPage.toString() : "1"
      );
      searchParams.set("limit", pageSize !== null ? pageSize.toString() : "12");
      setTimeout(() => {
        navigate(`?${searchParams.toString()}`);
      }, 1000);
      setPaginationLoading(false);
    } catch (error) {
      // Handle error
    }
  }, [currentPage, pageSize, searchParams]);

  useEffect(() => {
    const limitParam = searchParams.get("limit");
    if (limitParam) {
      setPageSize(+limitParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage, pageSize]);

  return { paginationLoading, pageSize };
};
