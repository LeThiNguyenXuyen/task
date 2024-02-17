import * as React from 'react';

import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowLeft } from 'akar-icons';
import clsx from 'clsx';
import _get from 'lodash/get';
import { PiHeartFill, PiStarFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';
import { productApi } from '@/core/api/product.api';
import { useCart } from '@/core/contexts/CartContext';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const [quantity, setQuantity] = React.useState(1);

    const params = Route.useParams();
    const id = _get(params, 'id') as string;

    const productQuery = useQuery(
        ['product', id],
        async () => {
            const res = await productApi.v1GetById(id);

            return res;
        },
        {
            enabled: !!id,
        },
    );

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const router = useNKRouter();

    const { handleAddToCart } = useCart();

    const clickAddToCart = () => {
        if (!productQuery.data) return;

        handleAddToCart({
            productVariantId: productQuery.data?.productVariants[0].id,
            quantity: quantity,
        });
        setQuantity(1);

        toast.success('Thêm vào giỏ hàng thành công');
    };

    return (
        <div className="relative flex h-full w-full flex-col">
            {/* <Link href={NKRouter.app.product.index()}> */}
            <button className="absolute left-4 top-4 z-10" onClick={() => router.push(NKRouter.app.product.index())}>
                <ArrowLeft className=" h-6 w-6 text-white" />
            </button>
            {/* </Link> */}

            {productQuery.isSuccess ? (
                <>
                    <div className="fixed bottom-0 left-0 z-30 flex w-full  justify-center gap-4 bg-white px-4 py-10 pt-2 shadow">
                        <button className="flex h-10 w-20 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                            <PiHeartFill className="h-6 w-6 text-white" />
                        </button>
                        <button
                            onClick={() => clickAddToCart()}
                            className="flex h-10 w-full items-center justify-center rounded-full bg-purple-600 text-sm font-semibold uppercase text-white "
                        >
                            Bỏ vào túi
                        </button>
                    </div>
                    <Swiper className="relative z-0 h-56 w-screen  overflow-hidden" slidesPerView={1}>
                        {productQuery.data?.productVariants[0].imageUrls.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} className="h-full w-full object-cover" alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="relative z-10 flex  h-full w-full flex-col bg-white px-6 shadow-none">
                        <div className="absolute -top-[14px] left-0 h-4 w-full rounded-t-2xl bg-white"></div>
                        <p className="text-sm font-semibold text-gray-900">{productQuery.data?.productCategory.name}</p>
                        <p className="text-xl font-semibold text-gray-900">{productQuery.data?.productVariants[0].name}</p>
                        <div className="mt-2 flex w-full justify-between gap-2">
                            <p className="text-2xl font-semibold text-purple-600">
                                {formatMoneyVND(productQuery.data?.productVariants[0].price ?? 0)}
                            </p>
                            <div className="flex items-center justify-center overflow-hidden  rounded-full bg-gray-200 text-center font-semibold">
                                <button className="w-10 flex-shrink-0 text-4xl text-purple-600" onClick={() => handleDecrease()}>
                                    -
                                </button>
                                <span className="w-10 flex-shrink-0 text-xl">{quantity}</span>
                                <button className="w-10 flex-shrink-0 text-2xl text-purple-600" onClick={() => handleIncrease()}>
                                    +
                                </button>
                            </div>
                        </div>
                        {productQuery.data.productReviews.length > 0 ? (
                            <div className="my-4 flex w-full justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 text-yellow-400">
                                        <PiStarFill strokeWidth={2} className="h-full w-full" />
                                    </div>
                                    <p className="text-base font-semibold text-black">
                                        {productQuery.data.productReviews.reduce((total, a) => total + a.rate, 0) /
                                            productQuery.data.productReviews.length || 1}
                                        <span className="text-sm font-normal text-gray-400">{productQuery.data.productReviews.length || 0}</span>
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="relative z-0  h-10 w-10 translate-x-4 overflow-hidden rounded-full border border-white ">
                                        <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className="z-10 h-10  w-10 translate-x-2 overflow-hidden rounded-full border border-white">
                                        <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className="z-20 h-10  w-10 overflow-hidden rounded-full border border-white">
                                        <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>
                                <span className="text-sm font-semibold italic text-gray-600">No review</span>
                            </p>
                        )}
                        <div className="">
                            <Tab.Group>
                                <Tab.List className={'flex w-full'}>
                                    <Tab
                                        className={(props) =>
                                            clsx('h-10 w-full border-b-2 text-lg font-semibold outline-none', {
                                                'border-purple-600 text-black': props.selected,
                                                'border-white  text-gray-400': !props.selected,
                                            })
                                        }
                                    >
                                        Description
                                    </Tab>
                                    <Tab
                                        className={(props) =>
                                            clsx('h-10 w-full border-b-2 text-lg font-semibold outline-none', {
                                                'border-purple-600 text-black': props.selected,
                                                'border-white  text-gray-400': !props.selected,
                                            })
                                        }
                                    >
                                        Review
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className={'h-full w-full pb-28  pt-5'}>
                                    <Tab.Panel className={'relative h-full w-full'}>
                                        <div className="w-full  overflow-y-auto whitespace-pre-line text-sm font-medium text-black">
                                            {productQuery.data?.productVariants[0].description}
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel className={'flex w-full flex-col gap-2'}>
                                        {productQuery.data.productReviews.length > 0 ? (
                                            <>
                                                {productQuery.data.productReviews.map((review) => (
                                                    <div key={review.id} className="flex gap-4 border-b border-gray-200  pb-2">
                                                        <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full border border-black">
                                                            <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-xs font-semibold text-black">Pham Vinh Tai</p>
                                                            <div className="flex gap-2">
                                                                {Array.from({ length: review.rate }).map((_, index) => (
                                                                    <div key={`${review.id}-${index}`} className="h-3 w-3 text-yellow-400">
                                                                        <PiStarFill strokeWidth={2} className="h-full w-full" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="text-sm font-medium text-black ">{review.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <p>
                                                <span className="text-sm font-semibold italic text-gray-600">No review</span>
                                            </p>
                                        )}
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export const Route = createFileRoute('/_app-layout/app/product/_product-layout/$id/')({
    component: Page,
});
