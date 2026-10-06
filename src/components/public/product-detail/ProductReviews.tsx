import React from "react";
import { Star } from "lucide-react";
import { PRODUCT_REVIEWS } from "../../../assets/assets";

const RATING_BARS = [
    { label: "5 stars", pct: 86 },
    { label: "4 stars", pct: 10 },
    { label: "3 stars", pct: 3 },
    { label: "2 stars", pct: 1 },
];

export const ProductReviews: React.FC = () => {
    return (
        <div className="mt-14 bg-white rounded-3xl sm:rounded-4xl border border-neutral-100 p-7 sm:p-10">
            {/* Header */}
            <h3 className="text-xl sm:text-2xl tracking-tight text-neutral-900">Customer Reviews</h3>

            {/* Rating Breakdown Section */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-neutral-100">
                <div className="md:col-span-4 text-center md:text-left">
                    <span className="text-4xl sm:text-5xl font-light font-mono text-neutral-900">4.9</span>
                    <div className="flex items-center justify-center md:justify-start gap-1 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <span className="text-xs text-neutral-400 mt-1 block font-mono">128 verified ratings</span>
                </div>

                {/* Rating Bars */}
                <div className="md:col-span-8 space-y-2 text-xs text-neutral-600 font-mono">
                    {RATING_BARS.map(({ label, pct }) => (
                        <div key={label} className="flex items-center gap-3">
                            <span className="w-12 text-[11px] text-neutral-500">{label}</span>
                            <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                <div className="h-full store-accent-bg rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="w-8 text-right text-[11px] text-neutral-400">{pct}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="divide-y divide-neutral-100 pt-2">
                {PRODUCT_REVIEWS.map((r, i) => (
                    <div key={i} className="py-6 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-800">
                                    {r.author.slice(0, 1)}
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-neutral-900 block">{r.author}</span>
                                    <span className="text-[10px] text-neutral-400 font-mono">{r.date}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-0.5">
                                {[...Array(r.rating)].map((_, sIdx) => (
                                    <Star key={sIdx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>

                        <h4 className="text-xs font-medium text-neutral-900">{r.title}</h4>
                        <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed font-normal">{r.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
