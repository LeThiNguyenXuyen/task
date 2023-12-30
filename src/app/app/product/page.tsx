"use client";
import { NKRouter } from "@/core/NKRouter";
import { productApi } from "@/core/api/product.api";
import { formatMoneyVND } from "@/core/utils/string.helper";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import * as React from "react";
import { BsHeartFill } from "react-icons/bs";

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const productsQuery = useQuery(["product"], async () => {
        const res = await productApi.v1Get({
            filters: [],
            orderBy: [],
            page: 0,
            pageSize: 10000,
        });

        return res;
    });

    return (
        <div className="grid-cols-2 w-full h-full grid-rows-[208px] p-4 grid gap-4">
            {productsQuery.data?.data.map((item) => (
                <Link
                    key={item.id}
                    href={NKRouter.app.product.detail(item.id)}
                    className="col-span-1 h-full w-full rounded-3xl overflow-hidden relative"
                >
                    <div className="absolute h-full w-full top-0 left-0 z-0">
                        <img src={item.productVariants[0].imageUrls[0]} className="w-full h-full object-cover" alt="" />
                    </div>
                    <button className="text-rose-700 absolute left-4 top-4 text-lg z-10">
                        <BsHeartFill />
                    </button>
                    <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
                        <p className="text-xl text-white font-medium">{item.productCategory.name}</p>
                        <p className="text-sm text-white font-semibold">{formatMoneyVND(item.productVariants[0].price)}</p>
                    </div>
                </Link>
            ))}
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
    );
};

export default Page;
