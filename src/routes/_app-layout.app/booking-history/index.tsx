import { createFileRoute } from '@tanstack/react-router';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { productApi } from '@/core/api/product.api';
import { userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userSaleBookingOrderApi } from '@/core/api/user-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserSaleBookingOrder } from '@/core/models/user-sale-booking-order';
import { UserSaleBooking } from '@/core/models/userSaleBooking';
import { NKLink } from '@/core/routing/components/NKLink';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    return (
        <div className="flex h-full w-full flex-col items-start justify-start pt-4">
            <div className="flex h-10 w-full flex-shrink-0 px-4 text-base font-medium text-black">
                <NKLink
                    href={NKRouter.app.userSaleBooking.index()}
                    className="flex h-full w-full items-center justify-center border-b-2 border-white  bg-white"
                >
                    Dịch vụ
                </NKLink>
                <NKLink
                    href={NKRouter.app.userSaleBookingHistory.index()}
                    className="flex h-full w-full items-center justify-center border-b-2  border-indigo-600 bg-white"
                >
                    Lịch sử
                </NKLink>
            </div>
            <div className="h-full w-full [&>div]:h-full [&>div]:w-full">
                <ScrollInfinityBuilder
                    queryApi={userMeSaleBookingOrderApi.v1Get}
                    className="grid h-full !w-full grid-cols-1  gap-4 p-4"
                    sourceKey="user-sale"
                    render={(item: UserSaleBookingOrder, index) => (
                        <NKLink
                            key={item.id}
                            href={NKRouter.app.userSaleBookingHistory.detail(item.id)}
                            className="relative col-span-1 flex w-full items-center gap-4 rounded bg-blue-50 px-4 py-2"
                        >
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                                <img src={item.userSaleBooking.imageUrls[0]} className="h-full w-full object-cover" alt="" />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{item.userSaleBooking.name}</p>
                                    <div className="flex gap-2">
                                        <p className="text-xs">{moment(item.startDate).format('DD/MM/YYYY - HH:mm')}</p>
                                        <p className="text-xs">{moment(item.endDate).format('DD/MM/YYYY - HH:mm')}</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between text-xs">
                                    <FieldBadgeApi value={item.status} apiAction={userSaleBookingOrderApi.v1GetEnumStatus} />
                                    <p className="text-sm font-medium">{formatMoneyVND(item.price || 0 + item.extraFee || 0)}</p>
                                </div>
                            </div>
                        </NKLink>
                    )}
                />
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_app-layout/app/booking-history/')({
    component: Page,
});
