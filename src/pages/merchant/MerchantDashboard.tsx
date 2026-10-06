import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DUMMY_MERCHANT_ANALYTICS } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { MerchantLayout } from "../../components/MerchantLayout";
import { DollarSign, ShoppingBag, TrendingUp, Package, AlertTriangle, ExternalLink, ArrowUpRight, Plus } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";

export const MerchantDashboard: React.FC = () => {
    const { store } = useAuth();
    const [analytics, setAnalytics] = useState<any>(DUMMY_MERCHANT_ANALYTICS);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAnalytics(DUMMY_MERCHANT_ANALYTICS);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <MerchantLayout>
                <Spinner padded />
            </MerchantLayout>
        );
    }

    return (
        <MerchantLayout>
            <div className="space-y-7">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-xl sm:text-2xl text-neutral-900 mt-10">Merchant Dashboard</h1>

                    {store && (
                        <div className="flex items-center gap-2.5">
                            <Link
                                to="/merchant/products"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition cursor-pointer shadow-xs shadow-emerald-700/20"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Product</span>
                            </Link>
                            <Link
                                to={`/store/${store.slug}`}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-medium rounded-full transition"
                            >
                                <span>View Storefront</span>
                                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Revenue */}
                    <div className="bg-white p-5 rounded-3xl border border-neutral-200/80">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Total Sales</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold font-mono text-neutral-900 mt-2">
                            ${analytics ? Number(analytics.totalRevenue).toFixed(2) : "0.00"}
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">From paid transactions</span>
                    </div>

                    {/* Total Orders */}
                    <div className="bg-white p-5 rounded-3xl border border-neutral-200/80">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Total Orders</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold font-mono text-neutral-900 mt-2">{analytics ? analytics.totalOrders : 0}</p>
                        <span className="text-[10px] text-amber-600 mt-1 block font-medium">
                            {analytics ? analytics.pendingOrders : 0} awaiting fulfillment
                        </span>
                    </div>

                    {/* Average Order Value */}
                    <div className="bg-white p-5 rounded-3xl border border-neutral-200/80">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Avg Order</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold font-mono text-neutral-900 mt-2">
                            ${analytics ? Number(analytics.averageOrderValue).toFixed(2) : "0.00"}
                        </p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">Per checkout order</span>
                    </div>

                    {/* Catalog & Inventory */}
                    <div className="bg-white p-5 rounded-3xl border border-neutral-200/80">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Products</span>
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                                <Package className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold font-mono text-neutral-900 mt-2">{analytics ? analytics.totalProducts : 0}</p>
                        <span className="text-[10px] text-neutral-500 mt-1 block">
                            {analytics && analytics.lowStockCount > 0 ? (
                                <span className="text-rose-600 font-medium flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> {analytics.lowStockCount} low stock
                                </span>
                            ) : (
                                "Inventory healthy"
                            )}
                        </span>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-3xl border border-neutral-200/80 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                        <h2 className="font-medium text-neutral-900">Recent Orders</h2>
                        <Link
                            to="/merchant/orders"
                            className="text-xs font-medium text-neutral-700 hover:text-black flex items-center gap-1 transition"
                        >
                            <span>View All</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {analytics && analytics.recentOrders && analytics.recentOrders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-neutral-50/70 text-neutral-400 font-medium border-b border-neutral-100">
                                    <tr>
                                        <th className="p-3.5 pl-6">Order</th>
                                        <th className="p-3.5">Customer</th>
                                        <th className="p-3.5">Total</th>
                                        <th className="p-3.5">Payment</th>
                                        <th className="p-3.5">Fulfillment</th>
                                        <th className="p-3.5 pr-6 text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {analytics.recentOrders.map((o: any) => (
                                        <tr key={o.id} className="hover:bg-neutral-50/50 transition">
                                            <td className="p-3.5 pl-6 font-mono font-medium text-neutral-900">{o.order_number}</td>
                                            <td className="p-3.5 text-neutral-700">{o.customer_name}</td>
                                            <td className="p-3.5 font-mono font-medium text-neutral-900">${Number(o.total).toFixed(2)}</td>
                                            <td className="p-3.5">
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase border ${
                                                        o.payment_status === "paid"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                    }`}
                                                >
                                                    {o.payment_status}
                                                </span>
                                            </td>
                                            <td className="p-3.5">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700 border border-neutral-200">
                                                    {o.order_status}
                                                </span>
                                            </td>
                                            <td className="p-3.5 pr-6 text-right text-neutral-400 text-[11px] font-mono">
                                                {new Date(o.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center text-xs text-neutral-400 font-mono">
                            No orders placed yet. Share your store link to start receiving orders!
                        </div>
                    )}
                </div>
            </div>
        </MerchantLayout>
    );
};
