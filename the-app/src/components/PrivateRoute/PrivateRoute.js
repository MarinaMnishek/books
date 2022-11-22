import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ authed }) =>
    authed ? <Outlet /> : <Navigate to="/LogIn" />
