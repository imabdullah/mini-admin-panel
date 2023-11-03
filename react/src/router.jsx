import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { DefaultLayout } from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Company from "./views/Company.jsx";
import CompanyForm from "./views/CompanyForm.jsx";

const router = createBrowserRouter([

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/companies',
                element: <Company />,
            },
            {
                path: '/companies/new',
                element: <CompanyForm key="companyCreate" />
            },
            {
                path: '/companies/:id',
                element: <CompanyForm key="companyUpdate" />
            }
        ]
    }


]);

export default router;