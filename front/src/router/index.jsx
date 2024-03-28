
import { createBrowserRouter } from "react-router-dom";

import App from '../App.jsx';

import Index from "../components/main/."
import Login from "../components/login/."
import Register from "../components/register/."
import Form from "../components/form/."
import Orders from "../components/orders/."

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
        ],
    },
]);

export default router