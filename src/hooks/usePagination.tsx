import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (currentPage: number, pageSize: number) => {
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const fetchSearchResults = useCallback(async () => {
    try {
      setPaginationLoading(true);
      currentPage !== null && searchParams.set("page", currentPage.toString());
      searchParams.set("limit", pageSize.toString());
      navigate(`?${searchParams.toString()}`);
      setPaginationLoading(false);
    } catch (error) {}
  }, [currentPage, pageSize, searchParams, navigate]);

  useEffect(() => {
    if (currentPage !== null && pageSize !== null) {
      fetchSearchResults();
    }
  }, [currentPage, fetchSearchResults, pageSize]);

  return { paginationLoading };
};
