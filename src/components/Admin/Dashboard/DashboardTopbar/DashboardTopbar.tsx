import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { brandAdminApi, orderAdminApi, productAdminApi } from "../../../../Redux";
import { DashboardTopbarSkeleton } from "../../../index";

const DashboardTopbar = () => {
  const { data: orders, isLoading: isLoadingOrder } =
    orderAdminApi.useGetOrderAdminQuery("");

  const { data: products, isLoading: isLoadingProducts } =
    productAdminApi.useGetProductsSelectListQuery("");

  const { data: brands, isLoading: isLoadingBrands } =
    brandAdminApi.useGetBrandsAdminQuery("");

  const date = new Date();
  const showDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  if (isLoadingOrder || isLoadingProducts || isLoadingBrands) {
    return <DashboardTopbarSkeleton />;
  }

  return (
    <div className="grid sm:grid-cols-3 gap-7 py-3 md:mx-7 mx-3 rounded-xl mt-4 md:ml-7 ml-3 relative">
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
    </div>
  );
};

export default DashboardTopbar;
