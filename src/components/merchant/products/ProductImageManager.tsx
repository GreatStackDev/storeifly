import React from "react";
import { Upload, X, Sparkle } from "lucide-react";

interface ProductImageManagerProps {
    images: string[];
    imageUrlInput: string;
    onImageUrlInputChange: (val: string) => void;
    onAddImageFromUrl: () => void;
    onUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
    uploadingImage: boolean;
    onOpenAiStudio?: (index?: number) => void;
}

export const ProductImageManager: React.FC<ProductImageManagerProps> = ({
    images,
    imageUrlInput,
    onImageUrlInputChange,
    onAddImageFromUrl,
    onUploadImageFile,
    onRemoveImage,
    uploadingImage,
    onOpenAiStudio,
}) => {
    return (
        <div>
            <h4 className="mb-2 text-xs font-medium text-neutral-700">Product Images</h4>

            <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                    type="text"
                    placeholder="Paste image URL..."
                    value={imageUrlInput}
                    onChange={(e) => onImageUrlInputChange(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                />
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        type="button"
                        onClick={onAddImageFromUrl}
                        className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-medium rounded-full transition cursor-pointer"
                    >
                        Add URL
                    </button>
                    <label className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-full cursor-pointer inline-flex items-center gap-1.5">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingImage ? "..." : "Upload File"}</span>
                        <input type="file" accept="image/*" className="hidden" onChange={onUploadImageFile} />
                    </label>
                    {images.length > 0 && onOpenAiStudio && (
                        <button
                            type="button"
                            onClick={() => onOpenAiStudio(0)}
                            className="px-3.5 py-2 bg-blue-600 text-white hover:bg-indigo-200 text-xs font-medium rounded-full cursor-pointer inline-flex items-center gap-1.5"
                        >
                            <Sparkle className="size-3 animate-spin" />
                            <span>AI Tools</span>
                        </button>
                    )}
                </div>
            </div>

            {images.length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="relative w-16 h-16 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 group shadow-xs"
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />

                            {/* Hover Overlay Controls */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                                <button
                                    type="button"
                                    onClick={() => onRemoveImage(idx)}
                                    title="Remove Image"
                                    className="bg-black/80 hover:bg-rose-600 text-white rounded-full p-1 cursor-pointer"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
