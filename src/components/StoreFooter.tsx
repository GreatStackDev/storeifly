import React from "react";
import { Link } from "react-router-dom";
import { FOOTER_SECTIONS } from "../assets/assets";

interface Props {
    store: {
        name: string;
        slug: string;
        description?: string;
        logo_url?: string;
        accent_color?: string;
    };
}

export const StoreFooter: React.FC<Props> = ({ store }) => {
    return (
        <footer className="border-t border-neutral-200 bg-stone-50/60 text-neutral-600 font-sans mt-20 pt-12 pb-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                {/* Main Grid: Store Info + Navigation Links */}
                <div className="flex max-sm:flex-col items-start justify-between gap-8">
                    {/* Brand Profile */}
                    <div className="flex-1 space-y-3">
                        <Link
                            to={`/store/${store.slug}`}
                            className="inline-flex items-center gap-2.5 text-neutral-950 hover:opacity-85 transition"
                        >
                            {store.logo_url && (
                                <img
                                    src={store.logo_url}
                                    alt={store.name}
                                    className="size-7 rounded-lg object-cover border border-stone-200"
                                />
                            )}
                            <span className="text-lg font-medium tracking-tight text-neutral-900">{store.name}</span>
                        </Link>
                        <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                            {store.description || "Direct-to-consumer store. Handcrafted quality and direct tracked delivery."}
                        </p>
                    </div>

                    {/* Navigation Columns (Mapped) */}
                    <div className=" space-y-10 sm:grid grid-cols-3 gap-20 text-xs">
                        {FOOTER_SECTIONS(store.slug).map((section) => (
                            <div key={section.title} className="space-y-2.5">
                                <h4 className="font-semibold text-neutral-900 text-[11px] uppercase tracking-wider">{section.title}</h4>
                                <ul className="space-y-2 text-neutral-500">
                                    {section.links.map((link: { label: string; to?: string }) => (
                                        <li key={link.label}>
                                            {link.to ? (
                                                <Link to={link.to} className="hover:text-neutral-900 transition">
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <span className="hover:text-neutral-900 transition cursor-pointer">{link.label}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Payment Badges */}
                <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
                    <p>
                        © {new Date().getFullYear()} {store.name}. Powered by{" "}
                        <Link to="/" className="text-neutral-600 hover:text-(--store-accent) transition font-medium">
                            StoreiFly
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};
