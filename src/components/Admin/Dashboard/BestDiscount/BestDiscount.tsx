import { productUserApi } from "../../../../Redux/apis/user/productUserApi";
import { DashboardBestSaleSkeleton } from "../../../index";

function BestDiscount() {
  const { data: product, isLoading } = productUserApi.useGetProductsUserQuery(
    "?order=discount&limit=1"
  );

  const topDiscount = product?.data && product?.data[0];
  if (isLoading) {
    return <DashboardBestSaleSkeleton />;
  }
  return (
    <div className="md:mr-7 mr-3 mt-4">
      <div className="bg-white py-7 px-5 ml-3 rounded-xl">
        <span className="flex justify-center font-bold whitespace-nowrap lg:text-base text-xs text-center">
          Most Discount Product Weekly
        </span>
        <div className="my-5 h-64 relative">
          <img
            src={topDiscount?.fileUrl}
            className="w-full h-full object-contain"
            alt="Most Sale Product"
          />
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price:{topDiscount?.price}$</p>
          <p className="py-1 lg:py-0">code: {topDiscount?.code}</p>
        </div>
      </div>
    </div>
  );
}

export default BestDiscount;
