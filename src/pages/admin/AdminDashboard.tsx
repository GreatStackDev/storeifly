import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DUMMY_PLATFORM_ANALYTICS } from "../../assets/assets";
import { AdminLayout } from "../../components/AdminLayout";
import { Store, Users, DollarSign, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";

export const AdminDashboard: React.FC = () => {
    const [analytics, setAnalytics] = useState<any>(DUMMY_PLATFORM_ANALYTICS);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAnalytics(DUMMY_PLATFORM_ANALYTICS);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <AdminLayout>
                <Spinner padded />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl tracking-tight text-neutral-900 mt-10">Overview & Metrics</h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-neutral-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500">Total Stores</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center">
                                <Store className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-light tracking-tight text-neutral-900 font-mono">
                                {analytics ? analytics.totalStores : 0}
                            </p>
                            <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
                                {analytics ? analytics.activeStores : 0} active • {analytics ? analytics.suspendedStores : 0} suspended
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-neutral-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500">Merchants</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center">
                                <Users className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-light tracking-tight text-neutral-900 font-mono">
                                {analytics ? analytics.totalMerchants : 0}
                            </p>
                            <span className="text-[11px] text-neutral-400 font-mono mt-1 block">Registered creators</span>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-neutral-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500">Platform GMV</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-light tracking-tight text-neutral-900 font-mono">
                                ${analytics ? Number(analytics.totalVolume).toFixed(2) : "0.00"}
                            </p>
                            <span className="text-[11px] text-neutral-400 font-mono mt-1 block">Settled transactions</span>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl sm:rounded-3xl border border-neutral-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-neutral-500">Total Orders</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-2xl font-light tracking-tight text-neutral-900 font-mono">
                                {analytics ? analytics.totalOrders : 0}
                            </p>
                            <span className="text-[11px] text-neutral-400 font-mono mt-1 block">Across all stores</span>
                        </div>
                    </div>
                </div>

                {/* Leading Stores Table Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 overflow-hidden">
                    <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-neutral-900">Leading Stores by Volume</h2>
                            <p className="text-xs text-neutral-400 mt-0.5">Top-performing tenant storefronts</p>
                        </div>
                        <Link
                            to="/admin/stores"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-medium text-neutral-900 transition"
                        >
                            <span>Manage Stores</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                        </Link>
                    </div>

                    {analytics && analytics.topStores && analytics.topStores.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-neutral-50/70 text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-100">
                                    <tr>
                                        <th className="py-3 px-5">Store</th>
                                        <th className="py-3 px-4">Merchant</th>
                                        <th className="py-3 px-4">Orders</th>
                                        <th className="py-3 px-4">Revenue</th>
                                        <th className="py-3 px-5 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {analytics.topStores.map((s: any) => (
                                        <tr key={s.id} className="hover:bg-neutral-50/50 transition">
                                            <td className="py-3.5 px-5">
                                                <span className="font-medium text-neutral-900 block">{s.name}</span>
                                                <span className="font-mono text-[11px] text-neutral-400 font-normal">/store/{s.slug}</span>
                                            </td>
                                            <td className="py-3.5 px-4 text-neutral-600">{s.merchant_name}</td>
                                            <td className="py-3.5 px-4 text-neutral-600 font-mono">{s.order_count}</td>
                                            <td className="py-3.5 px-4 font-semibold text-neutral-900 font-mono">
                                                ${Number(s.revenue).toFixed(2)}
                                            </td>
                                            <td className="py-3.5 px-5 text-right">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase border ${
                                                        s.status === "active"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : "bg-rose-50 text-rose-700 border-rose-200"
                                                    }`}
                                                >
                                                    {s.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center text-xs text-neutral-400 font-mono">No store activity recorded yet.</div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};
