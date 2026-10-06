import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DUMMY_STORES } from "../../assets/assets";
import { AdminLayout } from "../../components/AdminLayout";
import { ExternalLink, Search } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";
import toast from "react-hot-toast";

export const StoresManagement: React.FC = () => {
    const [stores, setStores] = useState<any[]>(DUMMY_STORES);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setStores(DUMMY_STORES);
        setLoading(false);
    }, []);

    const handleToggleStatus = (storeId: number, status: string) => {
        if (!window.confirm(`Are you sure you want to ${status === "active" ? "suspend" : "activate"} this store?`)) return;
        const newStatus = status === "active" ? "suspended" : "active";
        setStores((prev) =>
            prev.map((s) => (s.id === storeId ? { ...s, status: newStatus } : s))
        );
        toast.success(`Store ${newStatus === "active" ? "activated" : "suspended"} successfully`);
    };

    const q = search.toLowerCase();
    const filtered = stores.filter(
        (s) =>
            s.name.toLowerCase().includes(q) ||
            s.slug.toLowerCase().includes(q) ||
            s.merchant_name?.toLowerCase().includes(q) ||
            s.merchant_email?.toLowerCase().includes(q),
    );

    const statusClass = (active: boolean, variant: "badge" | "btn") =>
        variant === "badge"
            ? active
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            : active
              ? "bg-white text-rose-600 border-neutral-200 hover:bg-rose-50 hover:border-rose-200"
              : "bg-black text-white border-black hover:bg-neutral-800";

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl tracking-tight text-neutral-900 mt-10">Stores Management</h1>

                <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Filter by store, slug, or merchant..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:border-black transition"
                        />
                    </div>
                    <span className="text-xs text-neutral-400 font-mono px-2">{filtered.length} stores</span>
                </div>

                <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 overflow-hidden">
                    {loading ? (
                        <Spinner padded />
                    ) : filtered.length === 0 ? (
                        <p className="p-16 text-center text-xs text-neutral-400 font-mono">No stores found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-neutral-50/70 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-100">
                                    <tr>
                                        {["Store", "Merchant", "Products", "Orders", "Revenue", "Status", "Actions"].map((h, i) => (
                                            <th key={h} className={`py-3 ${i === 6 ? "px-5 text-right" : "px-4"}`}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {filtered.map((s) => (
                                        <tr key={s.id} className="hover:bg-neutral-50/50 transition">
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 shrink-0 flex items-center justify-center font-mono font-medium text-neutral-600 text-[10px]">
                                                        {s.logo_url && (
                                                            <img src={s.logo_url} alt="" className="w-full h-full object-contain" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-neutral-900 block">{s.name}</span>
                                                        <Link
                                                            to={`/store/${s.slug}`}
                                                            target="_blank"
                                                            className="text-[11px] font-mono text-neutral-400 hover:text-neutral-900 hover:underline inline-flex items-center gap-1"
                                                        >
                                                            /store/{s.slug} <ExternalLink className="w-2.5 h-2.5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span className="text-neutral-900 font-medium block">{s.merchant_name}</span>
                                                <span className="text-[11px] text-neutral-400 font-mono">{s.merchant_email}</span>
                                            </td>
                                            <td className="py-3.5 px-4 text-neutral-600 font-mono">{s.product_count || 0}</td>
                                            <td className="py-3.5 px-4 text-neutral-600 font-mono">{s.order_count || 0}</td>
                                            <td className="py-3.5 px-4 font-semibold text-neutral-900 font-mono">
                                                ${Number(s.total_revenue || 0).toFixed(2)}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase border ${statusClass(s.status === "active", "badge")}`}
                                                >
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-5 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(s.id, s.status)}
                                                    className={`px-3 py-1 text-xs font-medium rounded-full transition border cursor-pointer ${statusClass(s.status === "active", "btn")}`}
                                                >
                                                    {s.status === "active" ? "Suspend" : "Activate"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};
