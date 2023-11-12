import { Suspense, lazy } from "react";
import { useGetProfileFavoritesUserQuery } from "../../Redux/apis/user/prodileUserApi";
import ProductSkelton from "../../skelton/ProductSkelton";
const ProductTemplate = lazy(() => import("../Product/ProductTemplate"));

function FavoriteProducts() {
  const { data: favoriteProducts } = useGetProfileFavoritesUserQuery("");

  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {favoriteProducts?.data?.map((favorite: any) => (
          <Suspense fallback={<ProductSkelton />} key={favorite.id}>
            <ProductTemplate {...favorite} />
          </Suspense>
        ))}
      </div>
    </section>
  );
}

export default FavoriteProducts;
