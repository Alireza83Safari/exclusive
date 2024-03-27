import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";
import { useGetBrandsSelectListQuery } from "../../Redux/apis/user/brandUserApi";
import { useGetCategorySelectListQuery } from "../../Redux/apis/user/categoryUserApi";
import { useGetProductsUserQuery } from "../../Redux/apis/user/productApiUser";
import { categoryUserType } from "../../types/category";
import SelectList from "../SelectList";
import { brandSelectListType } from "../../types/brand";

enum OrderKeys {
  Newest = "newest",
  TopSell = "topSell",
  Cheap = "cheap",
  Expensive = "expensive",
  Discount = "discount",
  SearchTerm = "searchTerm",
}

const orderKeys: OrderKeys[] = [
  OrderKeys.Newest,
  OrderKeys.TopSell,
  OrderKeys.Cheap,
  OrderKeys.Expensive,
  OrderKeys.Discount,
  OrderKeys.SearchTerm,
];

type FilterType = {
  brandId: string;
  categoryId: string;
  brandName: string;
  categoryName: string;
  order: string;
  onlyDiscount: boolean;
  minPrice: number | null;
  maxPrice: number | null;
  orderName: string;
  searchTerm: string;
  limit: string;
  page: string;
};

const FilterProducts: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState<FilterType>({
    brandId: "",
    categoryId: "",
    brandName: "",
    categoryName: "",
    searchTerm: "",
    order: "",
    orderName: "",
    onlyDiscount: false,
    minPrice: 0,
    maxPrice: 0,
    limit: "",
    page: "",
  });

  const { data: brands } = useGetBrandsSelectListQuery("");
  const { data: products } = useGetProductsUserQuery("");
  const { data: category } = useGetCategorySelectListQuery("");

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const lastFilterValue: FilterType = {
      brandId: searchParams.get("brandId") || "",
      categoryId: searchParams.get("categoryId") || "",
      page: searchParams.get("page") || "",
      limit: searchParams.get("limit") || "",
      brandName: searchParams.get("brandName") || "",
      categoryName: searchParams.get("categoryName") || "",
      searchTerm: searchParams.get("searchTerm") || "",
      order: searchParams.get("order") || "",
      orderName: searchParams.get("orderName") || "",
      onlyDiscount: Boolean(searchParams.get("onlyDiscount")),
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 0,
    };

    setFilterValue(lastFilterValue);
  }, [location.search]);

  const filterData = () => {
    const filteredParams = new URLSearchParams();

    for (const [key, value] of Object.entries(filterValue)) {
      switch (key) {
        case "brandId":
        case "searchTerm":
        case "categoryId":
        case "order":
        case "onlyDiscount":
        case "page":
        case "limit":
        case "minPrice":
        case "maxPrice":
          if (value) {
            console.log(value);

            filteredParams.set(key, value.toString());
          }
          break;
        default:
          break;
      }
    }

    navigate(`?${filteredParams.toString()}`, { replace: false });
  };

  useEffect(() => {
    const hasData = Object.values(filterValue).every(
      (item) => !(item as any)?.length
    );

    if (!hasData) {
      filterData();
    }
  }, [filterValue]);

  const setFilterPriceHandler = useCallback((): void => {
    const updatedFilterValue = { ...filterValue };

    if (filterValue?.minPrice !== 0 || filterValue?.maxPrice !== 0) {
      updatedFilterValue.minPrice = filterValue?.minPrice;
      updatedFilterValue.maxPrice = filterValue?.maxPrice;
    }

    setFilterValue(updatedFilterValue);
  }, [filterValue, filterValue]);

  const rangeInputMinValue = products?.data?.reduce(
    (minPrice: any, nextPrice: any) =>
      minPrice?.price > nextPrice?.price ? nextPrice?.price : minPrice?.price
  );

  const rangeInputMaxValue = products?.data?.reduce(
    (minPrice: any, nextPrice: any) =>
      minPrice?.price < nextPrice?.price ? nextPrice : minPrice
  );

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
                  max={+rangeInputMaxValue?.price}
                  value={filterValue.minPrice as number}
                  onChange={(event) =>
                    setFilterValue(() => ({
                      ...filterValue,
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
                  value={filterValue.minPrice as number}
                  onChange={(event) =>
                    setFilterValue(() => ({
                      ...filterValue,
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
                  min={+rangeInputMinValue?.price}
                  max={+rangeInputMaxValue?.price}
                  value={filterValue.maxPrice as number}
                  onChange={(event) =>
                    setFilterValue(() => ({
                      ...filterValue,
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
                  value={filterValue.maxPrice as number}
                  onChange={(event) =>
                    setFilterValue(() => ({
                      ...filterValue,
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
