import React, { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import Spinner from "./Spinner/Spinner";
import { useGetBrandsSelectListQuery } from "../Redux/apis/user/brandUserApi";
import { useGetCategorySelectListQuery } from "../Redux/apis/user/categoryUserApi";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";

const SelectList = lazy(() => import("./SelectList"));

type filterType = {
  brandId: string;
  categoryId: string;
  order: string;
  onlyDiscount: boolean;
  minPrice: number;
  maxPrice: number;
};

const FilterProducts = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [priceFilter, setFilterPrice] = useState({ minPrice: 0, maxPrice: 0 });
  const [filterValue, setFilterValue] = useState({
    brandId: "",
    categoryId: "",
    order: "",
    onlyDiscount: false,
    minPrice: 0,
    maxPrice: 0,
  } as filterType);

  const navigate = useNavigate();

  const { data: brands } = useGetBrandsSelectListQuery("");
  const { data: products } = useGetProductsUserQuery("");
  const { data: category } = useGetCategorySelectListQuery("");
  const rangeInputMinValue = products?.data?.reduce(
    (minPrice: any, nextPrice: any) => {
      if (minPrice?.price > nextPrice?.price) {
        return nextPrice;
      }
      return minPrice;
    },
    products?.data[0]
  );

  const rangeInputMaxValue = products?.data?.reduce(
    (minPrice: any, nextPrice: any) => {
      if (minPrice?.price < nextPrice?.price) {
        return nextPrice;
      }
      return minPrice;
    },
    products?.data[0]
  );

  const filterData = () => {
    const filteredParams = new URLSearchParams();

    for (const key in filterValue) {
      switch (key) {
        case "brandId":
        case "categoryId":
        case "order":
          if (filterValue[key]) {
            filteredParams.set(key, filterValue[key]);
          }
          break;

        case "onlyDiscount":
          if (filterValue[key]) {
            filteredParams.set(key, filterValue[key].toString());
          }
          break;

        case "minPrice":
        case "maxPrice":
          if (filterValue[key]) {
            filteredParams.set(key, filterValue[key].toString());
          }
          break;

        default:
          break;
      }
    }

    navigate(`?${filteredParams.toString()}`);
  };

  useEffect(() => {
    filterData();
  }, [filterValue]);
  const setFilterPriceHandler = () => {
    if (priceFilter.minPrice !== 0) {
      setFilterValue({ ...filterValue, minPrice: priceFilter.minPrice });
    }
    if (priceFilter.maxPrice !== 0) {
      setFilterValue({ ...filterValue, maxPrice: priceFilter.maxPrice });
    }
  };

  return (
    <div>
      <div className="flex justify-center text-4xl">
        <BsFilterLeft onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-4 mb-2">
          <div>
            <label className="text-xs">Category:</label>
            <Suspense fallback={<Spinner />}>
              <SelectList
                name="categoryId"
                defaultValue={filterValue.categoryId}
                onChange={(selected) =>
                  setFilterValue({ ...filterValue, categoryId: selected.value })
                }
                options={category?.data.map((data) => ({
                  value: data.key,
                  label: data.value,
                }))}
              />
            </Suspense>
          </div>

          <div>
            <label className="text-xs">Order:</label>
            <SelectList
              name="order"
              defaultValue={filterValue.order}
              onChange={(selected) =>
                setFilterValue({ ...filterValue, order: selected.value })
              }
              options={[
                "newest",
                "topSell",
                "cheap",
                "expensive",
                "disount",
              ].map((data) => ({
                value: data,
                label: data.toString(),
              }))}
            />
          </div>

          <div>
            <label className="text-xs">Brand:</label>
            <Suspense fallback={<Spinner />}>
              <SelectList
                name="brandId"
                defaultValue={filterValue.brandId}
                onChange={(selected) =>
                  setFilterValue({ ...filterValue, brandId: selected.value })
                }
                options={brands?.data?.map((data) => ({
                  value: data.key,
                  label: data.value,
                }))}
              />
            </Suspense>
          </div>

          <div className="mt-4 flex">
            <div>
              <div>
                <label className="text-xs">Min Price:</label>
                <input
                  type="range"
                  name="minPrice"
                  min={rangeInputMinValue?.price}
                  max={rangeInputMaxValue?.price}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue) => ({
                      ...prevFilterValue,
                      minPrice: Number(event.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-xs">Max Price:</label>
                <input
                  type="range"
                  name="maxPrice"
                  min={rangeInputMinValue?.price}
                  max={rangeInputMaxValue?.price}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue) => ({
                      ...prevFilterValue,
                      minPrice: Number(event.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <button
              className="bg-black text-white text-xs px-2 rounded-md"
              onClick={setFilterPriceHandler}
            >
              set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
