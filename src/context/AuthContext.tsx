import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
    id: number | string;
    name: string;
    email: string;
    role: "admin" | "merchant" | "customer" | string;
    store_id?: number | string | null;
}

export interface Store {
    id: number | string;
    merchant_id: string | number;
    name: string;
    slug: string;
    logo_url?: string;
    banner_url?: string;
    description?: string;
    currency: string;
    status: "active" | "suspended";
    shipping_fee: number;
    free_shipping_threshold: number;
    hero_style?: "hero1" | "hero2" | "hero3" | "hero4" | string;
    accent_color?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    store: Store | null;
    loading: boolean;
    login: (token: string, user: User, store?: Store | null) => void;
    logout: () => void;
    refreshMe: () => Promise<void>;
    setStore: (store: Store | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("storeifly_token"));
    const [store, setStore] = useState<Store | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshMe = async () => {
        const savedToken = localStorage.getItem("storeifly_token");
        const savedUser = localStorage.getItem("storeifly_user");
        const savedStore = localStorage.getItem("storeifly_store");

        if (savedToken && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                if (savedStore) setStore(JSON.parse(savedStore));
            } catch {
                setUser(null);
                setStore(null);
            }
        } else {
            setUser(null);
            setStore(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        refreshMe();
    }, []);

    const login = (newToken: string, newUser: User, newStore?: Store | null) => {
        localStorage.setItem("storeifly_token", newToken);
        localStorage.setItem("storeifly_user", JSON.stringify(newUser));
        if (newStore !== undefined && newStore !== null) {
            localStorage.setItem("storeifly_store", JSON.stringify(newStore));
        } else {
            localStorage.removeItem("storeifly_store");
        }
        setToken(newToken);
        setUser(newUser);
        if (newStore !== undefined) {
            setStore(newStore);
        }
    };

    const logout = () => {
        localStorage.removeItem("storeifly_token");
        localStorage.removeItem("storeifly_user");
        localStorage.removeItem("storeifly_store");
        setToken(null);
        setUser(null);
        setStore(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, store, loading, login, logout, refreshMe, setStore }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
