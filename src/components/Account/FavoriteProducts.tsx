import React from "react";
import ProductTemplate from "../Product/ProductTemplate";
import { useGetProfileFavoritesUserQuery } from "../../Redux/apis/user/prodileUserApi";

function FavoriteProducts() {
  const { data: favoriteProducts } = useGetProfileFavoritesUserQuery("");
  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {favoriteProducts?.data.map((favorite: any) => (
          <ProductTemplate {...favorite} />
        ))}
      </div>
    </section>
  );
}

export default FavoriteProducts;
