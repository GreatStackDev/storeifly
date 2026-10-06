import React from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store, Users, LogOut, BarChart3 } from "lucide-react";
import { Spinner } from "./common/Spinner";

const NAV = [
    { name: "Overview", path: "/admin", icon: BarChart3 },
    { name: "Stores", path: "/admin/stores", icon: Store },
    { name: "Merchants", path: "/admin/merchants", icon: Users },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, logout, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (loading) return <Spinner fullScreen />;
    if (!user || user.role !== "admin") return <Navigate to="/admin/login" replace />;

    return (
        <div className="min-h-screen bg-neutral-50/70 text-neutral-900 flex flex-col md:flex-row font-sans">
            <aside className="w-full md:w-60 bg-neutral-950 text-white flex flex-col justify-between shrink-0 border-r border-neutral-800">
                <div>
                    <div className="h-16 px-6 border-b border-neutral-800 flex items-center gap-2.5">
                        <img src="/logo.svg" alt="StoreiFly" className="size-6" />
                        <p className="font-medium text-lg text-white">StoreiFly</p>
                    </div>
                    <nav className="py-3 space-y-1">
                        {NAV.map(({ name, path, icon: Icon }) => {
                            const active = path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);
                            return (
                                <Link
                                    key={name}
                                    to={path}
                                    className={`flex items-center gap-2.5 px-4.5 py-2.5 text-xs font-medium transition ${active ? "bg-emerald-600 text-white" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"}`}
                                >
                                    <Icon className="w-3.5 h-3.5" /> {name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex items-center justify-between p-4 border-t border-neutral-800">
                    <div className="truncate">
                        <p className="text-xs font-medium text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono truncate">{user.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate("/admin/login");
                        }}
                        className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-full transition cursor-pointer"
                        title="Sign Out"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
                <div className="max-w-5xl mx-auto">{children}</div>
            </main>
        </div>
    );
};
