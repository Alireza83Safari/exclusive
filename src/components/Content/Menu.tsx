import React from "react";
import { Link } from "react-router-dom";
import { useGetCategorySelectListQuery } from "../../Redux/apis/user/categoryUserApi";

function Menu() {
  const { data: category } = useGetCategorySelectListQuery("");
  console.log(category);

  return (
    <div className="lg:border-r border-borderColor lg:col-span-2 col-span-12 lg:py-8 py-4 lg:text-start text-center lg:flex lg:order-1 order-2 lg:pl-6">
      <ul className="lg:block grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:text-lg text-sm">
        {category?.data?.slice(0, 9).map((item: any) => (
          <li className="lg:my-3 my-2 hover:text-red duration-300">
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
