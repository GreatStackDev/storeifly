import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type User } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Array<User["role"]>;
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles = ["merchant"],
    redirectTo = "/merchant/login",
}) => {
    const { user, store, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-neutral-400 text-xs font-mono">
                Authenticating...
            </div>
        );
    }

    if (!user) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Admins cannot become merchants or access merchant portal routes
    if (user.role === "admin") {
        if (!allowedRoles.includes("admin")) {
            return <Navigate to="/admin" replace />;
        }
        return <>{children}</>;
    }

    // For non-admin users: check allowed roles
    const isAllowed =
        allowedRoles.length === 0 ||
        allowedRoles.includes(user.role) ||
        (allowedRoles.includes("merchant") && (user.role === "merchant" || !!store));

    if (!isAllowed) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
