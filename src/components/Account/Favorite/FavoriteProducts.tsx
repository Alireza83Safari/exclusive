import { Suspense, lazy } from "react";
import { useGetProfileFavoritesUserQuery } from "../../../Redux/apis/user/prodileUserApi";
import ProductSkelton from "../../../skelton/ProductSkelton";
const FavoriteTemplate = lazy(() => import("./FavoriteTemplate"));

function FavoriteProducts() {
  const { data: favoriteProducts } = useGetProfileFavoritesUserQuery("");
  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {favoriteProducts?.data?.length ? (
          favoriteProducts?.data?.map((favorite: any) => (
            <Suspense fallback={<ProductSkelton />} key={favorite.id}>
              <FavoriteTemplate {...favorite} />
            </Suspense>
          ))
        ) : (
          <div className="flex justify-center items-center min-h-full w-full lg:col-span-4 md:col-span-3 col-span-2">
            <h1 className="text-3xl font-bold py-40 flex justify-center items-center ">
              You Havent Favorite
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default FavoriteProducts;
