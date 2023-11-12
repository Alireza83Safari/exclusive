import Spinner from "../../Spinner/Spinner";
import { useGetProductsUserQuery } from "../../../Redux/apis/user/productApiUser";

function BestSale() {
  const { data: product, isLoading: productLoading } =
    useGetProductsUserQuery("?order=topSell");
  const topSell = product?.data && product?.data[0];

  return (
    <div className="md:mr-7 mr-3 md:mt-4 mt-2">
      <div className="bg-white-100 py-7 px-5 ml-3 rounded-xl bg-white">
        <span className="flex justify-center font-bold whitespace-nowrap dark:text-white-100 lg:text-base text-xs text-center">
          Most Sale Product Weekly
        </span>
        <div className="my-5 h-64 relative">
          {productLoading ? (
            <Spinner />
          ) : (
            <img
              src={topSell?.fileUrl}
              className="w-full h-full object-contain"
              alt="Most Sale Product"
            />
          )}
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price:{topSell?.price}$</p>
          <p className="py-1 lg:py-0">code: {topSell?.code}</p>
        </div>
      </div>
    </div>
  );
}

export default BestSale;
