import { profileUserApi } from "../../../../Redux/apis/user/profileUserApi";
import ProductSkeleton from "../../../Skeleton/ProductSkeleton";
import FavoriteTemplate from "./FavoriteTemplate";

function FavoriteProducts() {
  const { data: favoriteProducts, isLoading } =
    profileUserApi.useGetProfileFavoritesUserQuery("");

  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : favoriteProducts?.data?.map((favorite: any) => (
              <FavoriteTemplate {...favorite} key={favorite?.id} />
            ))}
      </div>

      {!favoriteProducts?.length && (
        <div className="flex justify-center items-center min-h-full w-full lg:col-span-4 md:col-span-3 col-span-2">
          <h1 className="text-3xl font-bold py-40 flex justify-center items-center ">
            You Havent Favorite
          </h1>
        </div>
      )}
    </section>
  );
}

export default FavoriteProducts;
