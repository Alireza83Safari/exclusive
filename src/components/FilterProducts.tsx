import React, { useEffect, useState } from "react";
import SelectList from "./SelectList";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../Redux/Store";
import { getBrandsSelectList } from "../Redux/Store/brand";
import { getCategory } from "../Redux/Store/category";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Redux/Store/product";
import { BsFilterLeft } from "react-icons/bs";

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
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState({
    brandId: "",
    categoryId: "",
    order: "",
    onlyDiscount: false,
    minPrice: 0,
    maxPrice: 0,
  } as filterType);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userProducts } = useSelector((state: rootState) => state.product);
  const { brandsSelectList } = useSelector((state: rootState) => state.brand);
  const { category } = useSelector((state: rootState) => state.category);

  const rangeInputMinValue = userProducts.reduce((minPrice, nextPrice) => {
    if (minPrice?.price > nextPrice?.price) {
      return nextPrice;
    }
    return minPrice;
  }, userProducts[0]);

  const rangeInputMaxValue = userProducts.reduce((minPrice, nextPrice) => {
    if (minPrice?.price < nextPrice?.price) {
      return nextPrice;
    }
    return minPrice;
  }, userProducts[0]);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(getBrandsSelectList() as any);
      dispatch(getCategory() as any);
      dispatch(getProducts(false) as any);
      setDataFetched(true);
    }
  }, [dataFetched]);

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
            <SelectList
              name="categoryId"
              defaultValue={filterValue.categoryId}
              onChange={(selected) =>
                setFilterValue({ ...filterValue, categoryId: selected.value })
              }
              options={category.map((data) => ({
                value: data.key,
                label: data.value,
              }))}
            />
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
            <SelectList
              name="brandId"
              defaultValue={filterValue.brandId}
              onChange={(selected) =>
                setFilterValue({ ...filterValue, brandId: selected.value })
              }
              options={brandsSelectList.map((data) => ({
                value: data.key,
                label: data.value,
              }))}
            />
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
