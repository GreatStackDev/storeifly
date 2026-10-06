import React, { useState } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useAuth, type Store as StoreType } from "../../context/AuthContext";
import { Store, ArrowRight, Upload } from "lucide-react";
import toast from "react-hot-toast";

export const StoreSetup: React.FC = () => {
    const { user, store, setStore, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialSlug = searchParams.get("slug") || "";

    const [name, setName] = useState(initialSlug ? initialSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "");
    const [slug, setSlug] = useState(initialSlug);
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [shippingFee, setShippingFee] = useState("5.00");
    const [freeShippingThreshold, setFreeShippingThreshold] = useState("50.00");
    const [logoUrl, setLogoUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-neutral-400 text-xs font-mono">
                Authenticating...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/merchant/login" replace />;
    }

    // Admins cannot create stores or become merchants
    if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    if (store) {
        return <Navigate to="/merchant" replace />;
    }

    const handleNameChange = (val: string) => {
        setName(val);
        if (!slug || slug === name.toLowerCase().replace(/\s+/g, "-")) {
            setSlug(
                val
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, ""),
            );
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "banner") => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        if (field === "logo") setUploadingLogo(true);
        const previewUrl = URL.createObjectURL(file);
        if (field === "logo") {
            setLogoUrl(previewUrl);
            setUploadingLogo(false);
        } else {
            setBannerUrl(previewUrl);
        }
        toast.success("Image selected!");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Please enter a store name");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const newStore: StoreType = {
                id: Date.now(),
                merchant_id: user.id,
                name: name.trim(),
                slug: slug.trim() || name.toLowerCase().replace(/\s+/g, "-"),
                description,
                currency,
                shipping_fee: Number(shippingFee) || 0,
                free_shipping_threshold: Number(freeShippingThreshold) || 0,
                logo_url: logoUrl || "/logo_4.svg",
                banner_url: bannerUrl || "/storefront_hero_1.png",
                hero_style: "hero1",
                status: "active",
                accent_color: "#ff9500",
            };

            setStore(newStore);
            setLoading(false);
            toast.success("Store created successfully!");
            navigate("/merchant");
        }, 300);
    };

    return (
        <div className="min-h-screen bg-neutral-50/70 flex items-center justify-center p-4 py-12 font-sans">
            <div className="w-full max-w-xl bg-white rounded-3xl sm:rounded-4xl border border-neutral-200/80 p-7 sm:p-10">
                <div className="flex items-center gap-3.5 mb-7">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                        <Store className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl text-neutral-900">Setup Your Store</h1>
                        <p className="text-xs text-neutral-400 mt-0.5">
                            Configure your brand, store URL, and delivery rules to start selling online.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Store Name & Slug */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Store Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Nordic Ceramics"
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Store URL Slug *</label>
                            <div className="flex items-center border border-neutral-200 rounded-xl px-3.5 py-2 bg-neutral-50/50 text-xs focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600/20">
                                <span className="text-neutral-400 font-mono text-[11px]">/store/</span>
                                <input
                                    type="text"
                                    required
                                    placeholder="nordic-ceramics"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                    className="w-full bg-transparent focus:outline-none font-mono text-neutral-900 ml-1 text-xs"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Store Tagline / Bio</label>
                        <textarea
                            rows={2}
                            placeholder="Handcrafted Scandinavian tableware and interior objects."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50"
                        />
                    </div>

                    {/* Currency & Shipping */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="CAD">CAD ($)</option>
                                <option value="INR">INR (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Shipping Fee ($)</label>
                            <input
                                type="number"
                                step="0.5"
                                min="0"
                                value={shippingFee}
                                onChange={(e) => setShippingFee(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Free Shipping Over ($)</label>
                            <input
                                type="number"
                                step="1"
                                min="0"
                                value={freeShippingThreshold}
                                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50 font-mono"
                            />
                        </div>
                    </div>

                    {/* Logo & Banner URLs or Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-neutral-100 pt-5">
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Store Logo</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={logoUrl}
                                onChange={(e) => setLogoUrl(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50 mb-2"
                            />
                            <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-[11px] font-medium text-neutral-700 cursor-pointer transition">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploadingLogo ? "Uploading..." : "Upload Logo"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "logo")} />
                            </label>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Hero Banner</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={bannerUrl}
                                onChange={(e) => setBannerUrl(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50 mb-2"
                            />
                            <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-[11px] font-medium text-neutral-700 cursor-pointer transition">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload Banner</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "banner")} />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-full transition shadow-xs shadow-emerald-700/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                        <span>{loading ? "Creating Store..." : "Launch Store & Open Dashboard"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </form>
            </div>
        </div>
    );
};
