import React from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag, User as UserIcon, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

interface Props {
    store: { id?: number; name: string; slug: string; logo_url?: string; accent_color?: string };
}

export const StoreNavbar: React.FC<Props> = ({ store }) => {
    const { itemsCount } = useCart();
    const { user, logout } = useAuth();
    const { storeSlug } = useParams();
    const slug = storeSlug || store.slug;
    const isCustomer = Boolean(user);

    return (
        <header className="border-b border-neutral-100 bg-white/85 backdrop-blur-xl sticky top-0 z-40 font-sans transition">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to={`/store/${slug}`} className="flex items-center gap-3 text-neutral-900">
                        {store.logo_url && <img src={store.logo_url} alt={store.name} className="size-7 object-fill rounded-lg" />}
                        <span className="font-medium sm:text-xl text-neutral-900">{store.name}</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-4 text-xs font-normal text-neutral-600">
                        <Link
                            to={`/store/${slug}`}
                            className="hover:text-neutral-900 transition px-2.5 py-1 rounded-full hover:bg-neutral-100/60"
                        >
                            Home
                        </Link>
                        <Link
                            to={`/store/${slug}/products`}
                            className="hover:text-(--store-accent) transition px-2.5 py-1 rounded-full hover:bg-(--store-accent-light)"
                        >
                            All Products
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {isCustomer ? (
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full border store-accent-pill">
                            <Link to={`/store/${slug}/orders`} className="flex items-center gap-1.5 text-xs font-medium store-accent-text">
                                <UserIcon className="w-3.5 h-3.5 store-accent-text" />
                                <span className="hidden sm:inline">My Orders</span>
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to={`/store/${slug}/login`}
                            className="px-3.5 py-1.5 rounded-full text-xs font-normal text-neutral-600 hover:text-(--store-accent) hover:bg-(--store-accent-light) transition"
                        >
                            Sign In
                        </Link>
                    )}
                    <Link
                        to={`/store/${slug}/cart`}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition shadow-xs store-accent-btn"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" /> Cart
                        {itemsCount > 0 && (
                            <span className="bg-white text-(--store-accent) text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ml-0.5">
                                {itemsCount}
                            </span>
                        )}
                    </Link>
                    {isCustomer && (
                        <button
                            type="button"
                            onClick={logout}
                            className="p-1 text-neutral-400 hover:text-neutral-900 transition cursor-pointer"
                            title="Sign out"
                        >
                            <LogOut className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
