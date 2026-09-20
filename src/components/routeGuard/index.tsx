import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/" replace />;

    return <Outlet />;
}

export function GuestRoute() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (user) return <Navigate to="/home" replace />;

    return <Outlet />;
}
