import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { CTA_FEATURES } from "../../../assets/assets";

export const LandingCta: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        toast.success("Thank you for subscribing to StoreiFly updates!");
        setEmail("");
    };

    return (
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden bg-linear-to-br from-neutral-950 via-neutral-900 to-stone-950 text-white rounded-3xl sm:rounded-4xl p-8 sm:p-14 lg:p-16 border border-neutral-800/80 shadow-xl">
                    <div className="max-w-3xl relative z-10 space-y-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-white leading-[1.12]">
                            Enhance your <span className="font-serif italic font-normal store-accent-text"> experience?</span>
                        </h2>

                        <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-normal">
                            {CTA_FEATURES.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2.5">
                                    <Check className="w-4 h-4 store-accent-text shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Email Subscription Bar */}
                        <form onSubmit={handleSubmit} className="pt-2 max-w-md">
                            <div className="relative flex items-center bg-neutral-800/90 rounded-full border border-neutral-700/90 p-1.5 focus-within:border-(--store-accent) transition-all shadow-xs">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent pl-4 pr-3 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="w-9 h-9 rounded-full store-accent-btn transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-xs font-bold"
                                    title="Submit"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[11px] text-neutral-400 mt-2.5 pl-4">
                                Join 1,200+ independent founders receiving platform updates.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
