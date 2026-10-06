import React, { useEffect, useState, useRef } from "react";
import { DUMMY_STORES } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { MerchantLayout } from "../../components/MerchantLayout";
import toast from "react-hot-toast";
import { StoreBrandingForm } from "../../components/merchant/settings/StoreBrandingForm";
import { StoreShippingForm } from "../../components/merchant/settings/StoreShippingForm";
import { Spinner } from "../../components/common/Spinner";
import { StoreHeroStyleSelector, type HeroStyleType } from "../../components/merchant/settings/StoreHeroStyleSelector";
import { StoreAccentColorSelector } from "../../components/merchant/settings/StoreAccentColorSelector";

export const SettingsPage: React.FC = () => {
    const { store, setStore } = useAuth();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [logoUrl, setLogoUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [shippingFee, setShippingFee] = useState("0");
    const [freeShippingThreshold, setFreeShippingThreshold] = useState("0");
    const [heroStyle, setHeroStyle] = useState<HeroStyleType>("hero1");
    const [accentColor, setAccentColor] = useState("#059669");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);

    const accentColorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (accentColorTimeoutRef.current) {
                clearTimeout(accentColorTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const current = store || DUMMY_STORES[0];
        if (!store && current) {
            setStore(current as any);
        }
        setName(current.name || "");
        setDescription(current.description || "");
        setCurrency(current.currency || "USD");
        setLogoUrl(current.logo_url || "");
        setBannerUrl(current.banner_url || "");
        setShippingFee(current.shipping_fee?.toString() || "0");
        setFreeShippingThreshold(current.free_shipping_threshold?.toString() || "0");
        setHeroStyle((current.hero_style as HeroStyleType) || "hero1");
        setAccentColor(current.accent_color || "#ff9500");
        setLoading(false);
    }, [store]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "banner") => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        if (field === "logo") setUploadingLogo(true);
        else setUploadingBanner(true);
        const previewUrl = URL.createObjectURL(file);
        if (field === "logo") {
            setLogoUrl(previewUrl);
            setUploadingLogo(false);
        } else {
            setBannerUrl(previewUrl);
            setUploadingBanner(false);
        }
        toast.success("Image selected!");
    };

    const handleHeroStyleChange = (newStyle: HeroStyleType) => {
        setHeroStyle(newStyle);
        if (store) {
            setStore({ ...store, hero_style: newStyle });
        }
        toast.success("Hero layout saved!");
    };

    const handleAccentColorChange = (newColor: string) => {
        setAccentColor(newColor);
        if (accentColorTimeoutRef.current) {
            clearTimeout(accentColorTimeoutRef.current);
        }
        accentColorTimeoutRef.current = setTimeout(() => {
            if (store) {
                setStore({ ...store, accent_color: newColor });
            }
            toast.success("Accent color saved!");
        }, 350);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => {
            const updated = {
                ...(store || DUMMY_STORES[0]),
                name: name.trim(),
                description: description.trim(),
                currency,
                logo_url: logoUrl,
                banner_url: bannerUrl,
                shipping_fee: Number(shippingFee) || 0,
                free_shipping_threshold: Number(freeShippingThreshold) || 0,
                hero_style: heroStyle,
                accent_color: accentColor,
            };
            setStore(updated as any);
            setSaving(false);
            toast.success("Store settings updated successfully!");
        }, 300);
    };

    if (loading) {
        return (
            <MerchantLayout>
                <Spinner padded />
            </MerchantLayout>
        );
    }

    return (
        <MerchantLayout>
            <div className="space-y-6 max-w-4xl font-sans">
                <h1 className="text-xl sm:text-2xl text-neutral-900 mt-10">Store Settings</h1>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Hero Style Selection */}
                    <div className="p-6 bg-white border border-neutral-200/90 rounded-3xl shadow-xs">
                        <StoreHeroStyleSelector value={heroStyle} onChange={handleHeroStyleChange} />
                    </div>

                    {/* Brand Accent Color Selection */}
                    <div className="p-6 bg-white border border-neutral-200/90 rounded-3xl shadow-xs">
                        <StoreAccentColorSelector value={accentColor} onChange={handleAccentColorChange} />
                    </div>

                    {/* Branding Info */}
                    <StoreBrandingForm
                        name={name}
                        onNameChange={setName}
                        description={description}
                        onDescriptionChange={setDescription}
                        logoUrl={logoUrl}
                        onLogoUrlChange={setLogoUrl}
                        bannerUrl={bannerUrl}
                        onBannerUrlChange={setBannerUrl}
                        onFileUpload={handleFileUpload}
                        uploadingLogo={uploadingLogo}
                        uploadingBanner={uploadingBanner}
                    />

                    {/* Shipping Configuration */}
                    <StoreShippingForm
                        shippingFee={shippingFee}
                        onShippingFeeChange={setShippingFee}
                        freeShippingThreshold={freeShippingThreshold}
                        onFreeShippingThresholdChange={setFreeShippingThreshold}
                    />

                    <button
                        type="submit"
                        disabled={saving}
                        className="py-3 px-7 text-white bg-emerald-600 text-xs font-semibold rounded-full transition disabled:opacity-50 cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                        {saving ? "Saving Changes..." : "Save Store Settings"}
                    </button>
                </form>
            </div>
        </MerchantLayout>
    );
};
