import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (currentPage: number, pageSize: number) => {
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const fetchSearchResults = useCallback(async () => {
    setPaginationLoading(true);
    searchParams.set("page", currentPage.toString());
    searchParams.set("limit", pageSize.toString());
    navigate(`?${searchParams.toString()}`);
    setPaginationLoading(false);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (currentPage != null && pageSize != null) {
      fetchSearchResults();
    }
  }, [fetchSearchResults]);
  return { paginationLoading };
};
