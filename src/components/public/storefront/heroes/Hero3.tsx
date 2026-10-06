import React from "react";
import { ArrowRight, BadgeCheckIcon, StarIcon, TimerIcon, UserIcon } from "lucide-react";
import type { HeroProps } from "./Hero1";

const BADGES = [
    { icon: UserIcon, label: "24/7 Support" },
    { icon: StarIcon, label: "Premium Quality" },
    { icon: BadgeCheckIcon, label: "Money Back Guarantee" },
];

export const Hero3: React.FC<HeroProps> = ({ store, onShopClick }) => (
    <section className="w-full min-h-[calc(100vh-70px)] flex flex-col gap-10 items-center justify-center bg-white py-6 sm:py-8">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden min-h-95 sm:min-h-140 flex items-center justify-center p-8 sm:p-14 text-center text-white border border-neutral-400 shadow-lg">
                {store.banner_url ? (
                    <img src={store.banner_url} alt={store.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-stone-900 to-black" />
                )}
                <div className="absolute inset-0 bg-linear-to-b from-neutral-950/30 via-neutral-950/50 to-neutral-900/70" />

                <div className="z-10 max-w-2xl mx-auto flex flex-col items-center space-y-5">
                    <div className="inline-flex absolute right-5 top-5 items-center gap-2 px-3.5 py-1.5 rounded-full border store-accent-pill text-xs font-medium">
                        <TimerIcon className="w-3.5 h-3.5 store-accent-text" />
                        Hurry Up! Limited Time Offer
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1]">{store.name}</h1>

                    {store.description && (
                        <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed font-light">{store.description}</p>
                    )}

                    <button
                        type="button"
                        onClick={onShopClick}
                        className="mt-3 px-7 py-3.5 text-sm font-medium rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] store-accent-btn"
                    >
                        Explore Collection <ArrowRight className="size-4" />
                    </button>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-neutral-300 text-sm">
                        {["Cash on Delivery", "Fast Doorstep Dispatch", "Authentic Guarantee"].map((t, i) => (
                            <React.Fragment key={t}>
                                {i > 0 && <span>•</span>}
                                <span>{t}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="flex max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 gap-x-18 flex-wrap justify-center">
            {BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                    <Icon size={18} />
                    <p>{label}</p>
                </div>
            ))}
        </div>
    </section>
);
