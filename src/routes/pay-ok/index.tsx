import React from 'react';

import { createFileRoute } from '@tanstack/react-router';

const Page: React.FunctionComponent = () => {
    return (
        <div className="mx-auto flex min-h-screen w-full items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="h-24 w-24">
                    <img src="/assets/images/logo.png" alt="logo" className="h-full w-full" />
                </div>
                <div className="text-2xl font-semibold text-black">Thanh toán thành công</div>
                <div className="text-center">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Bạn có thể đóng trang này và tiếp tục sử dụng dịch vụ.</div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/pay-ok/')({
    component: Page,
});
