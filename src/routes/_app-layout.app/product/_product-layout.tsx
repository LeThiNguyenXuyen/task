import * as React from 'react';

import { Outlet, createFileRoute } from '@tanstack/react-router';
import { ShoppingBag } from 'akar-icons';

import { NKRouter } from '@/core/NKRouter';
import { useCart } from '@/core/contexts/CartContext';
import { NKLink } from '@/core/routing/components/NKLink';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    const { cart } = useCart();
    return (
        <>
            <Outlet />
            <NKLink className="fixed right-4 top-4 z-20" href={NKRouter.app.cart()}>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                    <ShoppingBag className="text-white" size={20} />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {cart?.orderItems.length || 0}
                    </span>
                </div>
            </NKLink>
        </>
    );
};

export const Route = createFileRoute('/_app-layout/app/product/_product-layout')({
    component: Layout,
});
