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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const mentItem = [
  { key: "dashboard", icon: <MdDashboard /> },
  { key: "product", icon: <FaBox /> },
  { key: "role", icon: <TbLockAccess /> },
  { key: "brand", icon: <TbBrandApple /> },
  { key: "category", icon: <TbCategory /> },
  { key: "color", icon: <IoColorPaletteOutline /> },
  { key: "order", icon: <IoBagCheck /> },
  { key: "comment", icon: <FaRegComment /> },
  { key: "appPic", icon: <PiFlagBannerFill /> },
  { key: "user", icon: <FaRegUser /> },
  { key: "discount", icon: <MdDiscount /> },
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
              <ListItemText primary={menu.key} className="ml-2" />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
