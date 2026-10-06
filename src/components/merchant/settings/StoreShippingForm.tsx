import React from "react";

interface StoreShippingFormProps {
    shippingFee: string;
    onShippingFeeChange: (val: string) => void;
    freeShippingThreshold: string;
    onFreeShippingThresholdChange: (val: string) => void;
}

export const StoreShippingForm: React.FC<StoreShippingFormProps> = ({
    shippingFee,
    onShippingFeeChange,
    freeShippingThreshold,
    onFreeShippingThresholdChange,
}) => {
    return (
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 space-y-5">
            <h2 className="font-medium text-neutral-900">Shipping & Delivery Rules</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Standard Shipping Fee ($)</label>
                    <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={shippingFee}
                        onChange={(e) => onShippingFeeChange(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50 font-mono"
                    />
                </div>

                <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Free Shipping Threshold ($)</label>
                    <input
                        type="number"
                        step="1"
                        min="0"
                        value={freeShippingThreshold}
                        onChange={(e) => onFreeShippingThresholdChange(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50 font-mono"
                    />
                </div>
            </div>
        </div>
    );
};
