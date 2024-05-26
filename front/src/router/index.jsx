
import { createBrowserRouter } from "react-router-dom";

import App from '../App.jsx';

import Login from "../components/login/."
import Register from "../components/register/."
import Index from "../components/main/."
import ProducView from "../components/product-view/."
import SearchPanel from "../components/search/."
import Form from "../components/form/."
import Orders from "../components/orders/."
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
            }, {
                path: "/products/:id",
                element: <ProducView />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
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
]);



export default router