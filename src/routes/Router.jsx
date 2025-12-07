import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../layouts/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout /> ,
    children: [
        {
            path: 'home',
            element: <Home></Home>,
        }

    ]
  },
  {
    path: "/",
    element:  <AuthLayout />,
    children: [
        {
            path: 'Signup',
            element:<SignUp> </SignUp> 
        },
        {
            path: 'Signin',
            element: <SignIn> </SignIn> 
        },

    ]
  },
  {
    path: "/",
    element: <Dashboard /> ,
    children: [
        {
           
        }

    ]
  },
]);