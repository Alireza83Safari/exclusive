// Sidebar.tsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}
const mentItem = [
  { key: "dashboard" },
  { key: "product" },
  { key: "role" },
  { key: "brand" },
  { key: "category" },
  { key: "color" },
  { key: "order" },
  { key: "comment" },
  { key: "appPic" },
  { key: "user" },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        {mentItem.map((menu) => (
          <Link to={menu.key} key={menu.key}>
            <ListItem button key={menu.key}>
              <ListItemText primary={menu.key} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
