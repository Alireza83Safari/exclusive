import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../Redux/Store";
import { getProfileFavorite } from "../../Redux/Store/profile";
import ProductTemplate from "../Product/ProductTemplate";

function FavoriteProducts() {
  const dispatch = useDispatch();
  const { profileFavorite } = useSelector((state: rootState) => state.profile);
  useEffect(() => {
    dispatch(getProfileFavorite() as any);
  }, []);
  return (
    <section>
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2">
        {profileFavorite?.map((favorite) => (
          <ProductTemplate {...favorite} />
        ))}
      </div>
    </section>
  );
}

export default FavoriteProducts;
