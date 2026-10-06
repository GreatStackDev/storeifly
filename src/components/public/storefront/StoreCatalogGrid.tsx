import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { ProductCard } from "../../common/ProductCard";

interface Props {
    products: any[];
    storeSlug: string;
    onQuickAdd: (e: React.MouseEvent, p: any) => void;
    addedId: number | null;
}

export const StoreCatalogGrid: React.FC<Props> = ({ products, storeSlug, onQuickAdd, addedId }) => (
    <div id="catalog-section" className="w-full scroll-mt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 xl:mb-14">
            <h2 className="text-2xl xl:text-3xl text-neutral-900">Featured Products</h2>
            <Link
                to={`/store/${storeSlug}/products`}
                className="inline-flex items-center gap-1.5 text-xs font-medium store-accent-pill px-3.5 py-1.5 rounded-full transition hover:opacity-90"
            >
                View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50">
                <ShoppingBag className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-neutral-900">No products available</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Check back soon for new arrivals.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.slice(0, 8).map((p) => (
                    <ProductCard key={p.id} product={p} storeSlug={storeSlug} onQuickAdd={onQuickAdd} isAdded={addedId === p.id} />
                ))}
            </div>
        )}
    </div>
);
