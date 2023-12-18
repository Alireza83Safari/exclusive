import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import { useGetBrandsSelectListQuery } from "../../Redux/apis/user/brandUserApi";
import { useGetCategorySelectListQuery } from "../../Redux/apis/user/categoryUserApi";
import { useGetProductsUserQuery } from "../../Redux/apis/user/productApiUser";
import { categoryUserType } from "../../types/Category.type";
import SelectList from "../SelectList";
import { brandSelectListType } from "../../types/Brand.type";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const orderKeys = [
    "newest",
    "topSell",
    "cheap",
    "expensive",
    "discount",
  ] as const;

  const [priceFilter, setFilterPrice] = useState({
    minPrice: null,
    maxPrice: null,
  }) as any;
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

  const rangeInputMinValue = useMemo(() => {
    products?.data?.reduce((minPrice: any, nextPrice: any) => {
      if (minPrice?.price > nextPrice?.price) {
        return nextPrice;
      }
      return minPrice;
    });
  }, [products]);

  const rangeInputMaxValue = useMemo(() => {
    products?.data?.reduce((minPrice: any, nextPrice: any) => {
      if (minPrice?.price < nextPrice?.price) {
        return nextPrice;
      }
      return minPrice;
    });
  }, [products]);

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

  const setFilterPriceHandler = useCallback(() => {
    const updatedFilterValue = { ...filterValue };

    if (priceFilter.minPrice !== 0 || priceFilter.maxPrice !== 0) {
      updatedFilterValue.minPrice = priceFilter.minPrice;
      updatedFilterValue.maxPrice = priceFilter.maxPrice;
    }

    setFilterValue(updatedFilterValue);
  }, [filterValue, priceFilter]);

  return (
    <div>
      <div className="flex justify-center text-4xl">
        <BsFilterLeft onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen && (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 mb-2">
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
            <div className="grid lg:grid-cols-2 grid-cols-5">
              <div className="flex items-center lg:col-span-1 col-span-3">
                <label htmlFor="" className="text-sm whitespace-nowrap">
                  min:
                </label>
                <input
                  type="range"
                  name="minPrice"
                  className="mr-4"
                  min={rangeInputMinValue?.price}
                  max={rangeInputMaxValue?.price}
                  value={priceFilter.minPrice}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue: any) => ({
                      ...prevFilterValue,
                      minPrice: Number(event.target.value),
                    }))
                  }
                />
              </div>

              <div className="relative lg:col-span-1 col-span-2">
                <input
                  type="number"
                  name="minPrice"
                  className="border border-borderColor w-full justify-end rounded-lg outline-none focus:border-blue-600 placeholder:text-sm placeholder:text-black"
                  style={{ padding: "5px" }}
                  placeholder="min price"
                  value={priceFilter.minPrice}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue: any) => ({
                      ...prevFilterValue,
                      minPrice: Number(event.target.value),
                    }))
                  }
                />
                <button
                  className="bg-black text-white text-xs px-2 rounded-r-md absolute right-0 h-full"
                  onClick={setFilterPriceHandler}
                >
                  set
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex">
            <div className="grid lg:grid-cols-2 grid-cols-5">
              <div className="lg:flex items-center lg:col-span-1 col-span-3">
                <label htmlFor="" className="text-sm whitespace-nowrap">
                  max:
                </label>
                <input
                  type="range"
                  name="maxPrice"
                  className="mr-4"
                  min={rangeInputMinValue?.price}
                  max={rangeInputMaxValue?.price}
                  value={priceFilter.maxPrice}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue: any) => ({
                      ...prevFilterValue,
                      maxPrice: Number(event.target.value),
                    }))
                  }
                />
              </div>

              <div className="relative lg:col-span-1 col-span-2">
                <input
                  type="number"
                  name="maxPrice"
                  className="border border-borderColor w-full rounded-lg outline-none focus:border-blue-600 placeholder:text-sm placeholder:text-black"
                  style={{ padding: "5px" }}
                  placeholder="max price"
                  value={priceFilter.maxPrice}
                  onChange={(event) =>
                    setFilterPrice((prevFilterValue: any) => ({
                      ...prevFilterValue,
                      maxPrice: Number(event.target.value),
                    }))
                  }
                />
                <button
                  className="bg-black text-white text-xs px-2 rounded-r-md absolute right-0 h-full"
                  onClick={setFilterPriceHandler}
                >
                  set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
