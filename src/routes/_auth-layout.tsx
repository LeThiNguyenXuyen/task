import * as React from 'react';

import { Outlet, createFileRoute } from '@tanstack/react-router';

import UnAuthWrapper from '@/core/components/wrapper/UnAuthWrapper';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    return (
        <UnAuthWrapper>
            <Outlet />
        </UnAuthWrapper>
    );
};

export const Route = createFileRoute('/_auth-layout')({
    component: Layout,
});
