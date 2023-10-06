import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Chechout from "../pages/Chechout";
import NotFound from "../components/NotFound";
import Account from "../pages/Account";
import About from "../pages/About";
import Contact from "../pages/Cancat";

const routes = [
  { path: "*", element: <NotFound /> },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "", element: <Home /> },
  { path: "wishlist", element: <Wishlist /> },
  { path: "cart", element: <Cart /> },
  { path: "cart/chechout", element: <Chechout /> },
  { path: "account", element: <Account /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
];

export default routes;
