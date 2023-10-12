import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userAxios } from "../services/userInterceptor";

export const useFetchDataFromUrl = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [getFilterProducts, setFilterProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
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

  const fetchProductFormUrl = useCallback(async () => {
    let url = `product?page=${page}&limit=${limit}`;

    switch (true) {
      case Boolean(searchTerm):
        url += `&searchTerm=${searchTerm}`;
        break;
      case Boolean(categoryId):
        url += `&categoryId=${categoryId}`;
        break;
      case Boolean(brandId):
        url += `&brandId=${brandId}`;
        break;
      case Boolean(order):
        url += `&order=${order}`;
        break;
      case Boolean(minPrice):
        url += `&minPrice=${minPrice}`;
        break;
      case Boolean(maxPrice):
        url += `&maxPrice=${maxPrice}`;
        break;
      default:
        break;
    }

    try {
      setLoading(true);
      const response = await userAxios.get(url);
      if (response.status === 200) {
        setFilterProducts(response.data.data);
        setTotalProducts(response.data.total);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
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

  useEffect(() => {
    fetchProductFormUrl();
  }, [fetchProductFormUrl]);

  return { getFilterProducts, totalProducts, loading };
};
