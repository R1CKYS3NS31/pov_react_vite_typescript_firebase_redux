import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Layout from "../components/layout/Layout";

const HomePage = lazy(() => import("../pages/home/Home"));
const AccountPage = lazy(() => import("../pages/account/Account"));
const SignupPage = lazy(() => import("../pages/auth/Signup"));
const SignInPage = lazy(() => import("../pages/auth/SignIn"));
const ProfilePage = lazy(() => import("../pages/profile/Profile"));
const NotFoundPage = lazy(() => import("../pages/404/NotFound"));

export const AppRoutes: React.FC = () => {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/account", element: <AccountPage /> },
        { path: "/profile/:id", element: <ProfilePage /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/signin", element: <SignInPage /> },
        { path: "*", element: <NotFoundPage /> },
      ]
    },
  ]);
};