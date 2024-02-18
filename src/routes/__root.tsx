import * as React from 'react';

import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ToastContainer } from 'react-toastify';

import ThemeProvider from '@/core/components/common/ThemeProvider';
import MainLayout from '@/core/components/layout/MainLayout';
import TryAuthWrapper from '@/core/components/wrapper/TryAuthWrapper';
import { CartProvider } from '@/core/contexts/CartContext';
import NKLink from '@/core/routing/components/NKLink';
import { Providers } from '@/core/store/provider';

import '../index.css';
import 'react-toastify/dist/ReactToastify.css';

interface RootLayoutProps {}

const RootLayout: React.FunctionComponent<RootLayoutProps> = () => {
    return (
        <Providers>
            <TryAuthWrapper>
                <ThemeProvider>
                    <CartProvider>
                        <MainLayout>
                            <Outlet />
                        </MainLayout>
                    </CartProvider>
                    <ToastContainer closeButton={false} theme="colored" autoClose={4000} limit={2} />
                    {/* <TanStackRouterDevtools position="bottom-right" /> */}
                    {/* </DynamicLayout> */}
                </ThemeProvider>
            </TryAuthWrapper>
        </Providers>
    );
};

export const Route = createRootRoute({
    component: RootLayout,
    notFoundComponent(props) {
        return (
            <div className="bg-primary/50 flex h-[1000px] w-full flex-col items-center justify-center text-black">
                <h1 className="text-[100px] font-black">ERROR 404</h1>
                <p className="mb-10 text-[25px]">Page not Found, please o back</p>
                <NKLink href="/">
                    <div className="bg-primary flex h-[88px] w-[272px] items-center justify-center text-[15px]">Back To Home</div>
                </NKLink>
            </div>
        );
    },
});
