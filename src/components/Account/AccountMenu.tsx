import React from "react";
import { Link, useLocation } from "react-router-dom";

function AccountMenu() {
  const menuItem = [
    { to: "userInfo", title: "UserInfo" },
    { to: "favorite", title: "Favorite" },
    { to: "order", title: "Order" },
    { to: "comment", title: "Comment" },
    { to: "address", title: "Address" },
  ];
  const location = useLocation();

  return (
    <div className="pl-4">
      {menuItem.map((menu, index) => (
        <Link
          className={`block my-7 text-lg ${
            location.pathname.includes(menu.to) &&
            "font-semibold text-xl duration-300"
          }`}
          to={menu.to}
          key={index}
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
}

export default AccountMenu;
