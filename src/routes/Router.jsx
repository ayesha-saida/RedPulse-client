import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import SearchDonors from "../Pages/Search for Donors/SearchDonors";
import UsersManagement from "../Pages/Dashboard/UsersManagement";
import Profile from "../Pages/Dashboard/Profile";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import MyDonationRequest from "../Pages/Dashboard/MyDonationRequest";
import PrivateRouter from "./PrivateRouter";
import DonationDetails from "../Pages/Dashboard/DonationDetails";
import AllBloodDonationRequest from "../Pages/Dashboard/Admin Dashboard/AllBloodDonationRequest";


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
            element: <SearchDonors /> 
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
        } ,
        {
            path: 'profile',
            element: <PrivateRouter> <Profile />  </PrivateRouter>
        } ,
        {
            path: 'create-donation-request',
            element: <PrivateRouter> <CreateDonationRequest /> </PrivateRouter>
        } ,
        {
            path: 'my-donation-requests',
            element:  <MyDonationRequest /> 
        } ,
        {
            path: 'donation-requests/:id',
            element: <PrivateRouter> <DonationDetails /> </PrivateRouter>
        } ,
        {
            path: 'all-blood-donation-request',
            element:  <AllBloodDonationRequest /> 
        } ,

    ]
  },
]);