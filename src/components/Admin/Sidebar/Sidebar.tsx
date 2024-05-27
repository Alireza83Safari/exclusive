// Sidebar.tsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdDiscount } from "react-icons/md";
import { FaBox, FaRegComment, FaRegUser } from "react-icons/fa";
import { TbCategory, TbLockAccess } from "react-icons/tb";
import { TbBrandApple } from "react-icons/tb";
import { IoBagCheck, IoColorPaletteOutline } from "react-icons/io5";
import { PiFlagBannerFill } from "react-icons/pi";
import { appRoutes } from "../../../routes/appRoutes";
import { SidebarProps } from "./Sidebar.interface";

const mentItem = [
  { key: appRoutes.ADMIN_DASHBOARD, title: "dashboard", icon: <MdDashboard /> },
  { key: appRoutes.ADMIN_PRODUCT, title: "product", icon: <FaBox /> },
  { key: appRoutes.ADMIN_ROLE, title: "role", icon: <TbLockAccess /> },
  { key: appRoutes.ADMIN_BRAND, title: "brand", icon: <TbBrandApple /> },
  { key: appRoutes.ADMIN_CATEGORY, title: "category", icon: <TbCategory /> },
  {
    key: appRoutes.ADMIN_COLOR,
    title: "color",
    icon: <IoColorPaletteOutline />,
  },
  { key: appRoutes.ADMIN_ORDER, title: "order", icon: <IoBagCheck /> },
  { key: appRoutes.ADMIN_COMMENT, title: "comment", icon: <FaRegComment /> },
  { key: appRoutes.ADMIN_APPPIC, title: "appPic", icon: <PiFlagBannerFill /> },
  { key: appRoutes.ADMIN_USER, title: "user", icon: <FaRegUser /> },
  { key: appRoutes.ADMIN_DISCOUNT, title: "discount", icon: <MdDiscount /> },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        {mentItem.map((menu) => (
          <Link to={menu.key} key={menu.key}>
            <ListItem
              button
              key={menu.key}
              sx={{
                color: location.pathname.includes(menu.key) ? "red" : "",
                marginLeft: location.pathname.includes(menu.key) ? "3px" : "",
                fontSize: location.pathname.includes(menu.key) ? "24px" : "",
              }}
            >
              {menu.icon}
              <ListItemText primary={menu.title} className="ml-2" />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
