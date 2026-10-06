import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PRODUCT_SPECS, SHIPPING_POINTS } from "../../../assets/assets";

export const ProductSpecs: React.FC = () => {
    return (
        <div className="mt-14 bg-white rounded-3xl sm:rounded-4xl border border-neutral-100 p-7 sm:p-10">
            <h3 className="text-2xl mb-5">Specifications</h3>
            <hr className="mb-5 border-gray-100" />
            <div className="text-xs text-neutral-600 leading-relaxed space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-x-20 max-w-xl">
                    {PRODUCT_SPECS.map(({ label, value }) => (
                        <div key={label} className="flex justify-between">
                            <span className="text-neutral-400 font-normal">{label}</span>
                            <span className={`text-neutral-800 `}>{value}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 max-w-2xl">
                    <p className="text-neutral-700 font-normal">
                        All orders are inspected and dispatched within 24 to 48 business hours via tracked courier services.
                    </p>
                    <div className="space-y-2 pt-1">
                        {SHIPPING_POINTS.map((point) => (
                            <div key={point} className="flex items-center gap-2 text-neutral-600">
                                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
