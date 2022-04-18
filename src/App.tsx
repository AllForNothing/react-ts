import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import  ShellPage  from "./pages/ShellPage";
import { RouteObject } from "react-router/lib/router";
import  RequireAuth  from "./services/guards/RequireAuth";
import SignInGuard from "./services/guards/SignInGuard";

const LoginPage = lazy(() => import('./pages/Login'))

const routes: RouteObject[] = [
    {
        element: <RequireAuth />,
        path: "/",
        children: [
            {
                element: <ShellPage/>,
                path: "harbor",
                index: true
            },
            {
                element: <Navigate to="harbor" replace={true}/>,
                index: true
            }
        ]
    },
    {
        element: <SignInGuard/>,
        path: "/login",
        children: [
            {
                element: <LoginPage/>,
                index: true
            }
        ]
    },
];

function App() {
    return useRoutes(routes)
}

export default App;
