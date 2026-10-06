import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BG_COLUMNS } from "../../../assets/assets";
import { useAuth } from "../../../context/AuthContext";

export const LandingHero: React.FC = () => {
    const { user, store } = useAuth();
    const [storeSlug, setStoreSlug] = useState("");
    const navigate = useNavigate();

    const handleClaim = (e: React.FormEvent) => {
        e.preventDefault();
        const slug = storeSlug.trim();
        if (user) {
            if (user.role === "admin") {
                navigate("/admin");
                return;
            }
            if (store) {
                navigate("/merchant");
            } else {
                navigate(slug ? `/merchant/store-setup?slug=${encodeURIComponent(slug)}` : "/merchant/store-setup");
            }
        } else if (slug) {
            navigate(`/merchant/register?slug=${encodeURIComponent(slug)}`);
        } else {
            navigate("/merchant/register");
        }
    };

    return (
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white border-b border-stone-200">
            {/* Tilted Animated Mosaic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {/* Light overlays for clean white aesthetic */}
                <div className="absolute inset-0 z-10" />

                {/* Angled Grid Container with Alternating Moving Columns */}
                <div className="absolute top-[-50%] bottom-[-50%] left-[-15%] right-[-15%] transform -rotate-30 scale-110 flex justify-center items-center gap-4 sm:gap-6 opacity-90">
                    {BG_COLUMNS.map((col, colIdx) => {
                        const isEven = colIdx % 2 === 0;
                        const animClass = isEven ? "animate-col-up" : "animate-col-down";
                        // Duplicate images to create an infinite, seamless loop
                        const duplicatedImages = [...col.images, ...col.images];

                        return (
                            <div key={colIdx} className="overflow-hidden shrink-0">
                                <div className={`flex flex-col gap-4 sm:gap-6 shrink-0 will-change-transform ${animClass}`}>
                                    {duplicatedImages.map((src, imgIdx) => (
                                        <div
                                            key={imgIdx}
                                            className="w-52 sm:w-64 h-64 sm:h-76 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 bg-stone-100 shrink-0"
                                        >
                                            <img src={src} alt="brand showcase" className="w-full h-full object-cover" loading="eager" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Central Floating Card */}
            <div className="relative z-20 w-full max-w-115 sm:max-w-125 mx-4 my-12 flex flex-col gap-3 overflow-hidden">
                {/* Upper White Card */}
                <div className="bg-black/80 backdrop-blur p-7 sm:p-9 xl:p-11 rounded-3xl sm:rounded-t-4xl">
                    <h1 className="text-3xl sm:text-4xl md:text-[40px] font-medium tracking-tight text-white leading-[1.12]">
                        Build a business around what you love
                    </h1>
                    <h3 className="text-base sm:text-lg font-medium text-white mt-5">Start for free</h3>
                    <p className="text-xs text-neutral-400 mt-0.5 mb-4">Claim your store handle and start selling today.</p>

                    {/* Claim Form */}
                    <form onSubmit={handleClaim} className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="choose your brand handle"
                            value={storeSlug}
                            onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                            className="w-full bg-black/10 backdrop-blur border border-neutral-800 rounded-full pl-5 pr-13 py-3.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-black transition-colors"
                        />
                        <button
                            type="submit"
                            aria-label="Claim handle"
                            className="absolute right-1.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-neutral-200 text-neutral-950 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                        >
                            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
