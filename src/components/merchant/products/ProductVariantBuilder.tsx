import React from "react";
import { X } from "lucide-react";

export interface VariantGroup {
    name: string;
    options: string[];
}

interface ProductVariantBuilderProps {
    variants: VariantGroup[];
    newVariantName: string;
    onNewVariantNameChange: (val: string) => void;
    newVariantOptions: string;
    onNewVariantOptionsChange: (val: string) => void;
    onAddVariantGroup: () => void;
    onRemoveVariantGroup: (index: number) => void;
}

export const ProductVariantBuilder: React.FC<ProductVariantBuilderProps> = ({
    variants,
    newVariantName,
    onNewVariantNameChange,
    newVariantOptions,
    onNewVariantOptionsChange,
    onAddVariantGroup,
    onRemoveVariantGroup,
}) => {
    return (
        <div className="border-t border-neutral-100 pt-4">
            <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Product Variants (e.g. Size, Color)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                <input
                    type="text"
                    placeholder="Group (e.g. Size)"
                    value={newVariantName}
                    onChange={(e) => onNewVariantNameChange(e.target.value)}
                    className="px-3.5 py-2 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                />
                <input
                    type="text"
                    placeholder="Options (e.g. S, M, L)"
                    value={newVariantOptions}
                    onChange={(e) => onNewVariantOptionsChange(e.target.value)}
                    className="px-3.5 py-2 text-xs border border-neutral-200 rounded-xl bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                />
                <button
                    type="button"
                    onClick={onAddVariantGroup}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-medium rounded-full transition cursor-pointer"
                >
                    + Add Group
                </button>
            </div>

            {variants.map((v, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-neutral-50/80 rounded-2xl text-xs mb-2 border border-neutral-200/80"
                >
                    <div className="flex items-center gap-2">
                        <strong className="font-semibold text-neutral-900">{v.name}:</strong>{" "}
                        <span className="text-neutral-600 font-mono text-[11px]">{v.options.join(", ")}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemoveVariantGroup(idx)}
                        className="text-neutral-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-50 transition cursor-pointer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ))}
        </div>
    );
};
