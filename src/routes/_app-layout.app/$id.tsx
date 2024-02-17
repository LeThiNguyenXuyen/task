import React from 'react';

import { createFileRoute, useParams } from '@tanstack/react-router';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const { id } = Route.useParams();

    return <div>Dynamic Dashboard Page, wtf hell Param: {id}</div>;
};

export const Route = createFileRoute('/_app-layout/app/$id')({
    component: Page,
});
