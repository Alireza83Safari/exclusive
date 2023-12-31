import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export const useFetchDataFromUrl = <T,>(
  urlName: string | null,
  axiosInstance: any
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [getFilterData, setFilterProducts] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("searchTerm");
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const order = searchParams.get("order");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const onlyDiscount = searchParams.get("onlyDiscount");

  const fetchDataFormUrl = useCallback(async () => {
    setLoading(true);
    let url = `${urlName !== null ? urlName : `product`}?page=${
      page ? page : 1
    }&limit=${limit ? limit : 10}`;

    if (searchTerm) {
      url += `&searchTerm=${searchTerm}`;
    }

    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }

    if (brandId) {
      url += `&brandId=${brandId}`;
    }

    if (order) {
      url += `&order=${order}`;
    }

    if (minPrice) {
      url += `&minPrice=${minPrice}`;
    }

    if (maxPrice) {
      url += `&maxPrice=${maxPrice}`;
    }

    if (onlyDiscount) {
      url += `&onlyDiscount=${onlyDiscount}`;
    }

    try {
      if (page !== null) {
        const response = await axiosInstance.get(url);
        if (response.status === 200) {
          setFilterProducts(response.data.data);
          setTotal(response.data.total);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  }, [categoryId, brandId, order, minPrice, maxPrice, searchTerm, page, limit]);

  useEffect(() => {
    fetchDataFormUrl();
  }, [
    location.search,
    categoryId,
    brandId,
    order,
    minPrice,
    maxPrice,
    searchTerm,
    page,
    limit,
  ]);

  const memoizedData = useMemo(
    () => ({ getFilterData, total, loading, fetchDataFormUrl }),
    [getFilterData, total, loading]
  );
  return memoizedData;
};
