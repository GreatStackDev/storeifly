import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DUMMY_STORES, DUMMY_PRODUCTS } from "../../assets/assets";
import { Spinner } from "../../components/common/Spinner";
import { StoreNavbar } from "../../components/StoreNavbar";
import { StoreFooter } from "../../components/StoreFooter";
import { useCart } from "../../context/CartContext";
import { AlertCircle } from "lucide-react";
import { StoreHeroBanner } from "../../components/public/storefront/StoreHeroBanner";
import { StoreCatalogGrid } from "../../components/public/storefront/StoreCatalogGrid";
import { StoreTestimonials } from "../../components/public/storefront/StoreTestimonials";
import { StoreFaq } from "../../components/public/storefront/StoreFaq";
import { LandingCta } from "../../components/public/landing/LandingCta";
import { getStoreAccentStyles } from "../../utils/storeAccent";

export const Storefront: React.FC = () => {
    const { storeSlug } = useParams<{ storeSlug: string }>();
    const { setStoreSlug, addToCart } = useCart();

    const [store, setStore] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addedId, setAddedId] = useState<number | null>(null);

    useEffect(() => {
        if (storeSlug) {
            setStoreSlug(storeSlug);
            fetchStoreData(storeSlug);
        }
    }, [storeSlug]);

    const fetchStoreData = (slug: string) => {
        setLoading(true);
        setError(null);
        const currentStore = DUMMY_STORES.find((s) => s.slug === slug);
        if (!currentStore) {
            setError("This store could not be found.");
            setLoading(false);
            return;
        }
        const storeProducts = DUMMY_PRODUCTS.filter((p) => p.store_slug === slug && p.status === "active");
        setStore(currentStore);
        setProducts(storeProducts);
        setLoading(false);
    };

    const handleQuickAdd = (e: React.MouseEvent, p: any) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            productId: p.id,
            name:      p.name,
            price:     Number(p.price),
            image:     p.images?.[0],
            quantity:  1,
            variant:   p.variants?.length ? `${p.variants[0].name}: ${p.variants[0].options[0]}` : undefined,
            stock:     p.stock,
        });
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    if (loading) return <Spinner fullScreen />;

    if (error || !store) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
                <AlertCircle className="w-8 h-8 text-neutral-400 mb-2" />
                <h1 className="text-base font-semibold text-neutral-900 mb-1">Store Unavailable</h1>
                <p className="text-xs text-neutral-500 max-w-sm mb-4">{error || "This store could not be found."}</p>
                <Link to="/" className="px-3.5 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-black transition">
                    Return to StoreiFly
                </Link>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans"
            style={getStoreAccentStyles(store?.accent_color)}
        >
            <StoreNavbar store={store} />
            <StoreHeroBanner store={store} />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
                <StoreCatalogGrid
                    products={products}
                    storeSlug={storeSlug || ""}
                    onQuickAdd={handleQuickAdd}
                    addedId={addedId}
                />

                <StoreTestimonials />

                <StoreFaq />

                <LandingCta />
            </main>

            <StoreFooter store={store} />
        </div>
    );
};
