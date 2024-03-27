import { Link } from "react-router-dom";
import { useGetCategorySelectListQuery } from "../../Redux/apis/user/categoryUserApi";
import { categoryUserType } from "../../types/category";
import MenuSkelton from "../../skelton/MenuSkelton";

function Menu() {
  const { data: category, isLoading } = useGetCategorySelectListQuery("");

  return (
    <div className="lg:border-r border-borderColor lg:col-span-2 col-span-12 lg:py-8 py-4 lg:text-start text-center lg:flex lg:order-1 order-2 lg:pl-6">
      <ul className="lg:block grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:text-lg text-md">
        {isLoading ? (
          <MenuSkelton />
        ) : (
          category?.data
            ?.slice(0, 9)
            ?.map((item: categoryUserType, index: number) => (
              <li
                className="lg:my-4 my-2 hover:text-red duration-300"
                key={index}
              >
                <Link to={`/products?categoryId=${item.key}`}>
                  {item.value}
                </Link>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default Menu;
