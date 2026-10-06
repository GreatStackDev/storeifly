import React from "react";
import { DUMMY_ORDERS } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import { MerchantLayout } from "../../components/MerchantLayout";
import toast from "react-hot-toast";
import { OrderTable, type OrderItem } from "../../components/merchant/orders/OrderTable";
import { OrderDetailModal } from "../../components/merchant/orders/OrderDetailModal";
import { useEffect, useState } from "react";

export const OrdersPage: React.FC = () => {
    const { store } = useAuth();
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [trackingInput, setTrackingInput] = useState("");

    useEffect(() => {
        fetchOrders();
    }, [filterStatus, store]);

    const fetchOrders = () => {
        setLoading(true);
        const storeSlug = store?.slug || "forever";
        let storeOrders = DUMMY_ORDERS.filter((o) => o.store_slug === storeSlug || !store?.slug);
        if (filterStatus !== "all") {
            storeOrders = storeOrders.filter((o) => o.order_status === filterStatus);
        }
        setOrders(storeOrders as any);
        setLoading(false);
    };

    const handleUpdateOrder = (orderId: number, status: string, tracking?: string, payment?: string) => {
        setUpdatingStatus(true);
        setTimeout(() => {
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId
                        ? {
                              ...o,
                              order_status: status,
                              ...(tracking !== undefined && { tracking_number: tracking }),
                              ...(payment !== undefined && { payment_status: payment }),
                          }
                        : o
                )
            );
            if (selectedOrder?.id === orderId) {
                setSelectedOrder((prev) =>
                    prev
                        ? {
                              ...prev,
                              order_status: status,
                              ...(tracking !== undefined && { tracking_number: tracking }),
                              ...(payment !== undefined && { payment_status: payment }),
                          }
                        : null
                );
            }
            toast.success("Order status updated!");
            setUpdatingStatus(false);
        }, 200);
    };

    return (
        <MerchantLayout>
            <div className="space-y-7 font-sans">
                <h1 className="text-xl sm:text-2xl text-neutral-900 mt-10">Orders & Fulfillment</h1>
                <OrderTable
                    orders={orders}
                    loading={loading}
                    filterStatus={filterStatus}
                    onFilterChange={setFilterStatus}
                    onUpdateOrderStatus={(id, status) => handleUpdateOrder(id, status)}
                    onOpenDetails={(o) => {
                        setSelectedOrder(o);
                        setTrackingInput(o.tracking_number || "");
                    }}
                />
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    trackingInput={trackingInput}
                    onTrackingInputChange={setTrackingInput}
                    onUpdateOrder={handleUpdateOrder}
                    updatingStatus={updatingStatus}
                />
            </div>
        </MerchantLayout>
    );
};
