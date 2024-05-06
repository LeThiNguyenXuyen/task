import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { PopconfirmProps } from 'antd';
import { Popconfirm } from 'antd/lib';

interface CTAButtonProps {
    ctaApi: () => any;
    children: React.ReactNode;
    locale?: string;
    isConfirm?: boolean;
    confirmMessage?: string;
    extraOnSuccess?: (data: any) => void;
    extraOnError?: (data: any) => void;
    confirmProps?: PopconfirmProps;
}

const CTAButton: React.FC<CTAButtonProps> = ({
    children,
    extraOnSuccess,
    extraOnError,
    ctaApi,
    confirmProps,
    locale = 'en',
    confirmMessage = 'Are you sure?',
    isConfirm = false,
}) => {
    const ctaMutation = useMutation({
        mutationFn: ctaApi,
        onSuccess: (data) => {
            extraOnSuccess && extraOnSuccess(data);
        },
        onError: (error) => {
            extraOnError && extraOnError(error);
        },
    });

    if (!isConfirm) {
        return <div onClick={() => ctaMutation.mutate()}>{children}</div>;
    }

    return (
        <Popconfirm title={confirmMessage} onConfirm={() => ctaMutation.mutate()} {...confirmProps}>
            {children}
        </Popconfirm>
    );
};

export default CTAButton;
