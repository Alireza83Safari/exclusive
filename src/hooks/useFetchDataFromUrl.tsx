import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFetchDataFromUrl = <T,>(
  urlName: string | null,
  axiosInstance: any
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [datas, setDatas] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");

  const fetchDataFormUrl = useCallback(async () => {
    setLoading(true);
    let url = `/${urlName}${location.search}`;

    try {
      if (page) {
        const response = await axiosInstance.get(url);
        if (response.status === 200) {
          setDatas(response.data.data);
          setTotal(response.data.total);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  }, [location.search]);

  useEffect(() => {
    fetchDataFormUrl();
  }, [location.search]);

  return { datas, total, loading, fetchDataFormUrl };
};
