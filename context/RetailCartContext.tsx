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
import { useRouter } from "next/navigation";
import { RetailCart, RetailCartItem } from "@/types/retailCart";


interface RetailCartContextType {

    cart: RetailCart | null;
    loading: boolean;
    refreshCart: () => Promise<void>;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    placeOrder: (addressId: string) => Promise<void>;
    placeOrderSalesman: (address: {
            fullName: string
            mobile: string
            addressLine1: string
            addressLine2: string
            city: string
            state: string
            pincode: string
            country: string
        },
        retailerId: string) => Promise<void>;
    checkInCart: (productId: string) => Boolean;
    getItemFromCart: (productId: string) => RetailCartItem | null;
}

const RetailCartContext =
    createContext<RetailCartContextType | null>(
        null
    );


export function RetailCartProvider({
    children,
}: {
    children: ReactNode;
}) {

    const api = useAuthApi();

    const { user } = useAuth();

    const router = useRouter();

    const [cart, setCart] = useState<RetailCart | null>(null);

    const [loading, setLoading] = useState(false);
    
    const refreshCart = async () => {

        if (!user) {
            setCart(null);
            return;
        }

        if (user?.role !== "RETAILER" && user?.role !== "SALESMAN") {
            setCart(null);
            return;
        }

        if(user.role == "RETAILER" && user.isApproved == false){
            setCart(null);
            return;
        }

        try {
            setLoading(true);
            let url = "";
            if(user.role == "RETAILER") url = "/api/retailer/cart"
            else if(user.role == "SALESMAN") url = "/api/salesman/cart"
            const res = await api.get(url);

            setCart(res.data.cart);

        } catch (err) {
            console.log(err)
            toast.error("Something went wrong. Unable to fetch cart")
            setCart(null);

        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {



        refreshCart();

    }, [user]);


    const addToCart = async (
        productId: string,
        quantity = 1
    ) => {
        if (user?.role !== "RETAILER" && user?.role !== "SALESMAN") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true)
        try {
            let url = "";
            if(user.role == "RETAILER") url = "/api/retailer/cart/"
            else if(user.role == "SALESMAN") url = "/api/salesman/cart/"
            const res = await api.post(url,
                {
                    productId,
                    quantity,
                }
            );

            // setCart(res.data.cart);
            refreshCart();

            toast.success(
                "Added to cart."
            );

        } catch (err) {

            toast.error(
                "Unable to add item."
            );

        } finally {
            setLoading(false)
        }

    };


    const updateCartQuantity = async (
        productId: string,
        quantity: number
    ) => {
        if (user?.role !== "RETAILER" && user?.role !== "SALESMAN") {
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
            let url = "";
            if(user.role == "RETAILER") url = `/api/retailer/cart/${productId}`
            else if(user.role == "SALESMAN") url = `/api/salesman/cart/${productId}`

            const res = await api.patch(url,{
                        quantity,
                    }
                );

            // setCart(res.data.cart);
            refreshCart();

        } catch {

            toast.error(
                "Failed to update quantity."
            );

        } finally {
            setLoading(false);
        }

    };


    const removeFromCart = async (
        productId: string
    ) => {
        if (user?.role !== "RETAILER" && user?.role !== "SALESMAN") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true)
        try {
            let url = "";
            if(user.role == "RETAILER") url = `/api/retailer/cart/${productId}`
            else if(user.role == "SALESMAN") url = `/api/salesman/cart/${productId}`

        
            const res =
                await api.delete(url);

            // setCart(res.data.cart);
            refreshCart();

            toast.success(
                "Item removed."
            );

        } catch {

            toast.error(
                "Unable to remove item."
            );

        } finally {
            setLoading(false);
        }

    };


    const clearCart = async () => {
        if (user?.role !== "RETAILER" && user?.role !== "SALESMAN") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true)
        try {
            let url = "";
            if(user.role == "RETAILER") url = `/api/retailer/cart`
            else if(user.role == "SALESMAN") url = `/api/salesman/cart`

            await api.delete(url);

            // setCart(null);
            refreshCart();

            toast.success(
                "Cart cleared."
            );

        } catch {

            toast.error(
                "Unable to clear cart."
            );

        } finally {
            setLoading(false);
        }

    };


    const placeOrder = async (
        addressId: string
    ) => {
        if (user?.role !== "RETAILER") {
            setCart(null);
            return;
        }
        if (loading) return;
        setLoading(true)
        try {
            let url = "";
            if(user.role == "RETAILER") url = `/api/retailer/cart/place-order`
            else if(user.role == "SALESMAN") url = `/api/salesman/cart/place-order`

            await api.post(url,{
                    addressId,
                    paymentMethod: "COD"
                }
            );

            toast.success(
                "Order placed successfully."
            );
            router.push("/dashboard/orders")
            refreshCart();

        } catch {

            toast.error(
                "Unable to place order."
            );

        } finally {
            setLoading(false)
        }

    };
    
    const placeOrderSalesman = async (
        address: {
            fullName: string
            mobile: string
            addressLine1: string
            addressLine2: string
            city: string
            state: string
            pincode: string
            country: string
        },
        retailerId: string
    ) => {
        if (user?.role !== "SALESMAN") {
            setCart(null);
            return;
        }
        if (loading) return;
        if(!retailerId) return;
        setLoading(true)
        try {
            let url = "";
            if(user.role == "SALESMAN") url = `/api/salesman/cart/place-order`

            await api.post(url,{
                    retailerId,
                    paymentMethod: "COD",
                    ...address
                }
            );

            toast.success(
                "Order placed successfully."
            );
            router.push("/dashboard/orders")
            refreshCart();

        } catch {

            toast.error(
                "Unable to place order."
            );

        } finally {
            setLoading(false)
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
    }
   
    const getItemFromCart = (productId: string) => {
        if (cart?.items) {
            for (let item of cart?.items) {
                if (item.product._id === productId) {
                    return item;
                }
            }
        }
        return null;
    }

    return (
        <RetailCartContext.Provider
            value={{
                cart,
                loading,
                refreshCart,
                addToCart,
                updateCartQuantity,
                removeFromCart,
                clearCart,
                placeOrder,
                placeOrderSalesman,
                checkInCart,
                getItemFromCart
            }}
        >
            {children}
        </RetailCartContext.Provider>
    );

}

export function useRetailCart() {

    const context =
        useContext(RetailCartContext);

    if (!context) {

        throw new Error(
            "useRetailCart must be used inside RetailCartProvider."
        );

    }

    return context;

}