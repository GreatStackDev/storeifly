import React from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { AuthCard } from "../../components/common/AuthCard";
import { useAuth } from "../../context/AuthContext";

interface MerchantLoginProps {
    initialMode?: "login" | "register";
}

export const MerchantLogin: React.FC<MerchantLoginProps> = ({ initialMode = "login" }) => {
    const { user, store } = useAuth();

    if (user) {
        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to={store ? "/merchant" : "/merchant/store-setup"} replace />;
    }

    return (
        <div className="min-h-screen bg-neutral-50/60 flex flex-col font-sans">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 py-12 sm:py-16">
                <AuthCard role="merchant" initialMode={initialMode} allowRegister={true} />
            </div>
        </div>
    );
};
