import { useLocation } from "react-router-dom";

export const getLimit = () => {
  const location = useLocation();
  const seatchParams = new URLSearchParams(location.search);

  const currentPageSize = seatchParams.get("limit");

  return { currentPageSize };
};
