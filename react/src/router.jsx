import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import { DefaultLayout } from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";

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
                element: <Dashboard/>
            }
        ]
    }
    
   
]);

export default router;