import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public pages
import { LandingPage } from "./pages/public/LandingPage";
import { Storefront } from "./pages/public/Storefront";
import { AllProducts } from "./pages/public/AllProducts";
import { ProductDetail } from "./pages/public/ProductDetail";
import { CartPage } from "./pages/public/CartPage";
import { CheckoutPage } from "./pages/public/CheckoutPage";
import { OrderConfirmation } from "./pages/public/OrderConfirmation";
import { CustomerAuth } from "./pages/public/CustomerAuth";
import { CustomerOrders } from "./pages/public/CustomerOrders";

// Merchant pages
import { MerchantLogin } from "./pages/merchant/MerchantLogin";
import { StoreSetup } from "./pages/merchant/StoreSetup";
import { MerchantDashboard } from "./pages/merchant/MerchantDashboard";
import { ProductsPage } from "./pages/merchant/ProductsPage";
import { CategoriesPage } from "./pages/merchant/CategoriesPage";
import { OrdersPage } from "./pages/merchant/OrdersPage";
import { SettingsPage } from "./pages/merchant/SettingsPage";

// Admin pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { StoresManagement } from "./pages/admin/StoresManagement";
import { MerchantsManagement } from "./pages/admin/MerchantsManagement";

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
                <Routes>
                    {/* Platform Landing */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Customer Storefront (Tenant-isolated) */}
                    <Route path="/store/:storeSlug" element={<Storefront />} />
                    <Route path="/store/:storeSlug/products" element={<AllProducts />} />
                    <Route path="/store/:storeSlug/products/:productId" element={<ProductDetail />} />
                    <Route path="/store/:storeSlug/cart" element={<CartPage />} />
                    <Route path="/store/:storeSlug/checkout" element={<CheckoutPage />} />
                    <Route path="/store/:storeSlug/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                    <Route path="/store/:storeSlug/login" element={<CustomerAuth />} />
                    <Route path="/store/:storeSlug/orders" element={<CustomerOrders />} />

                    {/* Merchant Portal */}
                    <Route path="/merchant/login" element={<MerchantLogin initialMode="login" />} />
                    <Route path="/merchant/register" element={<MerchantLogin initialMode="register" />} />
                    <Route
                        path="/merchant/store-setup"
                        element={
                            <ProtectedRoute allowedRoles={["merchant", "customer", "user"]} redirectTo="/merchant/login">
                                <StoreSetup />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant"
                        element={
                            <ProtectedRoute allowedRoles={["merchant"]} redirectTo="/merchant/login">
                                <MerchantDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant/products"
                        element={
                            <ProtectedRoute allowedRoles={["merchant"]} redirectTo="/merchant/login">
                                <ProductsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant/categories"
                        element={
                            <ProtectedRoute allowedRoles={["merchant"]} redirectTo="/merchant/login">
                                <CategoriesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant/orders"
                        element={
                            <ProtectedRoute allowedRoles={["merchant"]} redirectTo="/merchant/login">
                                <OrdersPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/merchant/settings"
                        element={
                            <ProtectedRoute allowedRoles={["merchant"]} redirectTo="/merchant/login">
                                <SettingsPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Platform Super Admin */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/stores"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                                <StoresManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/merchants"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                                <MerchantsManagement />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </CartProvider>
        </AuthProvider>
    );
}
