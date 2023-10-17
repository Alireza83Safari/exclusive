import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import NotFound from "../components/NotFound";
import Account from "../pages/Account";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import CategoryResult from "../pages/CategoryResult";
import BrandResult from "../pages/BrandResult";
import UserInfo from "../components/Account/AccountUserInfo";
import FavoriteProducts from "../components/Account/FavoriteProducts";
import AccountOrders from "../components/Account/AccountOrders";
import AccountAddress from "../components/Account/AccountAddress";
import AccountComments from "../components/Account/AccountComments";
import AccountUserInfo from "../components/Account/AccountUserInfo";
import SearchResult from "../pages/SearchResult";
import Shipping from "../pages/Shipping";

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
  { path: "category/:category", element: <CategoryResult /> },
  { path: "brand/:brand", element: <BrandResult /> },
  { path: "search/:search", element: <SearchResult /> },
  {
    path: "account/*",
    element: <Account />,
    children: [
      { path: "userInfo", element: <UserInfo /> },
      { path: "favorite", element: <FavoriteProducts /> },
      { path: "order", element: <AccountOrders /> },
      { path: "comment", element: <AccountComments /> },
      { path: "address", element: <AccountAddress /> },
      { path: "userInfo", element: <AccountUserInfo /> },
    ],
  },
];

export default routes;
