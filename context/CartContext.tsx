"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { toast } from "sonner";

import { useAuth } from "./AuthContext";
import { useAuthApi } from "@/hooks/useAuthApi";
import { Cart, CartItem } from "@/types/cart";
import { useRouter } from "next/navigation";

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    refreshCart: () => Promise<void>;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    placeOrder: (addressId: string) => Promise<void>;
    checkInCart: (productId: string) => Boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const api = useAuthApi();

    const { user } = useAuth();

    const router = useRouter();

    const [cart, setCart] = useState<Cart | null>(null);

    const [loading, setLoading] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const refreshCart = async () => {
        if (refreshing) return;
        if (!user) {
            setCart(null);
            return;
        }

        if (user.role !== "CUSTOMER") {
            setCart(null);
            return;
        }

        try {
            setRefreshing(true);
            const res = await api.get("/api/customer/cart");

            setCart(res.data.cart);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong. Unable to fetch cart");
            setCart(null);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        refreshCart();
    }, [user]);

    const addToCart = async (productId: string, quantity = 1) => {
        if (user?.role !== "CUSTOMER") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const res = await api.post(`/api/customer/cart/item/add`, {
                productId,
                quantity,
            });

            // setCart(res.data.cart);
            refreshCart();

            toast.success("Added to cart.");
        } catch (err) {
            toast.error("Unable to add item.");
        } finally {
            setLoading(false);
        }
    };

    const updateCartQuantity = async (productId: string, quantity: number) => {
        if (user?.role !== "CUSTOMER") {
            setCart(null);
            return;
        }

        if (loading) return;

        if (quantity <= 0) {
            removeFromCart(productId);

            return;
        }
        setLoading(true);
        try {
            const res = await api.patch(`/api/customer/cart/item/${productId}`, {
                quantity,
            });

            // setCart(res.data.cart);
            refreshCart();
        } catch {
            toast.error("Failed to update quantity.");
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId: string) => {
        if (user?.role !== "CUSTOMER") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const res = await api.delete(`/api/customer/cart/item/${productId}`);

            // setCart(res.data.cart);
            refreshCart();

            toast.success("Item removed.");
        } catch {
            toast.error("Unable to remove item.");
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (user?.role !== "CUSTOMER") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            await api.delete("/api/customer/cart/clear");

            // setCart(null);
            refreshCart();

            toast.success("Cart cleared.");
        } catch {
            toast.error("Unable to clear cart.");
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async (addressId: string) => {
        if (user?.role !== "CUSTOMER") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            await api.post("/api/customer/order/placeOrder", {
                addressId,
                paymentMethod: "COD",
            });

            toast.success("Order placed successfully.");
            router.push("/dashboard/orders");
            refreshCart();
        } catch {
            toast.error("Unable to place order.");
        } finally {
            setLoading(false);
        }
    };

    const checkInCart = (productId: string) => {
        if (cart?.items) {
            for (let item of cart?.items) {
                if (item.product._id === productId) {
                    return true;
                }
            }
        }
        return false;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                refreshCart,
                addToCart,
                updateCartQuantity,
                removeFromCart,
                clearCart,
                placeOrder,
                checkInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider.");
    }

    return context;
}
