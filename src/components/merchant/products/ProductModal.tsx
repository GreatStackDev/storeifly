import React, { useState } from "react";
import { X } from "lucide-react";
import { ProductImageManager } from "./ProductImageManager";
import { ProductVariantBuilder, type VariantGroup } from "./ProductVariantBuilder";
import { ProductAiImageModal } from "./ProductAiImageModal";
import type { ProductItem } from "./ProductTable";

interface CategoryOption {
    id: number;
    name: string;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingProduct: ProductItem | null;
    categories: CategoryOption[];
    formName: string;
    onFormNameChange: (val: string) => void;
    formDesc: string;
    onFormDescChange: (val: string) => void;
    formPrice: string;
    onFormPriceChange: (val: string) => void;
    formCompareAt: string;
    onFormCompareAtChange: (val: string) => void;
    formSku: string;
    onFormSkuChange: (val: string) => void;
    formStock: string;
    onFormStockChange: (val: string) => void;
    formCategoryId: string;
    onFormCategoryIdChange: (val: string) => void;
    formStatus: string;
    onFormStatusChange: (val: string) => void;
    formImages: string[];
    formImageUrlInput: string;
    onFormImageUrlInputChange: (val: string) => void;
    onAddImageFromUrl: () => void;
    onUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
    onAddTransformedImage: (url: string) => void;
    onReplaceImage: (index: number, url: string) => void;
    onAddColorVariantOption: (colorName: string) => void;
    uploadingImage: boolean;
    formVariants: VariantGroup[];
    newVariantName: string;
    onNewVariantNameChange: (val: string) => void;
    newVariantOptions: string;
    onNewVariantOptionsChange: (val: string) => void;
    onAddVariantGroup: () => void;
    onRemoveVariantGroup: (index: number) => void;
    onSaveProduct: (e: React.FormEvent) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    editingProduct,
    categories,
    formName,
    onFormNameChange,
    formDesc,
    onFormDescChange,
    formPrice,
    onFormPriceChange,
    formCompareAt,
    onFormCompareAtChange,
    formSku,
    onFormSkuChange,
    formStock,
    onFormStockChange,
    formCategoryId,
    onFormCategoryIdChange,
    formStatus,
    onFormStatusChange,
    formImages,
    formImageUrlInput,
    onFormImageUrlInputChange,
    onAddImageFromUrl,
    onUploadImageFile,
    onRemoveImage,
    onAddTransformedImage,
    onReplaceImage,
    onAddColorVariantOption,
    uploadingImage,
    formVariants,
    newVariantName,
    onNewVariantNameChange,
    newVariantOptions,
    onNewVariantOptionsChange,
    onAddVariantGroup,
    onRemoveVariantGroup,
    onSaveProduct,
}) => {
    const [aiStudioOpen, setAiStudioOpen] = useState(false);
    const [aiStudioInitialIndex, setAiStudioInitialIndex] = useState(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
            <div className="bg-white rounded-4xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-neutral-200/80 my-8">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                    <h3 className="font-medium text-xl text-neutral-900">{editingProduct ? "Edit Product" : "Create Product"}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={onSaveProduct} className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Product Title *</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Organic Cotton Minimalist Tee"
                            value={formName}
                            onChange={(e) => onFormNameChange(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Price ($) *</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                placeholder="24.00"
                                value={formPrice}
                                onChange={(e) => onFormPriceChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Compare At ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="32.00"
                                value={formCompareAt}
                                onChange={(e) => onFormCompareAtChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Stock Qty</label>
                            <input
                                type="number"
                                min="0"
                                value={formStock}
                                onChange={(e) => onFormStockChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50 font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">SKU Code</label>
                            <input
                                type="text"
                                placeholder="TEE-ORG-01"
                                value={formSku}
                                onChange={(e) => onFormSkuChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50 font-mono"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Category</label>
                            <select
                                value={formCategoryId}
                                onChange={(e) => onFormCategoryIdChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                            >
                                <option value="">No Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Visibility Status</label>
                            <select
                                value={formStatus}
                                onChange={(e) => onFormStatusChange(e.target.value)}
                                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                            >
                                <option value="active">Active (Visible in Store)</option>
                                <option value="draft">Draft (Hidden)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Detailed notes about materials, origins, or sizing..."
                            value={formDesc}
                            onChange={(e) => onFormDescChange(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 bg-neutral-50/50"
                        />
                    </div>

                    {/* Images Manager */}
                    <ProductImageManager
                        images={formImages}
                        imageUrlInput={formImageUrlInput}
                        onImageUrlInputChange={onFormImageUrlInputChange}
                        onAddImageFromUrl={onAddImageFromUrl}
                        onUploadImageFile={onUploadImageFile}
                        onRemoveImage={onRemoveImage}
                        uploadingImage={uploadingImage}
                        onOpenAiStudio={(idx) => {
                            setAiStudioInitialIndex(idx ?? 0);
                            setAiStudioOpen(true);
                        }}
                    />

                    {/* AI Image Studio Modal */}
                    <ProductAiImageModal
                        isOpen={aiStudioOpen}
                        onClose={() => setAiStudioOpen(false)}
                        images={formImages}
                        selectedImageIndex={aiStudioInitialIndex}
                        productName={formName}
                        onAddImage={onAddTransformedImage}
                        onReplaceImage={onReplaceImage}
                        onAddColorVariantOption={onAddColorVariantOption}
                    />

                    {/* Variants Manager */}
                    <ProductVariantBuilder
                        variants={formVariants}
                        newVariantName={newVariantName}
                        onNewVariantNameChange={onNewVariantNameChange}
                        newVariantOptions={newVariantOptions}
                        onNewVariantOptionsChange={onNewVariantOptionsChange}
                        onAddVariantGroup={onAddVariantGroup}
                        onRemoveVariantGroup={onRemoveVariantGroup}
                    />

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-black transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition cursor-pointer shadow-xs shadow-emerald-700/20"
                        >
                            {editingProduct ? "Save Changes" : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
