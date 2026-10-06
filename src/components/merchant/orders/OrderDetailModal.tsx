import React from "react";
import { X } from "lucide-react";
import type { OrderItem } from "./OrderTable";

interface OrderDetailModalProps {
    order: OrderItem | null;
    onClose: () => void;
    trackingInput: string;
    onTrackingInputChange: (val: string) => void;
    onUpdateOrder: (orderId: number, status: string, tracking?: string, payment?: string) => void;
    updatingStatus: boolean;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
    order,
    onClose,
    trackingInput,
    onTrackingInputChange,
    onUpdateOrder,
    updatingStatus,
}) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
            <div className="bg-white rounded-4xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-neutral-200/80">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
                    <div>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">Order Details</span>
                        <h3 className="text-base font-bold text-neutral-900 font-mono">{order.order_number}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Customer & Address */}
                <div className="bg-neutral-50/80 p-4 rounded-2xl text-xs space-y-1.5 mb-5 border border-neutral-200/80">
                    <span className="font-semibold text-neutral-400 uppercase text-[10px] tracking-wider block mb-1">
                        Shipping Destination
                    </span>
                    <p className="font-semibold text-neutral-900">{order.customer_name}</p>
                    <p className="text-neutral-600">{order.shipping_address?.street}</p>
                    <p className="text-neutral-600">
                        {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zip}
                    </p>
                    <p className="text-neutral-400 text-[11px] pt-1 font-mono">
                        {order.customer_email} {order.customer_phone ? `• ${order.customer_phone}` : ""}
                    </p>
                </div>

                {/* Items */}
                <div className="mb-5">
                    <h4 className="text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Line Items</h4>
                    <div className="divide-y divide-neutral-100 text-xs">
                        {(order.items || []).map((it: any, i: number) => (
                            <div key={i} className="py-2.5 flex justify-between items-center">
                                <div>
                                    <span className="font-medium text-neutral-900">{it.name}</span>
                                    <span className="text-neutral-400 font-mono ml-1">× {it.quantity}</span>
                                    {it.variant && <span className="block text-[11px] text-neutral-500">{it.variant}</span>}
                                </div>
                                <span className="font-mono font-medium text-neutral-900">${(it.price * it.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Totals */}
                <div className="border-t border-neutral-100 pt-3.5 text-xs space-y-1.5 text-neutral-600 mb-5">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-mono font-medium text-neutral-900">${Number(order.subtotal).toFixed(2)}</span>
                    </div>
                    {Number(order.discount) > 0 && (
                        <div className="flex justify-between text-emerald-700">
                            <span>Discount:</span>
                            <span className="font-mono font-medium">-${Number(order.discount).toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span className="font-mono font-medium text-neutral-900">${Number(order.shipping_cost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-2.5 border-t border-neutral-200">
                        <span>Grand Total:</span>
                        <span className="font-mono font-bold">${Number(order.total).toFixed(2)}</span>
                    </div>
                </div>

                {/* Tracking Update */}
                <div className="border-t border-neutral-100 pt-4 space-y-3.5">
                    <div>
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1.5">Carrier Tracking Code</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="e.g. 1Z9999999999999999"
                                value={trackingInput}
                                onChange={(e) => onTrackingInputChange(e.target.value)}
                                className="flex-1 px-3.5 py-2 text-xs border border-neutral-200 rounded-full font-mono bg-neutral-50/50 focus:outline-none focus:border-neutral-900"
                            />
                            <button
                                type="button"
                                onClick={() => onUpdateOrder(order.id, order.order_status, trackingInput)}
                                disabled={updatingStatus}
                                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition cursor-pointer disabled:opacity-50 shadow-xs shadow-emerald-700/20"
                            >
                                {updatingStatus ? "Saving..." : "Save Code"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                            <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                                Payment Status
                            </label>
                            <select
                                value={order.payment_status}
                                onChange={(e) => onUpdateOrder(order.id, order.order_status, order.tracking_number, e.target.value)}
                                className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-full bg-neutral-50/50 uppercase font-mono font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium text-neutral-400 uppercase tracking-wider mb-1">
                                Fulfillment Status
                            </label>
                            <select
                                value={order.order_status}
                                onChange={(e) => onUpdateOrder(order.id, e.target.value, order.tracking_number)}
                                className="w-full px-3 py-1.5 text-xs border border-neutral-200 rounded-full bg-neutral-50/50 uppercase font-mono font-medium focus:outline-none focus:border-neutral-900 cursor-pointer"
                            >
                                <option value="placed">Placed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
