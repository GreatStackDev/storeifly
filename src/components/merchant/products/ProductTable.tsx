import React from "react";
import { Package, Edit2, Trash2 } from "lucide-react";

export interface ProductItem {
    id: number;
    name: string;
    description?: string;
    price: number | string;
    compare_at_price?: number | string | null;
    stock: number;
    sku?: string | null;
    category_id?: number | null;
    category_name?: string;
    status: string;
    images?: string[];
    variants?: Array<{ name: string; options: string[] }>;
}

interface ProductTableProps {
    products: ProductItem[];
    loading: boolean;
    onEdit: (product: ProductItem) => void;
    onDelete: (id: number) => void;
    onAddProduct: () => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, loading, onEdit, onDelete, onAddProduct }) => {
    if (loading) {
        return (
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-12 text-center text-xs text-neutral-400 font-mono">
                Loading catalog...
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="bg-white rounded-3xl border border-neutral-200/80 p-12 text-center">
                <h3 className="font-medium text-neutral-900">No products found</h3>
                <button
                    type="button"
                    onClick={onAddProduct}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-full hover:bg-emerald-700 transition cursor-pointer shadow-xs shadow-emerald-700/20"
                >
                    Add Product
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50/70 text-neutral-400 font-medium border-b border-neutral-100">
                        <tr>
                            <th className="p-3.5 pl-6">Product</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Price</th>
                            <th className="p-3.5">Stock</th>
                            <th className="p-3.5">SKU</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-neutral-50/50 transition">
                                <td className="p-3.5 pl-6 flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200/80 overflow-hidden shrink-0">
                                        {p.images && p.images[0] ? (
                                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                <Package className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <span className="font-medium text-neutral-900 truncate block text-xs sm:text-sm">{p.name}</span>
                                        {p.variants && p.variants.length > 0 && (
                                            <span className="text-[10px] text-neutral-400 font-mono">
                                                {p.variants.length} variant groups
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-3.5 text-neutral-600">{p.category_name || "Uncategorized"}</td>
                                <td className="p-3.5 font-mono font-medium text-neutral-900">${Number(p.price).toFixed(2)}</td>
                                <td className="p-3.5">
                                    <span
                                        className={`font-mono text-xs ${p.stock <= 5 ? "text-rose-600 font-medium" : "text-neutral-700"}`}
                                    >
                                        {p.stock}
                                    </span>
                                </td>
                                <td className="p-3.5 font-mono text-neutral-400">{p.sku || "—"}</td>
                                <td className="p-3.5">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase border ${
                                            p.status === "active"
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                : "bg-neutral-100 text-neutral-600 border-neutral-200"
                                        }`}
                                    >
                                        {p.status}
                                    </span>
                                </td>
                                <td className="p-3.5 pr-6 text-right space-x-1">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(p)}
                                        className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-100 rounded-full transition cursor-pointer"
                                        title="Edit product"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(p.id)}
                                        className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition cursor-pointer"
                                        title="Delete product"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
