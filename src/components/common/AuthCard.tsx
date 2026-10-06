import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DUMMY_USERS, DUMMY_STORES } from "../../assets/assets";
import { useAuth, type User as AuthUserType } from "../../context/AuthContext";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

export interface AuthSuccessData {
    token: string;
    user: AuthUserType;
    store?: any;
    mode: "login" | "register";
}

export interface AuthCardProps {
    role?: "admin" | "merchant" | "customer";
    initialMode?: "login" | "register";
    allowRegister?: boolean;
    storeId?: number | string;
    storeSlug?: string;
    onSuccess?: (data: AuthSuccessData) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ role, initialMode = "login", allowRegister = true, storeId, storeSlug, onSuccess }) => {
    const [mode, setMode] = useState<"login" | "register">(allowRegister ? initialMode : "login");
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const isRegister = allowRegister && mode === "register";
    const effectiveRole = role || (storeSlug || storeId ? "customer" : "merchant");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const email = form.email.trim().toLowerCase();
        const matchedUser = DUMMY_USERS.find((u) => u.email === email && (!effectiveRole || u.role === effectiveRole));
        const matchedStore = storeSlug
            ? DUMMY_STORES.find((s) => s.slug === storeSlug)
            : storeId
            ? DUMMY_STORES.find((s) => s.id === Number(storeId))
            : matchedUser?.store_id
            ? DUMMY_STORES.find((s) => s.id === matchedUser.store_id)
            : effectiveRole === "merchant"
            ? DUMMY_STORES[0]
            : null;

        let determinedRole: string = effectiveRole;
        if (email.includes("admin@") || matchedUser?.role === "admin") {
            determinedRole = "admin";
        } else if (effectiveRole === "merchant" || matchedUser?.role === "merchant") {
            determinedRole = "merchant";
        } else {
            determinedRole = "customer";
        }

        const authUser: AuthUserType = matchedUser
            ? { ...matchedUser, role: determinedRole }
            : {
                  id: Date.now(),
                  name: form.name.trim() || email.split("@")[0] || "Demo User",
                  email: email || "demo@storeifly.com",
                  role: determinedRole as any,
                  store_id: determinedRole === "admin" ? null : (matchedStore?.id || null),
              };

        if (!isRegister && effectiveRole === "admin" && authUser.role !== "admin") {
            toast.error("Access denied: You do not have platform admin privileges");
            setLoading(false);
            return;
        }

        const dummyToken = `dummy_token_${Date.now()}`;

        setTimeout(() => {
            setLoading(false);
            toast.success(isRegister ? "Account created successfully!" : "Signed in successfully!");

            if (onSuccess) {
                onSuccess({ token: dummyToken, user: authUser, store: matchedStore, mode });
            } else {
                login(dummyToken, authUser, matchedStore as any);
                if (authUser.role === "admin") {
                    navigate("/admin");
                } else if (authUser.role === "merchant" || effectiveRole === "merchant") {
                    navigate(matchedStore ? "/merchant" : "/merchant/store-setup");
                } else if (storeSlug) {
                    navigate(`/store/${storeSlug}`);
                } else {
                    navigate("/");
                }
            }
        }, 300);
    };

    const inputClasses =
        "w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50/70 border border-neutral-200 rounded-xl focus:outline-none focus:border-[var(--store-accent)] focus:ring-1 focus:ring-[var(--store-accent-ring)] transition text-neutral-900 placeholder-neutral-400";

    return (
        <div className="w-full max-w-sm bg-white rounded-4xl border border-neutral-200/90 p-8 sm:p-9 shadow-xs">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeftIcon className="size-5 text-neutral-600" />
                <p className="text-xs text-neutral-600 hover:text-neutral-900">Go Back</p>
            </div>

            <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl tracking-tight text-neutral-900">{isRegister ? "Create Account" : "Welcome Back"}</h1>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {isRegister ? "Create an account to get started." : "Enter your credentials to access your account."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1.5">Full Name</label>
                        <div className="relative">
                            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                required
                                placeholder="Alex Morgan"
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                        {effectiveRole === "admin" ? "Admin Email" : "Email Address"}
                    </label>
                    <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="email"
                            required
                            placeholder={effectiveRole === "admin" ? "admin@example.com" : "you@example.com"}
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">Password</label>
                    <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                            className={`${inputClasses} pr-10 font-mono`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-5 text-white text-xs font-semibold rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-xs active:scale-[0.98] store-accent-btn"
                >
                    <span>{loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="mt-2">
                    {!allowRegister ? null : isRegister ? (
                        <p className="text-xs text-neutral-500 text-center">
                            Already have an account?{" "}
                            <span onClick={() => setMode("login")} className="font-semibold cursor-pointer store-accent-text">
                                Sign In
                            </span>
                        </p>
                    ) : (
                        <p className="text-xs text-neutral-500 text-center">
                            Don't have an account?{" "}
                            <span onClick={() => setMode("register")} className="font-semibold cursor-pointer store-accent-text">
                                Create Account
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};
