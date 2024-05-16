import * as React from 'react';

import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ToastContainer } from 'react-toastify';

import ThemeProvider from '@/core/components/common/ThemeProvider';
import TryAuthWrapper from '@/core/components/wrapper/TryAuthWrapper';
import { Providers } from '@/core/store/provider';

import '../index.css';
import 'react-toastify/dist/ReactToastify.css';

interface RootLayoutProps {}

const RootLayout: React.FunctionComponent<RootLayoutProps> = () => {
    return (
        <Providers>
            <TryAuthWrapper>
                <ThemeProvider>
                    <Outlet />
                    <ToastContainer closeButton={false} theme="colored" autoClose={4000} limit={2} />
                    <TanStackRouterDevtools position="bottom-right" />
                </ThemeProvider>
            </TryAuthWrapper>
        </Providers>
    );
};

export const Route = createRootRoute({
    component: RootLayout,
});
