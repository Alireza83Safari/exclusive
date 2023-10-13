import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../Redux/Store/category";
import { rootState } from "../../Redux/Store";
import { Link } from "react-router-dom";

function Menu() {
  const dispatch = useDispatch();
  const { category } = useSelector((state: rootState) => state.category);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(getCategory() as any);
      setDataFetched(true);
    }
  }, [dispatch, dataFetched]);

  return (
    <div className="lg:border-r border-borderColor lg:col-span-2 col-span-12 lg:py-8 py-4 lg:text-start text-center lg:flex lg:order-1 order-2">
      <ul className="lg:block grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:text-base text-sm">
        {category?.slice(0, 9).map((item) => (
          <li className="lg:my-3 my-1 hover:text-red duration-300">
            <Link to={`/category/product?categoryId=${item.key}`}>
              {item.value}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
