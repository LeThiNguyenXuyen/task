import * as React from 'react';

import { Outlet, createFileRoute } from '@tanstack/react-router';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export const Route = createFileRoute('/_app-layout')({
    component: Layout,
});
