import { createFileRoute } from '@tanstack/react-router';

const Dashboard = () => {
    return <div>Dashboard</div>;
};

export const Route = createFileRoute('/_app-layout/app/')({
    component: Dashboard,
});
