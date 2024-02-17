import { createFileRoute } from '@tanstack/react-router';

const Page = () => {
    return <div>Dashboard Analytics</div>;
};

export const Route = createFileRoute('/_app-layout/app/analytics')({
    component: Page,
});
