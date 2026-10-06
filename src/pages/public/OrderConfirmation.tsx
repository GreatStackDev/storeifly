import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DUMMY_ORDERS, DUMMY_STORES } from "../../assets/assets";
import { StoreNavbar } from "../../components/StoreNavbar";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getStoreAccentStyles } from "../../utils/storeAccent";

export const OrderConfirmation: React.FC = () => {
    const { storeSlug, orderNumber } = useParams<{ storeSlug: string; orderNumber: string }>();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderNumber) {
            const matchedOrder = DUMMY_ORDERS.find((o) => o.order_number === orderNumber);
            const currentStore = DUMMY_STORES.find((s) => s.slug === storeSlug) || DUMMY_STORES[0];

            if (matchedOrder) {
                setOrder(matchedOrder);
            } else {
                const fallbackOrder = {
                    id: Date.now(),
                    order_number: orderNumber,
                    store_id: currentStore.id,
                    store_slug: currentStore.slug,
                    store_name: currentStore.name,
                    store_logo: currentStore.logo_url,
                    store_accent_color: currentStore.accent_color,
                    customer_name: "Customer",
                    customer_email: "customer@example.com",
                    customer_phone: "+1 (555) 123-4567",
                    items: [
                        {
                            productId: 1,
                            name: "Selected Store Item",
                            price: 50,
                            quantity: 1,
                            variant: "Standard",
                            image: currentStore.banner_url || "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&auto=format&fit=crop&q=80",
                        },
                    ],
                    subtotal: 50,
                    shipping_cost: currentStore.shipping_fee,
                    total: 50 + currentStore.shipping_fee,
                    payment_status: "pending",
                    order_status: "placed",
                    tracking_number: `TRK-${(storeSlug || "ORD").toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
                    shipping_address: {
                        street: "123 Market Street",
                        city: "San Francisco",
                        state: "CA",
                        zip: "94105",
                        country: "United States",
                    },
                    created_at: new Date().toISOString(),
                };
                setOrder(fallbackOrder);
            }
            setLoading(false);
        }
    }, [orderNumber, storeSlug]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-sm">Loading order receipt...</div>
        );
    if (!order)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                <Link to={`/store/${storeSlug}`} className="text-xs font-semibold text-blue-600">
                    Return to Store
                </Link>
            </div>
        );

    const items = Array.isArray(order.items) ? order.items : [];
    const addr = order.shipping_address || {};
    const store = {
        name: order.store_name,
        slug: order.store_slug,
        logo_url: order.store_logo,
        accent_color: order.store_accent_color,
    };

    return (
        <div
            className="min-h-screen text-neutral-900 flex flex-col font-sans"
            style={getStoreAccentStyles(order.store_accent_color)}
        >
            <StoreNavbar store={store} />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-medium tracking-tight text-neutral-900">Thank you for your order</h1>
                    <p className="text-xs text-neutral-500 mt-1">We've received your order and are getting it ready for shipment.</p>
                    <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 rounded-xs text-xs font-mono font-medium text-neutral-800">
                        Order #{order.order_number}
                    </div>
                </div>

                {/* Status */}
                <div className="bg-white rounded-md border border-neutral-200 p-5 mb-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">Status</span>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-xs border uppercase tracking-wide store-accent-pill">
                                {order.order_status}
                            </span>
                        </div>
                        {order.tracking_number && (
                            <div>
                                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider block">
                                    Tracking Code
                                </span>
                                <span className="font-mono text-xs font-medium text-neutral-900 mt-1 block">{order.tracking_number}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Items + Summary */}
                <div className="bg-white rounded-md border border-neutral-200 overflow-hidden mb-6">
                    <div className="p-4 border-b border-neutral-100">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Items Ordered</h2>
                    </div>
                    <div className="divide-y divide-neutral-100 p-4">
                        {items.map((item: any, idx: number) => (
                            <div key={idx} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xs bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200 flex items-center justify-center">
                                        {item.image ? (
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <ShoppingBag className="w-4 h-4 text-neutral-400" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-neutral-900 truncate">{item.name}</p>
                                        <p className="text-[11px] text-neutral-400">
                                            Qty: {item.quantity} {item.variant ? `• ${item.variant}` : ""}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-mono font-medium text-neutral-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price breakdown */}
                    <div className="bg-neutral-50/60 p-4 border-t border-neutral-100 text-xs space-y-2">
                        {[
                            { label: "Subtotal", value: `$${Number(order.subtotal).toFixed(2)}`, cls: "text-neutral-600" },
                            ...(Number(order.discount) > 0
                                ? [
                                      {
                                          label: "Discount",
                                          value: `-$${Number(order.discount).toFixed(2)}`,
                                          cls: "store-accent-text font-medium",
                                      },
                                  ]
                                : []),
                            {
                                label: "Shipping",
                                value: Number(order.shipping_cost) === 0 ? "FREE" : `$${Number(order.shipping_cost).toFixed(2)}`,
                                cls: "text-neutral-600",
                            },
                        ].map(({ label, value, cls }) => (
                            <div key={label} className={`flex justify-between ${cls}`}>
                                <span>{label}</span>
                                <span className="font-mono font-medium text-neutral-900">{value}</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2 border-t border-neutral-200">
                            <span>Total</span>
                            <span className="font-mono font-bold">${Number(order.total).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Address + Payment */}
                    <div className="p-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="font-medium text-neutral-400 uppercase tracking-wider block mb-1 text-[10px]">
                                Delivery To
                            </span>
                            <p className="font-medium text-neutral-900">{order.customer_name}</p>
                            <p className="text-neutral-600">{addr.street}</p>
                            <p className="text-neutral-600">
                                {addr.city}, {addr.state} {addr.zip}
                            </p>
                            <p className="text-neutral-600">{addr.country}</p>
                        </div>
                        <div>
                            <span className="font-medium text-neutral-400 uppercase tracking-wider block mb-1 text-[10px]">
                                Payment Details
                            </span>
                            <p className="text-neutral-900 font-medium">Cash on Delivery (COD)</p>
                            <p className={`mt-1 font-medium ${order.payment_status === "paid" ? "store-accent-text" : "text-amber-700"}`}>
                                Status: {order.payment_status.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        to={`/store/${storeSlug}`}
                        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition"
                    >
                        Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </main>
        </div>
    );
};
