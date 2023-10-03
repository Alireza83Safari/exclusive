import React from "react";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Chechout from "../pages/Chechout";

const routes = [
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "", element: <Home /> },
  { path: "wishlist", element: <Wishlist /> },
  { path: "cart", element: <Cart /> },
  { path: "cart/chechout", element: <Chechout /> },
];

export default routes;
