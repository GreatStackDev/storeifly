import React from "react";
import { Upload } from "lucide-react";

interface StoreBrandingFormProps {
    name: string;
    onNameChange: (val: string) => void;
    description: string;
    onDescriptionChange: (val: string) => void;
    logoUrl: string;
    onLogoUrlChange: (val: string) => void;
    bannerUrl: string;
    onBannerUrlChange: (val: string) => void;
    onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, field: "logo" | "banner") => void;
    uploadingLogo: boolean;
    uploadingBanner: boolean;
}

export const StoreBrandingForm: React.FC<StoreBrandingFormProps> = ({
    name,
    onNameChange,
    description,
    onDescriptionChange,
    logoUrl,
    onLogoUrlChange,
    bannerUrl,
    onBannerUrlChange,
    onFileUpload,
    uploadingLogo,
    uploadingBanner,
}) => {
    return (
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 space-y-5">
            <h2 className="font-medium text-neutral-900">Store Identity & Branding</h2>
            <div>
                <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Store Name</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50"
                />
            </div>

            <div>
                <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Store Tagline / Bio</label>
                <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 bg-neutral-50/50"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Logo Image URL</label>
                    <input
                        type="text"
                        placeholder="https://..."
                        value={logoUrl}
                        onChange={(e) => onLogoUrlChange(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 mb-2 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20"
                    />
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-full text-xs font-medium text-neutral-700 cursor-pointer transition">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingLogo ? "Uploading..." : "Upload Logo"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => onFileUpload(e, "logo")} />
                    </label>
                </div>
                <div>
                    <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Hero Banner URL</label>
                    <input
                        type="text"
                        placeholder="https://..."
                        value={bannerUrl}
                        onChange={(e) => onBannerUrlChange(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 mb-2 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20"
                    />
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-full text-xs font-medium text-neutral-700 cursor-pointer transition">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingBanner ? "Uploading..." : "Upload Banner"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => onFileUpload(e, "banner")} />
                    </label>
                </div>
            </div>
        </div>
    );
};
