import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DUMMY_STORES } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { StoreNavbar } from "../../components/StoreNavbar";
import { AuthCard } from "../../components/common/AuthCard";
import { getStoreAccentStyles } from "../../utils/storeAccent";

export const CustomerAuth: React.FC = () => {
    const { storeSlug } = useParams<{ storeSlug: string }>();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [store, setStore] = useState<any>(null);

    useEffect(() => {
        if (storeSlug) {
            const foundStore = DUMMY_STORES.find((s) => s.slug === storeSlug) || DUMMY_STORES[0];
            setStore(foundStore);
        }
    }, [storeSlug]);

    // If customer is already authenticated, redirect to store homepage
    useEffect(() => {
        if (!authLoading && user && storeSlug) {
            navigate(`/store/${storeSlug}`, { replace: true });
        }
    }, [user, authLoading, storeSlug, navigate]);

    return (
        <div
            className="min-h-screen bg-neutral-50/60 text-neutral-900 flex flex-col font-sans"
            style={getStoreAccentStyles(store?.accent_color)}
        >
            {store && <StoreNavbar store={store} />}

            <main className="max-w-md mx-auto px-4 py-12 sm:py-16 w-full flex-1 flex flex-col justify-center items-center">
                <AuthCard role="customer" allowRegister={true} storeId={store?.id} storeSlug={storeSlug} />
            </main>
        </div>
    );
};
