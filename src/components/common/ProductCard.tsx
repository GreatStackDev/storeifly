import React from "react";
import { Link } from "react-router-dom";
import { Check, PlusIcon } from "lucide-react";

export interface ProductCardItem {
    id: number | string;
    name: string;
    price: number | string;
    compare_at_price?: number | string | null;
    images?: string[];
    category_name?: string;
    stock?: number;
    [key: string]: any;
}

interface Props {
    product: ProductCardItem;
    storeSlug: string;
    onQuickAdd?: (e: React.MouseEvent, product: ProductCardItem) => void;
    isAdded?: boolean;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, storeSlug, onQuickAdd, isAdded = false, className = "" }) => {
    const isOutOfStock = product.stock !== undefined && product.stock <= 0;
    const hasDiscount = product.compare_at_price && Number(product.compare_at_price) > Number(product.price);

    return (
        <Link
            to={`/store/${storeSlug}/products/${product.id}`}
            className={`group bg-white rounded-lg border border-neutral-200 overflow-hidden hover:border-neutral-300 transition flex flex-col justify-between ${className}`}
        >
            {/* Image */}
            <div className="aspect-square bg-neutral-50 relative overflow-hidden">
                {product.images?.[0] && (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                    />
                )}
                {hasDiscount && (
                    <span className="absolute top-2.5 left-2.5 store-accent-btn text-[10px] font-mono font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Sale
                    </span>
                )}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-neutral-900 text-[10px] font-medium uppercase tracking-wider px-3 py-1 border border-neutral-300 bg-white rounded-full">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    {product.category_name && (
                        <span className="text-[11px] text-neutral-500/75 uppercase tracking-wider block mb-1">{product.category_name}</span>
                    )}
                    <h3 className="font-medium text-sm text-neutral-900 truncate group-hover:text-(--store-accent) transition">
                        {product.name}
                    </h3>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-medium text-sm text-neutral-900 font-mono">${Number(product.price).toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="text-xs text-neutral-400 line-through font-mono">
                                ${Number(product.compare_at_price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    {onQuickAdd && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickAdd(e, product);
                            }}
                            disabled={isOutOfStock}
                            title={isOutOfStock ? "Out of stock" : "Add to Cart"}
                            className={`size-8 rounded-full flex items-center justify-center text-xs transition cursor-pointer ${
                                isOutOfStock
                                    ? "text-neutral-300 bg-neutral-100 cursor-not-allowed"
                                    : isAdded
                                      ? "store-accent-btn"
                                      : "text-neutral-700 bg-neutral-100 hover:bg-(--store-accent) hover:text-(--store-accent-contrast)"
                            }`}
                        >
                            {isAdded ? <Check className="size-4.5" /> : <PlusIcon className="size-4.5" />}
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
};
