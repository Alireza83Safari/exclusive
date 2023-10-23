import React from "react";
import ProductTemplate from "../Product/ProductTemplate";
import { useGetProfileFavoritesUserQuery } from "../../Redux/apis/profileApi"; 

function FavoriteProducts() {
  const { data: favoriteProducts } = useGetProfileFavoritesUserQuery("");
  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {favoriteProducts?.data.map((favorite) => (
          <ProductTemplate {...favorite} />
        ))}
      </div>
    </section>
  );
}

export default FavoriteProducts;
