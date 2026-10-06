import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { DUMMY_STORES, DUMMY_PRODUCTS } from "../../assets/assets";
import { StoreNavbar } from "../../components/StoreNavbar";
import { StoreFooter } from "../../components/StoreFooter";
import { ProductCard, type ProductCardItem } from "../../components/common/ProductCard";
import { useCart } from "../../context/CartContext";
import { Search, X, ChevronRight, ShoppingBag, ArrowUpDown } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";
import { getStoreAccentStyles } from "../../utils/storeAccent";

const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];

export const AllProducts: React.FC = () => {
    const { storeSlug } = useParams<{ storeSlug: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const { setStoreSlug, addToCart } = useCart();

    const [store, setStore] = useState<any>(null);

    const [products, setProducts] = useState<ProductCardItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addedId, setAddedId] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");

    useEffect(() => {
        if (storeSlug) {
            setStoreSlug(storeSlug);
            fetchInitialData(storeSlug);
        }
    }, [storeSlug]);

    const fetchInitialData = (slug: string) => {
        setLoading(true);
        setError(null);
        const currentStore = DUMMY_STORES.find((s) => s.slug === slug);
        if (!currentStore) {
            setError("Failed to load store products");
            setLoading(false);
            return;
        }
        setStore(currentStore);
        const storeProducts = DUMMY_PRODUCTS.filter((p) => p.store_slug === slug && p.status === "active");
        setProducts(storeProducts);
        setLoading(false);
    };

    useEffect(() => {
        const params: Record<string, string> = {};
        if (searchQuery.trim()) params.q = searchQuery.trim();
        if (sortBy !== "featured") params.sort = sortBy;
        setSearchParams(params, { replace: true });
    }, [searchQuery, sortBy, setSearchParams]);

    const handleQuickAdd = (e: React.MouseEvent, p: ProductCardItem) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            productId: Number(p.id),
            name: p.name,
            price: Number(p.price),
            image: p.images?.[0],
            quantity: 1,
            variant: p.variants?.length ? `${p.variants[0].name}: ${p.variants[0].options[0]}` : undefined,
            stock: p.stock ?? 0,
        });
        setAddedId(Number(p.id));
        setTimeout(() => setAddedId(null), 1500);
    };

    const filteredProducts = useMemo(() => {
        let list = [...products];

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter(
                (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q),
            );
        }

        switch (sortBy) {
            case "price-asc":
                list.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "price-desc":
                list.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "name-asc":
                list.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                list.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "newest":
                list.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
                break;
        }

        return list;
    }, [products, searchQuery, sortBy]);

    if (loading) return <Spinner fullScreen />;

    if (error || !store) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
                <ShoppingBag className="w-8 h-8 text-neutral-400 mb-2" />
                <h1 className="text-base font-semibold text-neutral-900 mb-1">Catalog Unavailable</h1>
                <p className="text-xs text-neutral-500 max-w-sm mb-4">{error || "Store products could not be loaded."}</p>
                <Link to="/" className="px-4 py-2 store-accent-btn text-xs font-medium rounded-full transition">
                    Return to StoreiFly
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans" style={getStoreAccentStyles(store?.accent_color)}>
            <StoreNavbar store={store} />

            {/* Header */}
            <div className="border-b border-neutral-100 bg-neutral-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-3">
                        <Link to={`/store/${store.slug}`} className="hover:text-neutral-900 transition">
                            Home
                        </Link>
                        <ChevronRight className="w-3 h-3 text-neutral-300" />
                        <span className="text-neutral-900 font-medium">All Products</span>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl tracking-tight text-neutral-900">All Products</h1>
                            <p className="text-xs text-neutral-500 mt-1 max-w-xl">Browse the complete curated catalog from {store.name}.</p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
                {/* Search & Sort */}
                <div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-3 mb-6">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2 text-xs border border-neutral-200 rounded-full focus:outline-none focus:border-(--store-accent) focus:ring-1 focus:ring-(--store-accent-ring) bg-neutral-50/50"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-full px-3 py-2 text-xs self-start sm:self-auto">
                        <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-neutral-700 text-xs font-medium focus:outline-none cursor-pointer"
                        >
                            {SORT_OPTIONS.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-start sm:gap-6 xl:mb-40">
                        {filteredProducts.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                storeSlug={store.slug}
                                onQuickAdd={handleQuickAdd}
                                isAdded={addedId === Number(p.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 xl:py-32 text-center flex flex-col items-center justify-center">
                        <h2 className="text-sm font-medium text-neutral-900 mb-1">No products found</h2>
                        <p className="text-xs text-neutral-500 max-w-xs">Try a different search term or browse all categories.</p>
                    </div>
                )}
            </main>

            <StoreFooter store={store} />
        </div>
    );
};
