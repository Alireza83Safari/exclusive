import { lazy, Suspense } from "react";
import {
  NotFound,
  FavoriteProducts,
  AccountOrders,
  AccountAddress,
  AccountComments,
  IndexPanel,
} from "../components";
import { appRoutes } from "./appRoutes";
import {
  About,
  Account,
  Cart,
  Contact,
  Home,
  Login,
  ProductDetails,
  Products,
  Register,
  Shipping,
} from "../pages";

const AdminProducts = lazy(() => import("../pages/Admin/Products"));
const Comment = lazy(() => import("../pages/Admin/Comment"));
const Discount = lazy(() => import("../pages/Admin/Discount"));
const Role = lazy(() => import("../pages/Admin/Role"));
const Order = lazy(() => import("../pages/Admin/Order"));
const User = lazy(() => import("../pages/Admin/User"));
const Brand = lazy(() => import("../pages/Admin/Brand"));
const AppPic = lazy(() => import("../pages/Admin/AppPic"));
const Category = lazy(() => import("../pages/Admin/Category"));
const Color = lazy(() => import("../pages/Admin/Color"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));

const routes = [
  { path: "*", element: <NotFound /> },
  {
    path: appRoutes.REGISTER,
    element: <Register />,
  },
  {
    path: appRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: "",
    element: <Home />,
  },
  {
    path: appRoutes.CART,
    element: <Cart />,
    children: [
      {
        path: appRoutes.CART_SHIPPING,
        element: <Shipping />,
      },
    ],
  },
  {
    path: appRoutes.ACCOUNT,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Account />
      </Suspense>
    ),
  },
  {
    path: appRoutes.ABOUT + "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
  },
  {
    path: appRoutes.CONTACT,
    element: <Contact />,
  },
  {
    path: appRoutes.PRODUCT + ":productId",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails />
      </Suspense>
    ),
  },
  {
    path: appRoutes.PRODUCTS,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    ),
  },
  {
    path: appRoutes.ACCOUNT,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Account />
      </Suspense>
    ),
    children: [
      { path: "", element: <AccountOrders /> },
      {
        path: appRoutes.ACCOUNT_FAVORITE_CHILDREN,
        element: <FavoriteProducts />,
      },
      { path: appRoutes.ACCOUNT_ORDER_CHILDREN, element: <AccountOrders /> },
      { path: appRoutes.ADMIN_COMMENT_CHILDREN, element: <AccountComments /> },
      { path: appRoutes.ACCOUNT_ADDRESS_CHILDREN, element: <AccountAddress /> },
    ],
  },
  {
    path: appRoutes.ADMIN + "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <IndexPanel />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_DASHBOARD_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_PRODUCT_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminProducts />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_CATEGORY_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_COLOR_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Color />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_BRAND_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Brand />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_APPPIC_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AppPic />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_COMMENT_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Comment />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_USER_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <User />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_ORDER_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Order />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_ROLE_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Role />
          </Suspense>
        ),
      },
      {
        path: appRoutes.ADMIN_DISCOUNT_CHILDREN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Discount />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
