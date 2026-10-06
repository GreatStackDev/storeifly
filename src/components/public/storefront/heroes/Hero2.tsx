import React from "react";
import { ArrowRight, ShoppingBag, Truck, TimerIcon } from "lucide-react";
import type { HeroProps } from "./Hero1";

export const Hero2: React.FC<HeroProps> = ({ store, onShopClick }) => {
    const freeShipping = Number(store.free_shipping_threshold) || 0;

    return (
        <section className="w-full min-h-[calc(100vh-70px)] flex items-center justify-center bg-stone-50/50 border-b border-stone-200/80 py-12 sm:py-18 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left: Text */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border store-accent-pill text-xs font-medium">
                            <TimerIcon className="w-3.5 h-3.5 store-accent-text" /> Hurry Up! Limited Time Offer
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-950 font-light leading-[1.08]">
                            {store.name}
                        </h1>

                        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg font-normal">
                            {store.description ||
                                "Discover handcrafted collections, verified variants, and fast Cash-on-Delivery fulfillment."}
                        </p>

                        {freeShipping > 0 && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border store-accent-pill text-xs font-medium">
                                <Truck className="w-3.5 h-3.5 store-accent-text" /> Free delivery on orders over ${freeShipping.toFixed(2)}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={onShopClick}
                            className="px-6 sm:px-10 py-3.5 text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] store-accent-btn"
                        >
                            Shop Products <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Right: Image */}
                    <div className="lg:col-span-6">
                        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden border border-stone-200 bg-white shadow-sm group">
                            {store.banner_url ? (
                                <img
                                    src={store.banner_url}
                                    alt={store.name}
                                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            ) : (
                                <div className="w-full h-80 sm:h-96 bg-linear-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center text-stone-400 gap-2">
                                    <ShoppingBag className="w-12 h-12 text-stone-300" />
                                    <span className="text-xs font-medium">Custom Banner Space</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
