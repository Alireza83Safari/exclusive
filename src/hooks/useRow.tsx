import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useRow = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [rowNumber, setRowNumber] = useState(1);
  let page = searchParams.get("page") as any;
  let limit = searchParams.get("limit") as any;
  useEffect(() => {
    setRowNumber(page <= 1 ? page : (page - 1) * limit);
  }, [page, limit]);
  return { rowNumber, limit };
};
export default useRow;
