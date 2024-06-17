import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";

import SignIn from "../pages/signIn/.";
import SignUp from "../pages/signUp/.";
import Index from "../pages/main/.";
import ProducView from "../pages/product-view/.";
import SearchPanel from "../pages/search/.";
import Form from "../pages/form/.";
import Orders from "../pages/orders/.";
import Cart from "../pages/checkout/index.jsx";
import Profile from "../pages/profile";
import NotFound from "../components/not-found/.";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/search/:data",
        element: <SearchPanel />,
      },
      {
        path: "/products/:id",
        element: <ProducView />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/thanks",
        element: <Profile />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

export default router;
