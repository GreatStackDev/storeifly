import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    variant?: string;
    stock: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (productId: number, variant: string | undefined, delta: number) => void;
    removeFromCart: (productId: number, variant: string | undefined) => void;
    clearCart: () => void;
    subtotal: number;
    itemsCount: number;
    storeSlug: string;
    setStoreSlug: (slug: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [storeSlug, setStoreSlug] = useState<string>("");
    const [cart, setCart] = useState<CartItem[]>([]);

    // Sync with localStorage when storeSlug changes
    useEffect(() => {
        if (!storeSlug) return;
        try {
            const saved = localStorage.getItem(`storeifly_cart_${storeSlug}`);
            if (saved) {
                setCart(JSON.parse(saved));
            } else {
                setCart([]);
            }
        } catch {
            setCart([]);
        }
    }, [storeSlug]);

    // Save to localStorage
    useEffect(() => {
        if (!storeSlug) return;
        localStorage.setItem(`storeifly_cart_${storeSlug}`, JSON.stringify(cart));
    }, [cart, storeSlug]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex((i) => i.productId === item.productId && i.variant === item.variant);
            if (existingIndex > -1) {
                const updated = [...prev];
                const newQty = Math.min(updated[existingIndex].quantity + item.quantity, item.stock);
                updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
                return updated;
            } else {
                return [...prev, item];
            }
        });
    };

    const updateQuantity = (productId: number, variant: string | undefined, delta: number) => {
        setCart((prev) => {
            return prev
                .map((item) => {
                    if (item.productId === productId && item.variant === variant) {
                        const newQty = item.quantity + delta;
                        if (newQty <= 0) return null;
                        return { ...item, quantity: Math.min(newQty, item.stock) };
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[];
        });
    };

    const removeFromCart = (productId: number, variant: string | undefined) => {
        setCart((prev) => prev.filter((item) => !(item.productId === productId && item.variant === variant)));
    };

    const clearCart = () => {
        setCart([]);
        if (storeSlug) {
            localStorage.removeItem(`storeifly_cart_${storeSlug}`);
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                subtotal,
                itemsCount,
                storeSlug,
                setStoreSlug,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
