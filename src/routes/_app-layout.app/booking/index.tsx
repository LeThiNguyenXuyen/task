import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { BsHeartFill } from 'react-icons/bs';

import { NKRouter } from '@/core/NKRouter';
import { productApi } from '@/core/api/product.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserSaleBooking } from '@/core/models/userSaleBooking';
import { NKLink } from '@/core/routing/components/NKLink';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    return (
        <div className="flex h-full w-full flex-col items-start justify-start pt-4">
            <div className="flex h-10 w-full flex-shrink-0 px-4 text-base font-medium text-black">
                <NKLink
                    href={NKRouter.app.userSaleBooking.index()}
                    className="flex h-full w-full items-center justify-center border-b-2  border-indigo-600 bg-white"
                >
                    Dịch vụ
                </NKLink>
                <NKLink
                    href={NKRouter.app.userSaleBookingHistory.index()}
                    className="flex h-full w-full items-center justify-center border-b-2 border-white bg-white"
                >
                    Lịch sử
                </NKLink>
            </div>
            <div className="h-full w-full [&>div]:h-full [&>div]:w-full">
                <ScrollInfinityBuilder
                    queryApi={userSaleBookingApi.v1Get}
                    filters={[`status||${FilterComparator.LIKE}||AVAILABLE`]}
                    className="grid h-full !w-full grid-cols-2 grid-rows-[208px] gap-4 p-4"
                    sourceKey="user-sale"
                    render={(item: UserSaleBooking, index) => (
                        <NKLink
                            key={item.id}
                            href={NKRouter.app.userSaleBooking.detail(item.id)}
                            className="relative col-span-1 h-[208px] w-full overflow-hidden rounded-3xl"
                        >
                            <div className="absolute left-0 top-0 z-0 h-full w-full">
                                <img src={item.imageUrls[0]} className="h-full w-full object-cover" alt="" />
                            </div>
                            <button className="absolute left-4 top-4 z-10 text-lg text-rose-700">
                                <BsHeartFill />
                            </button>
                            <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
                                <p className="text-xl font-medium text-white">{item.serviceCategory.name}</p>
                                <p className="text-sm font-semibold text-white">{formatMoneyVND(item.price)}</p>
                            </div>
                        </NKLink>
                    )}
                />

                {/* <Link href={NKRouter.app.product.detail("test")} className="col-span-1 h-full w-full rounded-3xl overflow-hidden relative">
                <div className="absolute h-full w-full top-0 left-0 z-0">
                    <img src="https://dummyimage.com/168x208/67729D/fff" className="w-full h-full" alt="" />
                </div>
                <button className="text-rose-700 absolute left-4 top-4 text-lg z-10">
                    <BsHeartFill />
                </button>
                <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
                    <p className="text-xl text-white font-medium">Camera</p>
                    <p className="text-sm text-white font-semibold">{formatMoneyVND(1000000)}</p>
                </div>
            </Link> */}
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_app-layout/app/booking/')({
    component: Page,
});
