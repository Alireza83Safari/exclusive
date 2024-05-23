import { Link } from "react-router-dom";
import { userProductTypeWithLoading } from "../../../../types/product";
import { addOrderItem } from "../../../../types/order";
import { ContentLoaders } from "../../../../components";
import toast from "react-hot-toast";
import { orderUserApi } from "../../../../Redux/apis/user/orderUserApi";
import { FaTrashAlt } from "react-icons/fa";
import { favoriteUserApi } from "../../../../Redux/apis/user/favoriteUserApi";
import { profileUserApi } from "../../../../Redux/apis/user/profileUserApi";
import { useEffect } from "react";
import { appRoutes } from "../../../../routes/appRoutes";

function FavoriteTemplate({
  name,
  price,
  fileUrl,
  id,
  discountValue,
  itemId,
  categoryName,
  quantity,
  productsLoading,
}: userProductTypeWithLoading) {
  const { refetch } = profileUserApi.useGetProfileFavoritesUserQuery("");
  const [createOrderItem] = orderUserApi.useCreateOrderItemMutation();
  const [deleteFavorite, { isLoading, isSuccess }] =
    favoriteUserApi.useDeleteFavoriteMutation();

  const addProductToBasket = () => {
    let orderItemInfo = {
      productItemId: itemId,
      quantity: 1,
    } as addOrderItem;
    createOrderItem(orderItemInfo)
      .unwrap()
      .then(() => toast.success(`${name} Added To Cart`));
  };

  const deleteFavoriteHandler = (id: string) => {
    deleteFavorite(id);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("delete is successfully");
    }
  }, [isSuccess]);
  return (
    <div className="relative group my-4 px-2" key={id}>
      <div className="flex justify-center items-center sm:h-[250px] h-[220px] bg-gray relative">
        {discountValue && (
          <p className="sm:px-3 px-1 py-1 rounded-md bg-red absolute top-3 left-3 sm:text-xs text-[10px] text-white">
            {discountValue}%
          </p>
        )}

        <div
          className="absolute top-3 right-3"
          onClick={() => deleteFavoriteHandler(itemId)}
        >
          <FaTrashAlt className="text-xl text-red" />
        </div>
        <button
          className="bg-black w-full absolute bottom-0 text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          onClick={() => addProductToBasket()}
        >
          Add To Cart
        </button>
        <Link to={appRoutes.PRODUCT + "productId"} className="w-9/12 h-3/4 ">
          <img
            src={fileUrl}
            className="object-contain w-full h-full"
            loading="lazy"
          />
        </Link>
      </div>
      <Link to={appRoutes.PRODUCT + "productId"} className="mt-2">
        {productsLoading || isLoading ? (
          <ContentLoaders width={100} height={20} />
        ) : (
          <h3 className="font-semibold md:text-lg text-base">{name}</h3>
        )}
        <div className="flex justify-between mt-2">
          <p className="text-emerald-600 font-semibold md:text-base text-sm">
            {categoryName}
          </p>
          <p className="md:text-base text-sm">quantity:{quantity}</p>
        </div>

        {productsLoading || isLoading ? (
          <div className="my-1">
            <ContentLoaders width={100} height={20} />
          </div>
        ) : (
          <div className="flex mt-2">
            <p className="text-red mr-4 md:text-base text-sm">
              ${discountValue ? price - (discountValue / 100) * price : price}
            </p>
            <p className="line-through md:text-base text-sm">
              {discountValue ? `$ ${price}` : ""}
            </p>
          </div>
        )}

        {productsLoading || isLoading ? (
          <div className="my-1">
            <ContentLoaders width={200} height={40} />
          </div>
        ) : (
          <div className="flex items-center mt-2">
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
            <img src="/images/star.png" className="w-4 h-4" alt="Star" />
          </div>
        )}
      </Link>
    </div>
  );
}

export default FavoriteTemplate;
