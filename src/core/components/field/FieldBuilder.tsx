import * as React from 'react';

import { Descriptions } from 'antd';
import clsx from 'clsx';
import _get from 'lodash/get';

import { NKFormType } from '../form/NKForm';
import FieldDisplay, { FieldType } from './FieldDisplay';

interface FieldBuilderItem {
    key: string;
    title: string;
    type: FieldType;
    span?: 1 | 2 | 3 | 4;
    apiAction?: (value?: any) => any;
    formatter?: (value: any) => any;
}

interface FieldBuilderProps<T> {
    title: string;
    fields: FieldBuilderItem[];
    record: T | undefined;
    extra?: React.ReactNode;
    isFetching?: boolean;
    containerClassName?: string;
}

const FieldBuilder = <T,>({ fields, title, record, extra, isFetching, containerClassName }: FieldBuilderProps<T>) => {
    return (
        <div className={clsx('fade-in flex flex-col gap-4 rounded-lg border border-solid border-tango-100', containerClassName)}>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="sr-only col-span-1"></div>
                    <div className="sr-only col-span-2"></div>
                    <div className="sr-only col-span-3"></div>
                    <div className="sr-only col-span-4"></div>
                    <div className="flex items-end  gap-4">
                        <div className="text-xl font-bold text-black">{title}</div>
                        {extra}
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {fields.map((item) => {
                            const value = Boolean(item.key) ? _get(record, item.key) : record;

                            return (
                                <div key={item.key} className={`flex flex-col gap-1 col-span-${item.span}`}>
                                    <div className=" text-base font-semibold">{item.title}</div>
                                    <div className="">
                                        <FieldDisplay type={item.type} value={value} apiAction={item.apiAction} formatter={item.formatter} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* <Descriptions bordered className="rounded-lg bg-white" size="middle">
                        {fields.map((item) => {
                            const value = Boolean(item.key) ? _get(record, item.key) : record;

                            return (
                                <Descriptions.Item key={item.key} label={item.title} span={item.span || 3}>
                                    <FieldDisplay type={item.type} value={value} apiAction={item.apiAction} formatter={item.formatter} />
                                </Descriptions.Item>
                            );
                        })}
                    </Descriptions> */}
                </>
            )}
        </div>
    );
};

export default FieldBuilder;
