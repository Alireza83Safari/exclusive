import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useGetBrandsAdminQuery } from "../../../Redux/apis/admin/brandAdminApi";
import { useGetProductsSelectListQuery } from "../../../Redux/apis/admin/productAdminApi";
import { useGetOrderAdminQuery } from "../../../Redux/apis/admin/orderAdminApi";
import { TopbarSkelton } from "../../../skelton/admin/Dashboard";

export default function Topbar() {
  const { data: orders } = useGetOrderAdminQuery("");
  const { data: products, isLoading: productLoading } =
    useGetProductsSelectListQuery("");
  const { data: brands, isLoading: brandLoading } = useGetBrandsAdminQuery("");

  const date = new Date();
  const showDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  return (
    <>
      {productLoading || brandLoading ? (
        <TopbarSkelton />
      ) : (
        <>
          <div className="relative rounded-lg sm:col-span-1 col-span-3 p-6 dark:text-white-100 text-black-900 bg-white">
            <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
              <p className="xl:mr-4 whitespace-nowrap 2xl:text-lg font-bold">
                Total Brand
              </p>
              <span className="mx-1 text-green 2xl:text-lg flex items-center font-bold sm:right-0 right-8 pr-3 absolute">
                <FaArrowUp className="xl:mx-1" />
                12%
              </span>
            </div>

            <h1 className="font-black 2xl:text-5xl xl:text-4xl text-2xl 2xl:my-6 my-3 text-blue-600 text-center">
              {brands?.total ? brands?.total : 0}
            </h1>

            <p className="text-sm text-gray-500 2xl:text-lg">{showDate}</p>
          </div>

          <div className="relative rounded-lg sm:col-span-1 col-span-3 p-6 dark:text-white-100 text-black-900 bg-white">
            <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
              <p className="xl:mr-4 whitespace-nowrap 2xl:text-lg font-bold">
                Total Orders
              </p>
              <span className="mx-1 text-red 2xl:text-lg flex items-center font-bold sm:right-0 right-8 pr-3 absolute">
                <FaArrowDown className="xl:mx-1" />
                1%
              </span>
            </div>

            <h1 className="font-bold 2xl:text-5xl xl:text-4xl text-2xl 2xl:my-6 my-3 text-blue-600 text-center">
              {orders?.data?.length ? orders?.data?.length : 0}
            </h1>

            <p className="text-sm text-gray-500 2xl:text-lg">{showDate}</p>
          </div>

          <div className="relative rounded-lg sm:col-span-1 col-span-3 p-6 dark:text-white-100 text-black-900 bg-white">
            <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
              <p className="xl:mr-4 whitespace-nowrap 2xl:text-lg font-bold">
                Total Products
              </p>
              <span className="mx-1 text-green 2xl:text-lg flex items-center font-bold sm:right-0 right-8 pr-3 absolute">
                <FaArrowUp className="xl:mx-1" />
                4%
              </span>
            </div>

            <h1 className="font-bold 2xl:text-5xl xl:text-4xl text-2xl 2xl:my-6 my-3 text-blue-600 text-center">
              {products?.total}
            </h1>

            <p className="text-sm text-gray-500 2xl:text-lg">{showDate}</p>
          </div>
        </>
      )}
    </>
  );
}
