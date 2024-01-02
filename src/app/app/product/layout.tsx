"use client";
import { NKRouter } from "@/core/NKRouter";
import { useCart } from "@/core/contexts/CartContext";
import { ShoppingBag } from "akar-icons";
import Link from "next/link";
import * as React from "react";

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps & React.PropsWithChildren> = ({ children }) => {
    const { cart } = useCart();
    return (
        <>
            {children}
            <Link className="fixed right-4 top-4 z-20" href={NKRouter.app.cart()}>
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex justify-center items-center relative">
                    <ShoppingBag className="text-white" size={20} />
                    <span className="w-4 h-4 bg-red-500 text-white flex items-center justify-center absolute -top-1 -right-1 rounded-full text-xs">
                        {cart?.orderItems.length || 0}
                    </span>
                </div>
            </Link>
        </>
    );
};

export default Layout;
