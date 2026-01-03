import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import Search from "../Pages/search/Search";
import UsersManagement from "../Pages/Dashboard/UsersManagement";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout /> ,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'search',
            element: <Search /> 
        },

    ]
  },
  {
    path: "/",
    element:  <AuthLayout />,
    children: [
        {
            path: 'register',
            element:<SignUp> </SignUp> 
        },
        {
            path: 'login',
            element: <SignIn> </SignIn> 
        },

    ]
  },
  {
    path: "dashboard",
    element: <DashboardLayout /> ,
    children: [
        {
            path: 'all-users',
            element: <UsersManagement /> 
        }

    ]
  },
]);