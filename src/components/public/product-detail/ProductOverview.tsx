import React from "react";
import { Star } from "lucide-react";

interface Props {
    product: any;
    selectedImage: string;
    onSelectImage: (img: string) => void;
    selectedVariants: Record<string, string>;
    onVariantChange: (name: string, val: string) => void;
    quantity?: number;
    onQuantityChange?: (qty: number) => void;
    onAddToCart: () => void;
    added: boolean;
    storeSlug?: string;
}

export const ProductOverview: React.FC<Props> = ({
    product,
    selectedImage,
    onSelectImage,
    selectedVariants,
    onVariantChange,
    onAddToCart,
    added,
}) => {
    const isOutOfStock = product?.stock <= 0;
    const images: string[] =
        Array.isArray(product?.images) && product.images.length > 0 ? product.images : selectedImage ? [selectedImage] : [];

    const activeImage = selectedImage || images[0] || "";
    const hasCustomVariants = product?.variants && Array.isArray(product.variants) && product.variants.length > 0;

    return (
        <div className="max-sm:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Gallery (Thumbnails + Main Image) */}
                <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="flex sm:flex-col gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 w-full sm:w-20 md:w-24 max-h-137.5 no-scrollbar">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => onSelectImage(img)}
                                    className={`w-16 sm:w-full aspect-4/5 overflow-hidden shrink-0 transition cursor-pointer ${
                                        activeImage !== img && "opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover object-top" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Main Image */}
                    <div className="flex-1 w-full aspect-4/5 max-h-150 bg-neutral-100 overflow-hidden border border-neutral-100 flex items-center justify-center">
                        {activeImage && <img src={activeImage} alt={product.name} className="w-full h-full object-cover object-top" />}
                    </div>
                </div>

                {/* Right Column: Product Information */}
                <div className="lg:col-span-5 flex flex-col justify-start">
                    {/* Title */}
                    <h1 className="text-2xl sm:text-2xl">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mt-2.5">
                        <div className="flex items-center gap-0.5 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <Star className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <span className="text-xs text-neutral-500 font-sans ml-1">(122)</span>
                    </div>

                    {/* Price */}
                    <div className="mt-5 flex items-center gap-3">
                        <span className="text-3xl font-medium text-neutral-900 font-sans">
                            ${Number(product.price).toFixed(2).replace(/\.00$/, "")}
                        </span>
                        {product.compare_at_price && Number(product.compare_at_price) > Number(product.price) && (
                            <span className="text-lg font-sans text-neutral-400 line-through">
                                ${Number(product.compare_at_price).toFixed(2).replace(/\.00$/, "")}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-5 font-normal">
                        {product.description ||
                            "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment."}
                    </p>

                    {/* Variants / Size selection */}
                    {hasCustomVariants && (
                        <div className="space-y-5 mt-6">
                            {product.variants.map((v: any) => (
                                <div key={v.name} className="space-y-3">
                                    <p className="text-sm text-neutral-800">{v.name}</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {v.options.map((opt: string) => {
                                            const isSelected = selectedVariants[v.name] === opt;
                                            return (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => onVariantChange(v.name, opt)}
                                                    className={`min-w-10 sm:min-w-11 h-10 sm:h-11 px-4 text-xs sm:text-sm flex items-center justify-center border transition cursor-pointer ${
                                                        isSelected
                                                            ? "border-(--store-accent) bg-(--store-accent-light) text-(--store-accent) font-medium"
                                                            : "border-neutral-200 bg-neutral-100/80 text-neutral-700 hover:border-neutral-300"
                                                    }`}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <div className="mt-9">
                        <button
                            type="button"
                            onClick={onAddToCart}
                            disabled={isOutOfStock}
                            className="w-full px-8 py-3.5 store-accent-btn text-xs font-semibold uppercase tracking-wider transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isOutOfStock ? "Out of Stock" : added ? "Added to Cart!" : "ADD TO CART"}
                        </button>
                    </div>

                    {/* Divider Line */}
                    <hr className="mb-7 mt-9 border-neutral-200" />

                    {/* Policy / Trust Bullet points */}
                    <div className="space-y-2 text-xs text-neutral-500">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
