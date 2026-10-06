import React from "react";
import { LANDING_FEATURES } from "../../../assets/assets";

export const LandingFeatures: React.FC = () => {
    return (
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200/70">
            {/* Header */}
            <div className="mb-14 xl:mb-24 mt-10 space-y-3 text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-neutral-950">
                    Why Choose <span className="font-serif italic font-normal text-neutral-900">StoreiFly?</span>
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 font-normal">
                    Powerful tools to start and scale your business with ease.
                </p>
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 2x2 Bento Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-16">
                    {LANDING_FEATURES.map((item) => (
                        <div key={item.title} className="flex flex-col group">
                            {/* Visual Card */}
                            <div className="relative h-72 sm:h-80 md:h-88 w-full bg-[#f4f4f4] rounded-3xl overflow-hidden flex items-center justify-center">
                                {/* Tag Chip */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-neutral-700 bg-white/80 backdrop-blur-sm rounded-xl shadow-xs border border-neutral-200/60">
                                        {item.tag}
                                    </span>
                                </div>

                                {/* Placeholder Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Content */}
                            <div className="mt-4 sm:mt-5">
                                <h3 className="text-lg sm:text-xl font-medium text-neutral-950 tracking-tight">{item.title}</h3>
                                <p className="mt-1 text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
