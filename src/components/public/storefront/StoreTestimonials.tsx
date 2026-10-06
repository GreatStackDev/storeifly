import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../../assets/assets";

export const StoreTestimonials: React.FC = () => (
    <section className="mt-16 sm:mt-32 pt-10 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <h2 className="text-2xl font-normal tracking-tight text-neutral-900">Loved by Customers</h2>
            <div className="flex items-center gap-1 text-neutral-900 text-xs font-mono bg-neutral-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">4.9</span>
                <span className="text-neutral-500">/ 5.0 rating</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
                <div
                    key={t.initials}
                    className="p-8 rounded-3xl border border-stone-200/90 bg-white flex flex-col justify-between space-y-6 hover:border-neutral-300 transition-all duration-300"
                >
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">"{t.text}"</p>
                    <div className="pt-5 border-t border-stone-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-xs font-mono text-neutral-800">
                            {t.initials}
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-neutral-950">{t.name}</h4>
                            <p className="text-[11px] text-stone-500">{t.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
