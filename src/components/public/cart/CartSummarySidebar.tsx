import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

interface CartSummarySidebarProps {
    subtotal: number;
    shippingFee: number;
    isFreeShipping: boolean;
    estimatedTotal: number;
    storeSlug: string;
}

export const CartSummarySidebar: React.FC<CartSummarySidebarProps> = ({
    subtotal,
    shippingFee,
    isFreeShipping,
    estimatedTotal,
    storeSlug,
}) => {
    return (
        <div className="bg-white rounded-2xl sm:rounded-4xl border border-neutral-200 p-7 sm:p-8 space-y-6">
            <h2 className="text-xl font-mono font-medium border-b border-b-neutral-100 pb-4 text-neutral-900 mb-4">Order Estimate</h2>

            <div className="space-y-3 text-xs text-neutral-600 border-b border-neutral-100 pb-5">
                <div className="flex justify-between items-center">
                    <span className="font-normal text-neutral-600">Subtotal</span>
                    <span className="font-mono font-medium text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-normal text-neutral-600">Estimated Shipping</span>
                    <span className="font-mono font-medium text-neutral-900">
                        {isFreeShipping ? "$0.00" : `$${shippingFee.toFixed(2)}`}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center pt-1">
                <div>
                    <span className="text-xs font-medium text-neutral-900 block">Total Due</span>
                    <span className="text-[11px] text-neutral-400 font-mono">Taxes & fees calculated at checkout</span>
                </div>
                <span className="text-xl sm:text-2xl font-semibold font-mono text-neutral-900">${estimatedTotal.toFixed(2)}</span>
            </div>

            <Link
                to={`/store/${storeSlug}/checkout`}
                className="w-full py-3 px-6 rounded-full text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] store-accent-btn"
            >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Direct Guarantees Mini Strip */}
            <div className="pt-4 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>Tracked Courier Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                    <span>30-Day Hassle-Free Returns</span>
                </div>
            </div>
        </div>
    );
};
