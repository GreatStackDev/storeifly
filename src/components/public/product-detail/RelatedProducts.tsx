import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard, type ProductCardItem } from "../../common/ProductCard";

interface RelatedProductsProps {
    products: ProductCardItem[];
    storeSlug: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, storeSlug }) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="mt-14 sm:mt-16 pt-8 border-t border-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl text-neutral-900">Related Pieces</h3>

                <Link
                    to={`/store/${storeSlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-xs text-neutral-900 transition"
                >
                    <span>Full Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                </Link>
            </div>

            {/* Product Grid using shared ProductCard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} storeSlug={storeSlug} />
                ))}
            </div>
        </section>
    );
};
