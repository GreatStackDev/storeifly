import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_DATA } from "../../../assets/assets";

export const LandingFaq: React.FC = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section className="py-20 sm:py-28 bg-stone-50/50 border-b border-stone-200/70 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-14 space-y-3 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-neutral-950">
                        Common questions, <span className="font-serif italic font-normal text-neutral-900">clearly answered.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 font-normal">
                        Everything you need to know about opening and operating your store.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {FAQ_DATA.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div
                                key={idx}
                                className={`border rounded-2xl transition-all duration-200 ${
                                    isOpen
                                        ? "bg-white border-neutral-300"
                                        : "bg-white/70 border-stone-200/80 hover:border-stone-300 hover:bg-white"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="w-full text-left p-4 sm:p-4 sm:px-6 flex items-center justify-between gap-6 cursor-pointer"
                                >
                                    <span className="text-base text-neutral-950">{faq.q}</span>
                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                            isOpen
                                                ? "bg-emerald-600 text-white"
                                                : "bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                    >
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-neutral-600 leading-relaxed pt-0 border-t border-stone-100">
                                        <p className="pt-4">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
