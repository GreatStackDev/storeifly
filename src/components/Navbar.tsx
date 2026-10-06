import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, LogOut, LayoutDashboard, Plus } from "lucide-react";

export const Navbar: React.FC = () => {
    const { user, store, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        if (user?.role === "customer") {
            navigate("/");
        } else if (user?.role === "admin") {
            navigate("/admin/login");
        } else {
            navigate("/merchant/login");
        }
    };

    return (
        <header className="border-b border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 font-sans">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-neutral-900 hover:opacity-80 transition">
                    <img src="/logo.svg" alt="logo" className="size-7" />
                    <span className="font-medium text-2xl">StoreiFly</span>
                </Link>

                <nav className="flex items-center gap-2">
                    {user ? (
                        <>
                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-full transition"
                                >
                                    Platform Admin
                                </Link>
                            )}

                            {user.role === "merchant" &&
                                (store ? (
                                    <>
                                        <Link
                                            to={`/store/${store.slug}`}
                                            target="_blank"
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded-full transition"
                                            title="View Live Store"
                                        >
                                            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" /> Live Store
                                        </Link>
                                        <Link
                                            to="/merchant"
                                            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-full transition"
                                        >
                                            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        to="/merchant/store-setup"
                                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Create Store
                                    </Link>
                                ))}

                            {user.role === "customer" && (
                                <>
                                    {store && (
                                        <Link
                                            to={`/store/${store.slug}/orders`}
                                            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200/80 rounded-full transition"
                                        >
                                            My Orders
                                        </Link>
                                    )}
                                    <Link
                                        to={store ? "/merchant" : "/merchant/store-setup"}
                                        className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-full transition"
                                    >
                                        Start a store
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-neutral-900 px-3 py-1.5 rounded-full transition cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" /> Exit
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/merchant/login"
                                className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-3.5 py-2 rounded-full hover:bg-neutral-50 transition"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/merchant/register"
                                className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-full transition"
                            >
                                Start a store
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};
