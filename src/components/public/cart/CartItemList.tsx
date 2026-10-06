import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";

interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    variant?: string;
    stock: number;
}

interface CartItemListProps {
    items: CartItem[];
    storeSlug: string;
    onUpdateQuantity: (productId: number, variant: string | undefined, change: number) => void;
    onRemoveFromCart: (productId: number, variant: string | undefined) => void;
}

export const CartItemList: React.FC<CartItemListProps> = ({ items, storeSlug, onUpdateQuantity, onRemoveFromCart }) => {
    return (
        <div className="bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden">
            {items.map((item, index) => (
                <div
                    key={`${item.productId}-${item.variant || ""}-${index}`}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 justify-between"
                >
                    <div className="flex items-center gap-4 min-w-0">
                        {/* Thumbnail */}
                        <Link
                            to={`/store/${storeSlug}/products/${item.productId}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-50 rounded-2xl overflow-hidden shrink-0 border border-neutral-200 block group"
                        >
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                            )}
                        </Link>

                        {/* Title & Variant */}
                        <div className="min-w-0 flex-1">
                            <Link
                                to={`/store/${storeSlug}/products/${item.productId}`}
                                className="text-xs sm:text-sm font-medium text-neutral-900 truncate hover:text-black block"
                            >
                                {item.name}
                            </Link>
                            {item.variant && (
                                <span className="inline-block text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full mt-1">
                                    {item.variant}
                                </span>
                            )}
                            <p className="text-xs font-mono text-neutral-500 mt-1">${item.price.toFixed(2)} each</p>
                        </div>
                    </div>

                    {/* Controls & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                        {/* Stepper Pill */}
                        <div className="inline-flex items-center border border-neutral-200 rounded-full p-1 bg-neutral-50">
                            <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.productId, item.variant, -1)}
                                className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                                title="Decrease quantity"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-semibold text-neutral-900">{item.quantity}</span>
                            <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.productId, item.variant, 1)}
                                disabled={item.quantity >= item.stock}
                                className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 transition cursor-pointer"
                                title="Increase quantity"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-17.5">
                            <p className="text-sm font-semibold font-mono text-neutral-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>

                        {/* Remove Action */}
                        <button
                            type="button"
                            onClick={() => onRemoveFromCart(item.productId, item.variant)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Remove from cart"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
