import { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Page404 } from "../pages/page-404/Page404";
import { Login } from "../pages/auth/signIn/Login";
import { Register } from "../pages/auth/signUp/Register";
import { PrivateRoute } from "../components/private_route/PrivateRoute";
import { Test } from "../pages/test/Test";
import { MainLayout } from "../components/ui/layout/MainLayout";
import { Account } from "../pages/auth/account/Account";
import { AccountSetting } from "../pages/auth/account/AccountSetting";
import { Chat } from "../pages/chat/Chat";
import { Profile } from "../pages/profile/Profile";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "home", element: <Home /> },
        {
          path: "chat",
          element: (
            <PrivateRoute component={Chat} rest={{ location: "/chat" }} />
          ),
        },
        { path: "profile/:userId", element: <Profile /> },
        {
          path: "account",
          children: [
            { element: <Navigate to="account/account" />, index: "true" },
            {
              path: "account",
              element: (
                <PrivateRoute
                  component={Account}
                  rest={{ location: "/account" }}
                />
              ),
            },
            {
              path: "setting",
              element: (
                <PrivateRoute
                  component={AccountSetting}
                  rest={{ location: "/account/setting" }}
                />
              ),
            },
          ],
        },
        { path: "test", element: <Test /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    // { path: "pov/create", element: <PrivateRoute component={CreatePoV} /> },
    // { path: "pov/edit/:povId", element: <PovEdit /> },
    { path: "signin", element: <Login /> },
    { path: "signup", element: <Register /> },

    { path: "404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to={"/404"} replace />,
    },
  ]);
};
