import React from "react";
import { ArrowRightIcon, TruckIcon, ShieldCheckIcon, RefreshCwIcon } from "lucide-react";
import type { HeroProps } from "./Hero1";

export const Hero4: React.FC<HeroProps> = ({ store, onShopClick }) => {
    const freeShippingThreshold = Number(store.free_shipping_threshold) || 0;

    return (
        <section className="w-full bg-stone-50/40 border-b border-stone-200/80 py-12 sm:py-16 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 mb-8">
                    {freeShippingThreshold > 0 && (
                        <div className="inline-flex items-center gap-1.5 px-5 py-1.5 xl:px-8 xl:py-2.5 rounded-full border store-accent-pill text-xs font-medium">
                            <TruckIcon className="size-4 store-accent-text" />
                            <span>Free Shipping Over ${freeShippingThreshold.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="inline-flex items-center gap-1.5 px-5 py-1.5 xl:px-8 xl:py-2.5 rounded-full border store-accent-pill text-xs font-medium">
                        <ShieldCheckIcon className="size-4 store-accent-text" />
                        <span>Cash on Delivery</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-5 py-1.5 xl:px-8 xl:py-2.5 rounded-full border store-accent-pill text-xs font-medium">
                        <ArrowRightIcon className="size-4 store-accent-text" />
                        <span>Direct-to-Consumer</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-5 py-1.5 xl:px-8 xl:py-2.5 rounded-full border store-accent-pill text-xs font-medium">
                        <RefreshCwIcon className="size-4 store-accent-text" />
                        <span>Hassle-Free Returns</span>
                    </div>
                </div>

                {/* Main Card Container */}
                <div className="bg-white rounded-3xl sm:rounded-4xl border border-stone-200/90 p-8 shadow-xs text-center flex flex-col items-center max-w-6xl mx-auto">
                    <div className="xl:my-5">
                        <h1 className="text-3xl sm:text-5xl font-light tracking-tight">{store.name}</h1>

                        <p className="mt-3 text-xs sm:text-sm text-stone-600 max-w-lg leading-relaxed font-normal">
                            {store.description || "Discover verified products, customizable variants, and seamless order fulfillment."}
                        </p>

                        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={onShopClick}
                                className="px-6 py-3 text-white text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] store-accent-btn"
                            >
                                <span>Browse Catalog</span>
                                <ArrowRightIcon className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Banner Image Preview inside card */}
                    {store.banner_url && (
                        <div className="w-full mt-8 rounded-2xl overflow-hidden border border-stone-200/80 aspect-21/9 max-h-64 shadow-xs">
                            <img
                                src={store.banner_url}
                                alt={store.name}
                                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
