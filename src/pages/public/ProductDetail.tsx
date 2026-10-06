import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DUMMY_STORES, DUMMY_PRODUCTS } from "../../assets/assets";
import { StoreNavbar } from "../../components/StoreNavbar";
import { StoreFooter } from "../../components/StoreFooter";
import { useCart } from "../../context/CartContext";
import { ArrowLeft, AlertCircle, Mail } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { ProductOverview } from "../../components/public/product-detail/ProductOverview";
import { ProductSpecs } from "../../components/public/product-detail/ProductSpecs";
import { ProductReviews } from "../../components/public/product-detail/ProductReviews";
import { RelatedProducts } from "../../components/public/product-detail/RelatedProducts";
import { getStoreAccentStyles } from "../../utils/storeAccent";

export const ProductDetail: React.FC = () => {
    const { storeSlug, productId } = useParams<{ storeSlug: string; productId: string }>();
    const { addToCart, setStoreSlug } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState<any>(null);
    const [store, setStore] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (storeSlug) setStoreSlug(storeSlug);
        fetchProduct();
    }, [productId, storeSlug]);

    const fetchProduct = () => {
        setLoading(true);
        const currentStore = DUMMY_STORES.find((s) => s.slug === storeSlug);
        const currentProd = DUMMY_PRODUCTS.find(
            (p) => String(p.id) === String(productId) || (storeSlug && p.store_slug === storeSlug && String(p.id) === String(productId))
        );

        if (currentStore) setStore(currentStore);
        if (currentProd) {
            setProduct(currentProd);
            setSelectedImage(currentProd.images?.[0] ?? "");

            const defaults: Record<string, string> = {};
            currentProd.variants?.forEach((v: any) => {
                if (v.name && v.options?.length) defaults[v.name] = v.options[0];
            });
            setSelectedVariants(defaults);

            const related = DUMMY_PRODUCTS.filter(
                (p) => p.store_slug === currentProd.store_slug && String(p.id) !== String(currentProd.id)
            ).slice(0, 4);
            setRelatedProducts(related);
        } else {
            toast.error("Failed to load product");
        }
        setLoading(false);
    };

    const handleAddToCart = () => {
        if (!product) return;
        const variant =
            Object.entries(selectedVariants)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" / ") || undefined;
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: selectedImage || product.images?.[0],
            quantity,
            variant,
            stock: product.stock,
        });
        setAdded(true);
        toast.success(`Added ${quantity} to cart!`);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return <Spinner fullScreen />;

    if (!product)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
                <AlertCircle className="w-10 h-10 text-neutral-400 mb-3" />
                <h2 className="text-base font-semibold text-neutral-900">Product not found</h2>
                <Link
                    to={`/store/${storeSlug}`}
                    className="mt-4 px-3.5 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-black transition"
                >
                    Back to Store
                </Link>
            </div>
        );

    return (
        <div
            className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans"
            style={getStoreAccentStyles(store?.accent_color)}
        >
            {store && <StoreNavbar store={store} />}

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
                <button
                    onClick={() => navigate(`/store/${storeSlug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
                </button>

                <ProductOverview
                    product={product}
                    selectedImage={selectedImage}
                    onSelectImage={setSelectedImage}
                    selectedVariants={selectedVariants}
                    onVariantChange={(name, val) => setSelectedVariants((p) => ({ ...p, [name]: val }))}
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    onAddToCart={handleAddToCart}
                    added={added}
                    storeSlug={storeSlug || ""}
                />

                <ProductSpecs />
                <ProductReviews />
                <RelatedProducts products={relatedProducts} storeSlug={storeSlug || ""} />

                <div className="mt-14 bg-neutral-50 rounded-3xl sm:rounded-4xl border border-neutral-200 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h4 className="text-xl sm:text-2xl text-neutral-900">Need sizing assistance or a custom order?</h4>
                        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg leading-relaxed">
                            Our team is available for specifications, bespoke variations, and corporate gifting.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => toast.success("Our team will assist you shortly.")}
                        className="px-9 py-3 bg-black hover:bg-neutral-800 text-white text-sm font-medium rounded-full transition flex items-center gap-2 shrink-0 cursor-pointer"
                    >
                        <Mail className="w-3.5 h-3.5" /> Inquire with Studio
                    </button>
                </div>
            </main>

            {store && <StoreFooter store={store} />}
        </div>
    );
};
