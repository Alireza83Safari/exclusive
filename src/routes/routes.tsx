import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Account from "../pages/Account";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import FavoriteProducts from "../components/Account/Favorite/FavoriteProducts";
import AccountOrders from "../components/Account/AccountOrders";
import AccountAddress from "../components/Account/Address/AccountAddress";
import AccountComments from "../components/Account/AccountComments";
import Shipping from "../pages/Shipping";
import IndexPanel from "../components/Admin/index";
import AdminProducts from "../pages/Admin/Products";
import Dashboard from "../pages/Admin/Dashboard";
import Category from "../pages/Admin/Category";
import Color from "../pages/Admin/Color";
import BrandPanel from "../pages/Admin/Brand";
import AppPic from "../pages/Admin/AppPic";
import Comment from "../pages/Admin/Comment";
import User from "../pages/Admin/User";
import Order from "../pages/Admin/Order";
import Role from "../pages/Admin/Role";
import NotFound from "../components/404";
import Discount from "../pages/Admin/Discount";

const routes = [
  { path: "*", element: <NotFound /> },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "", element: <Home /> },
  { path: "cart", element: <Cart /> },
  { path: "cart/Shipping", element: <Shipping /> },
  { path: "account", element: <Account /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "product/:productId", element: <ProductDetails /> },
  { path: "products", element: <Products /> },
  {
    path: "account/*",
    element: <Account />,
    children: [
      { path: "", element: <AccountOrders /> },
      { path: "favorite", element: <FavoriteProducts /> },
      { path: "order", element: <AccountOrders /> },
      { path: "comment", element: <AccountComments /> },
      { path: "address", element: <AccountAddress /> },
    ],
  },

  {
    path: "admin/*",
    element: <IndexPanel />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "product", element: <AdminProducts /> },
      { path: "category", element: <Category /> },
      { path: "color", element: <Color /> },
      { path: "brand", element: <BrandPanel /> },
      { path: "appPic", element: <AppPic /> },
      { path: "comment", element: <Comment /> },
      { path: "user", element: <User /> },
      { path: "order", element: <Order /> },
      { path: "role", element: <Role /> },
      { path: "discount", element: <Discount /> },
    ],
  },
];

export default routes;
