import React from "react";
import { Navigate } from "react-router-dom";
import { AuthCard } from "../../components/common/AuthCard";
import { useAuth } from "../../context/AuthContext";

export const AdminLogin: React.FC = () => {
    const { user } = useAuth();
    if (user?.role === "admin") {
        return <Navigate to="/admin" replace />;
    }
    return (
        <div className="min-h-screen bg-neutral-50/60 text-neutral-900 flex flex-col justify-center items-center p-4 font-sans">
            <AuthCard role="admin" allowRegister={false} />
        </div>
    );
};
