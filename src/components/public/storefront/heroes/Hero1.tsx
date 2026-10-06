import React from "react";
import { ArrowRight } from "lucide-react";

export interface HeroProps {
    store: {
        name: string;
        logo_url?: string;
        banner_url?: string;
        description?: string;
        free_shipping_threshold?: number | string;
    };
    onShopClick: () => void;
}

const DEFAULT_BANNER = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop";

export const Hero1: React.FC<HeroProps> = ({ store, onShopClick }) => {
    return (
        <section className="relative w-full h-[65vh] sm:h-[75vh] min-h-[calc(100vh-60px)] flex items-end overflow-hidden bg-neutral-950">
            {/* Background Image */}
            <img
                src={store.banner_url || DEFAULT_BANNER}
                alt={store.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Dark Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-transparent z-0" />

            {/* Bottom Left Content (Full Width Container) */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full relative z-10 text-left">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">{store.name}</h1>

                {store.description && (
                    <p className="mt-3 text-sm sm:text-base text-neutral-200 max-w-xl leading-relaxed font-normal">{store.description}</p>
                )}

                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onShopClick}
                        className="px-6 sm:px-7 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-semibold rounded-full transition inline-flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 duration-200"
                    >
                        <span>Shop Collection</span>
                        <ArrowRight className="w-4 h-4 text-neutral-950" />
                    </button>
                </div>
            </div>
        </section>
    );
};
