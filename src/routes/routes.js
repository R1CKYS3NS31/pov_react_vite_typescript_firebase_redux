import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Page404 } from "../pages/page-404/Page404";
import { CreatePoV } from "../components/home/CreatePoV";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    // {
    //   children: [
    //     { element: <Navigate to="/" />, index: true },
    //     { path: "/home", element: <Home /> },
    //     { path: "404", element: <Page404 /> },
    //     { path: "*", element: <Navigate to="/404" replace /> },
    //   ],
    // },
    { path: "/create", element: <CreatePoV /> },
    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to={"/404"} replace />,
    },
  ]);
};
