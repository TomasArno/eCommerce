
import { createBrowserRouter } from "react-router-dom";

import App from '../App.jsx';

import SignIn from "../pages/login/."
// import SignUp from "../pages/register/." ver si lo puedo hacer en solo una pagina
import Register from "../pages/register/."
import Index from "../pages/main/."
import ProducView from "../pages/product-view/."
import SearchPanel from "../pages/search/."
import Form from "../pages/form/."
import Orders from "../pages/orders/."
import NotFound from "../components/not-found/."

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
        element: <Register />,
    },
]);

export default router