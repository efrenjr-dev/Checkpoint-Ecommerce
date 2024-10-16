import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ViewOrder from "./pages/ViewOrder";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

let router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/addproduct",
                element: <AddProduct />,
            },
            {
                path: "/product/:productId",
                element: <ViewProduct />,
            },
            {
                path: "/updateproduct/:productId",
                element: <UpdateProduct />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
            {
                path: "/order/:orderId",
                element: <ViewOrder />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
        ],
    },
]);

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
