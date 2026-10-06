import React from "react";
import { Truck, CheckCircle2 } from "lucide-react";

interface Props {
    freeThreshold: number;
    subtotal: number;
}

export const CartShippingProgress: React.FC<Props> = ({ freeThreshold, subtotal }) => {
    if (freeThreshold <= 0) return null;

    const unlocked = subtotal >= freeThreshold;
    const progress = Math.min(100, (subtotal / freeThreshold) * 100);

    return (
        <div className="bg-white p-5 rounded-2xl border border-neutral-200">
            <div className="flex items-center justify-between text-sm mb-2.5">
                <span className="flex items-center gap-2 text-neutral-800">
                    {unlocked ? (
                        <>
                            <CheckCircle2 className="w-4 h-4 store-accent-text shrink-0" />
                            <span className="store-accent-text font-medium">You unlocked Free Shipping!</span>
                        </>
                    ) : (
                        <>
                            <Truck className="w-4 h-4 text-neutral-700 shrink-0" />
                            <span>Add more items for free delivery</span>
                        </>
                    )}
                </span>
                <span className="text-neutral-500 font-mono text-xs">
                    ${subtotal.toFixed(2)} / ${freeThreshold.toFixed(2)}
                </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-1 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${unlocked ? "store-accent-bg" : "bg-neutral-900"}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
