import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import Layout from "./layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/details/:type/:id",
                element: <Details />,
            },
        ],
    },
]);