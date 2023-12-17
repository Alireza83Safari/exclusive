import { Link } from "react-router-dom";
import { authContext, authContextType } from "../../context/authContext";
import { useContext } from "react";

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
          to="/admin"
        >
          Admin Panel
        </Link>
        <Link className="mx-5 hover:text-red lg:flex block lg:my-0 my-6" to="/">
          Home
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to="/about"
        >
          About
        </Link>
        <Link
          className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
          to="/products"
        >
          Products
        </Link>
        <Link
          className={` mx-5 hover:text-red lg:my-0 my-6 ${
            userIsLogin ? `hidden` : `lg:flex block`
          } `}
          to="/register"
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
            to="/admin"
          >
            Admin Panel
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to="/"
          >
            Home
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to="/about"
          >
            About
          </Link>
          <Link
            className="mx-5 hover:text-red lg:flex block lg:my-0 my-6"
            to="/products"
          >
            Products
          </Link>
          <Link
            className={` mx-5 hover:text-red lg:my-0 my-6 ${
              userIsLogin ? ` hidden ` : `block lg:flex`
            } `}
            to="/register"
          >
            Sign Up
          </Link>
        </ul>
      )}
    </>
  );
};

export default MenuItem;
