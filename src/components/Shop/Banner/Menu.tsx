import { Link } from "react-router-dom";
import { categoryUserType } from "../../../types/category";
import { appRoutes } from "../../../routes/appRoutes";

interface MenuProps {
  category: any;
}

function Menu(props: MenuProps) {
  const { category } = props;

  return (
    <ul className="lg:block grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:text-lg text-md">
      {category?.data?.slice(0, 7)?.map((item: categoryUserType) => (
        <li
          className="lg:my-4 my-2 hover:text-red duration-300"
          key={item?.key}
        >
          <Link to={appRoutes.PRODUCTS + `?categoryId=${item.key}`}>
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
