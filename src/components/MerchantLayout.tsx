import React from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Package, FolderTree, ShoppingBag, Settings, ExternalLink, LogOut, AlertCircle } from "lucide-react";

const NAV = [
    { name: "Overview", path: "/merchant", icon: LayoutDashboard },
    { name: "Products", path: "/merchant/products", icon: Package },
    { name: "Categories", path: "/merchant/categories", icon: FolderTree },
    { name: "Orders", path: "/merchant/orders", icon: ShoppingBag },
    { name: "Settings", path: "/merchant/settings", icon: Settings },
];

export const MerchantLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, store, logout, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-neutral-400 text-xs font-mono">
                Loading merchant portal...
            </div>
        );
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    if (!user || user.role !== "merchant") return <Navigate to="/merchant/login" replace />;

    return (
        <div className="min-h-screen bg-neutral-50/70 text-neutral-900 flex flex-col md:flex-row font-sans">
            <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 bg-neutral-950 text-white flex flex-col justify-between shrink-0 border-r border-neutral-800 z-30">
                <div className="flex-1 overflow-y-auto">
                    {/* Brand */}
                    <div className="h-16 px-6 border-b border-neutral-800 flex items-center">
                        <Link to="/" className="flex items-center gap-2.5">
                            <img src="/logo.svg" alt="logo" className="size-6" />
                            <p className="font-medium tracking-wide text-white">Storeifly</p>
                        </Link>
                    </div>

                    {/* Store Card */}
                    <div className="p-3 my-3.5 bg-neutral-900/90 border border-neutral-800">
                        {store ? (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-medium text-xs text-white truncate">{store.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full shrink-0 bg-white/10 ">
                                            {store.status}
                                        </span>
                                        <Link to={`/store/${store.slug}`} target="_blank">
                                            <ExternalLink className="w-2.5 h-2.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-xs text-neutral-300 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Store setup required
                                </p>
                                <Link
                                    to="/merchant/store-setup"
                                    className="block text-center text-xs font-medium bg-emerald-600 text-white py-1.5 rounded-full hover:bg-emerald-700 transition"
                                >
                                    Setup Store
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Nav */}
                    <nav className="py-3 space-y-1">
                        {NAV.map(({ name, path, icon: Icon }) => {
                            const active = path === "/merchant" ? location.pathname === "/merchant" : location.pathname.startsWith(path);
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

                <div className="flex items-center justify-between p-4 border-t border-neutral-800 shrink-0">
                    <div className="truncate">
                        <p className="text-xs font-medium text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono truncate">{user.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate("/merchant/login");
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
