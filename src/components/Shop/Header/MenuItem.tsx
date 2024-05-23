import { Link } from "react-router-dom";
import { authContext, authContextType } from "../../../context/authContext";
import { useContext } from "react";
import { appRoutes } from "../../../routes/appRoutes";

const MenuItem = ({ isMenuVisible }: { isMenuVisible: boolean }) => {
  const { userIsLogin, userInfos } = useContext(authContext) as authContextType;

  return (
    <>
      <ul className="items-center lg:flex hidden z-10">
        <Link
          className={` mx-5 hover:text-red lg:my-0 my-6 ${
            (userInfos?.role?.name === "admin" ||
              userInfos?.role?.name === "root") &&
            userIsLogin
              ? `lg:flex block`
              : `hidden`
          } `}
          to={appRoutes.ADMIN}
        >
          Admin Panel
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to={appRoutes.HOME}
        >
          Home
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to={appRoutes.CONTACT}
        >
          Contact
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to={appRoutes.ABOUT}
        >
          About
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to={appRoutes.PRODUCTS}
        >
          Products
        </Link>
        <Link
          className={` mx-5 hover:text-red lg:my-0 my-6 ${
            userIsLogin ? `hidden` : `lg:flex block`
          } `}
          to={appRoutes.REGISTER}
        >
          Sign Up
        </Link>
      </ul>
      {isMenuVisible && (
        <ul className="items-center absolute left-4 top-20 bg-gray rounded-md z-10">
          <Link
            className={` mx-5 hover:text-red lg:my-0 my-6 ${
              (userInfos?.role?.name === "admin" ||
                userInfos?.role?.name === "root") &&
              userIsLogin
                ? `block lg:flex`
                : `hidden`
            } `}
            to={appRoutes.ADMIN}
          >
            Admin Panel
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to={appRoutes.HOME}
          >
            Home
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to={appRoutes.CONTACT}
          >
            Contact
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to={appRoutes.ABOUT}
          >
            About
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to={appRoutes.PRODUCTS}
          >
            Products
          </Link>
          <Link
            className={` mx-5 hover:text-red lg:my-0 my-6 ${
              userIsLogin ? ` hidden ` : `block lg:flex`
            } `}
            to={appRoutes.REGISTER}
          >
            Sign Up
          </Link>
        </ul>
      )}
    </>
  );
};

export default MenuItem;
