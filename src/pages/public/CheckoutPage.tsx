import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { DUMMY_STORES } from "../../assets/assets";
import { StoreNavbar } from "../../components/StoreNavbar";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { CheckoutContactForm } from "../../components/public/checkout/CheckoutContactForm";
import { CheckoutShippingForm, type ShippingAddress } from "../../components/public/checkout/CheckoutShippingForm";
import { CheckoutOrderSummary } from "../../components/public/checkout/CheckoutOrderSummary";
import { getStoreAccentStyles } from "../../utils/storeAccent";

export const CheckoutPage: React.FC = () => {
    const { storeSlug } = useParams<{ storeSlug: string }>();
    const { cart, subtotal, clearCart, setStoreSlug } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form inputs
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [address, setAddress] = useState<ShippingAddress>({
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
    });

    useEffect(() => {
        if (storeSlug) {
            setStoreSlug(storeSlug);
            const currentStore = DUMMY_STORES.find((s) => s.slug === storeSlug) || DUMMY_STORES[0];
            setStore(currentStore);
            if (user) {
                setCustomerName(user.name || "");
                setCustomerEmail(user.email || "");
            }
            setLoading(false);
        }
    }, [storeSlug, user, setStoreSlug]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-sm">Loading checkout...</div>;
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <Link
                    to={`/store/${storeSlug}`}
                    className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition"
                >
                    Back to Store
                </Link>
            </div>
        );
    }

    const freeThreshold = store ? Number(store.free_shipping_threshold) || 0 : 0;
    const baseShippingFee = store ? Number(store.shipping_fee) || 0 : 0;
    const isFreeShipping = freeThreshold > 0 && subtotal >= freeThreshold;
    const shippingCost = isFreeShipping ? 0 : baseShippingFee;
    const grandTotal = subtotal + shippingCost;

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!customerName.trim() || !customerEmail.trim()) {
            toast.error("Please enter your name and email");
            return;
        }

        if (!address.street.trim() || !address.city.trim() || !address.zip.trim()) {
            toast.error("Please fill out complete shipping address");
            return;
        }

        setSubmitting(true);
        setTimeout(() => {
            const dummyOrderNumber = `ORD-${(storeSlug || "STORE").toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
            clearCart();
            toast.success("Order placed successfully!");
            setSubmitting(false);
            navigate(`/store/${storeSlug}/order-confirmation/${dummyOrderNumber}`);
        }, 400);
    };

    return (
        <div
            className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans"
            style={getStoreAccentStyles(store?.accent_color)}
        >
            {store && <StoreNavbar store={store} />}

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
                <button
                    onClick={() => navigate(`/store/${storeSlug}/cart`)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Cart
                </button>

                <h1 className="text-xl font-medium tracking-tight text-neutral-900 mb-6">Checkout</h1>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Customer, Shipping, Payment */}
                    <div className="lg:col-span-2 space-y-5">
                        <CheckoutContactForm
                            customerName={customerName}
                            onCustomerNameChange={setCustomerName}
                            customerEmail={customerEmail}
                            onCustomerEmailChange={setCustomerEmail}
                            customerPhone={customerPhone}
                            onCustomerPhoneChange={setCustomerPhone}
                        />
                        <CheckoutShippingForm address={address} onAddressChange={setAddress} />
                    </div>

                    {/* Right: Order Summary */}
                    <div className="space-y-4">
                        <CheckoutOrderSummary
                            cart={cart}
                            subtotal={subtotal}
                            shippingCost={shippingCost}
                            isFreeShipping={isFreeShipping}
                            grandTotal={grandTotal}
                            submitting={submitting}
                        />
                    </div>
                </form>
            </main>
        </div>
    );
};
