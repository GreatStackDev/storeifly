import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface StoreItem {
    id: number;
    name: string;
    slug: string;
    description?: string;
    banner_url?: string;
    logo_url?: string;
}

interface Props {
    stores: StoreItem[];
}

export const LandingStoreShowcase: React.FC<Props> = ({ stores }) => {
    if (stores.length === 0) {
        return null;
    }

    return (
        <section className="py-20 sm:py-28 bg-neutral-50/50 border-b border-neutral-200/70 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-linear-to-r from-emerald-100/30 via-neutral-100/20 to-teal-100/30 blur-3xl pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-14 xl:mb-24 space-y-3 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-neutral-950">
                        Featured <span className="font-serif italic font-normal text-neutral-900">Storefronts.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 font-normal">
                        Explore independent brands running their custom catalogs & variants.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
                    {stores.map((s) => (
                        <Link
                            key={s.id}
                            to={`/store/${s.slug}`}
                            className="group bg-white rounded-3xl sm:rounded-4xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-48 sm:h-52 bg-neutral-900 overflow-hidden relative">
                                    {s.banner_url && (
                                        <img
                                            src={s.banner_url}
                                            alt={s.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out opacity-90"
                                        />
                                    )}
                                </div>

                                <div className="p-6 sm:p-7">
                                    <div className="flex items-center gap-3.5 mb-3">
                                        {s.logo_url && (
                                            <img src={s.logo_url} alt={s.name} className="size-8 object-fill shrink-0 shadow-xs" />
                                        )}
                                        <h3 className="font-medium text-base sm:text-lg text-neutral-950 truncate group-hover:text-emerald-800 transition-colors">
                                            {s.name}
                                        </h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-normal mt-2">
                                        {s.description || "Explore curated collections, variant options, and instant COD checkout."}
                                    </p>
                                </div>
                            </div>

                            <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                                <span className="text-neutral-900 group-hover:text-emerald-700 font-medium text-xs flex items-center gap-1 transition-colors">
                                    <span>Enter Store</span>
                                    <ArrowRight className="mx-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
