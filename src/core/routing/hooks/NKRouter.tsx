import { useNavigate, useRouter } from '@tanstack/react-router';

export const useNKRouter = () => {
    const navigate = useNavigate();
    const router = useRouter();

    const push = (path: string) => {
        navigate({
            params: {},
            to: path as string,
        });
    };

    const replace = (path: string) => {
        navigate({
            params: {},
            to: path,
            replace: true,
        });
    };

    const back = () => {
        router.history.back();
    };

    const forward = () => {
        router.history.forward();
    };

    return { push, replace, back, forward };
};
