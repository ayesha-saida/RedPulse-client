import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import SearchDonors from "../Pages/Search for Donors/SearchDonors";
import UsersManagement from "../Pages/Dashboard/Admin Dashboard/UsersManagement";
import Profile from "../Pages/Dashboard/Profile";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest";
import MyDonationRequest from "../Pages/Dashboard/MyDonationRequest";
import PrivateRouter from "./PrivateRouter";
import DonationDetails from "../Pages/Dashboard/DonationDetails";
import AllBloodDonationRequest from "../Pages/Dashboard/Admin Dashboard/AllBloodDonationRequest";
import AdminRoute from "./AdminRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import DonorForbiddenRoute from "./DonorForbiddenRoute";
import Funding from "../Pages/Funding/Funding";
import Donate from "../Pages/Donate/Donate";
import SuccessPage from "../Pages/Donate/SuccessPage";
import FailedPage from "../Pages/Donate/FailedPage";
import DonateLayout from "../layouts/DonateLayout";
import ErrorPage from "../Pages/ErrorPage";
import DonationRequest from "../Pages/Pending Donation/DonationRequest";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout /> ,
    children: [
        {
            path: '/',
            element: <Home /> 
        },
        {
            path: 'search',
            element: <SearchDonors /> 
        },
        {
            path: 'funding',
            element: <PrivateRouter> <Funding /> </PrivateRouter>
        },
        {
            path: 'blood-donation-request',
            element: <DonationRequest /> 
        },
        { /* Contrubution  funding route */
            path: 'contribute',
            element: <DonateLayout />,
            children: [
                {
                    path:'',
                    element: <Donate />
                },
                {
                    path:'success',
                    element: <PrivateRouter> <SuccessPage /> </PrivateRouter>
                },
                {
                    path:'cancel',
                    element: <PrivateRouter> <FailedPage /> </PrivateRouter>
                },
            ]
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
    element: <PrivateRouter> <DashboardLayout /> </PrivateRouter>  ,
    children: [
        {
        index: true,
        Component: DashboardHome
        },
        {
            path: 'all-users',
            element: <AdminRoute>  <UsersManagement /> </AdminRoute>
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
            element: <DonorForbiddenRoute>  <AllBloodDonationRequest /> </DonorForbiddenRoute>
        } ,

    ]
  },
    {
    path: "/*",
    element:<ErrorPage> </ErrorPage>
    },
]);