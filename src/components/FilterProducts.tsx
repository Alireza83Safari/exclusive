import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import { useGetBrandsSelectListQuery } from "../Redux/apis/user/brandUserApi";
import { useGetCategorySelectListQuery } from "../Redux/apis/user/categoryUserApi";
import { useGetProductsUserQuery } from "../Redux/apis/user/productApiUser";
import { categoryUserType } from "../types/Category.type";
import SelectList from "./SelectList";
import { brandSelectListType } from "../types/Brand.type";

type filterType = {
  brandId: string;
  categoryId: string;
  brandName: any;
  categoryName: any;
  order: string;
  onlyDiscount: boolean;
  minPrice: number;
  maxPrice: number;
  orderName: string;
};

const FilterProducts = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const orderKeys = [
    "newest",
    "topSell",
    "cheap",
    "expensive",
    "discount",
  ] as const;
  const [priceFilter, setFilterPrice] = useState({ minPrice: 0, maxPrice: 0 });
  const [filterValue, setFilterValue] = useState({
    brandId: "",
    categoryId: "",
    brandName: "",
    categoryName: "",
    order: "",
    orderName: "",
    onlyDiscount: false,
    minPrice: 0,
    maxPrice: 0,
  } as filterType);

  const { data: brands } = useGetBrandsSelectListQuery("");
  const { data: products } = useGetProductsUserQuery("");
  const { data: category } = useGetCategorySelectListQuery("");

  const rangeInputMinValue = products?.data?.reduce(
    (minPrice: any, nextPrice: any) => {
      if (minPrice?.price > nextPrice?.price) {
        return nextPrice;
      }
      return minPrice;
    }
  );

  const rangeInputMaxValue = products?.data?.reduce(
    (minPrice: any, nextPrice: any) => {
      if (minPrice?.price < nextPrice?.price) {
        return nextPrice;
      }
      return minPrice;
    }
  );

  const filterData = () => {
    const filteredParams = new URLSearchParams();
    if (filterValue?.brandName || filterValue?.categoryName) {
      delete filterValue?.brandName;
      delete filterValue?.categoryName;
    }

    for (const key in filterValue) {
      switch (key) {
        case "brandId":
          if (filterValue[key]) {
            filteredParams.set(key, filterValue[key].toString());
          }
          break;
        case "categoryId":
          if (filterValue[key]) {
            filteredParams.set(key, filterValue[key].toString());
          }
          break;
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
          if (filterValue[key]) {
            filteredParams.set(key, filterValue[key].toString());
          }
          break;

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
    const updatedFilterValue = { ...filterValue };

    if (priceFilter.minPrice !== 0) {
      updatedFilterValue.minPrice = priceFilter.minPrice;
    }

    if (priceFilter.maxPrice !== 0) {
      updatedFilterValue.maxPrice = priceFilter.maxPrice;
    }

    setFilterValue(updatedFilterValue);
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
                setFilterValue({
                  ...filterValue,
                  categoryId: selected.value,
                  categoryName: selected.label,
                })
              }
              options={category?.data?.map((data: categoryUserType) => ({
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
              onChange={(selected) => {
                setFilterValue({
                  ...filterValue,
                  order: selected.value,
                  orderName: selected.label,
                });
              }}
              options={orderKeys?.map((order) => ({
                value: order,
                label: order,
              }))}
            />
          </div>

          <div>
            <label className="text-xs">Brand:</label>
            <SelectList
              name="brandId"
              defaultValue={filterValue.brandId}
              onChange={(selected) =>
                setFilterValue({
                  ...filterValue,
                  brandId: selected.value,
                  brandName: selected.label,
                })
              }
              options={brands?.data?.map((data: brandSelectListType) => ({
                value: data.key,
                label: data.value,
              }))}
            />
          </div>

          <div className="mt-4 flex">
            <div>
              <div>
                <label className="text-xs">
                  Min Price:{priceFilter.minPrice}
                </label>
                <input
                  type="range"
                  name="minPrice"
                  min={rangeInputMinValue?.price}
                  max={rangeInputMaxValue?.price}
                  value={priceFilter.minPrice}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue) => ({
                      ...prevFilterValue,
                      minPrice: Number(event.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-xs">
                  Max Price:{priceFilter.maxPrice}
                </label>
                <input
                  type="range"
                  name="maxPrice"
                  min={rangeInputMinValue?.price}
                  max={rangeInputMaxValue?.price}
                  value={priceFilter.maxPrice}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue) => ({
                      ...prevFilterValue,
                      maxPrice: Number(event.target.value),
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
