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
    span?: 1 | 2 | 3;
    apiAction?: (value?: any) => any;
    formatter?: (value: any) => any;
}

interface FieldBuilderProps<T> {
    title: string;
    fields: FieldBuilderItem[];
    record: T | undefined;
    extra?: React.ReactNode;
    isFetching?: boolean;
    classNameContainer?: string;
    isBordered?: boolean;
}

const FieldBuilder = <T,>({ fields, title, record, extra, isFetching, isBordered = false, classNameContainer = '' }: FieldBuilderProps<T>) => {
    return (
        <div className={clsx(['fade-in flex flex-col gap-4 rounded-lg bg-white p-4', classNameContainer])}>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="sr-only col-span-1"></div>
                    <div className="sr-only col-span-2"></div>
                    <div className="sr-only col-span-3"></div>
                    {(Boolean(title) || Boolean(extra)) && (
                        <div className="flex items-end justify-between gap-4">
                            <div className="text-xl font-bold text-black">{title}</div>
                            {extra}
                        </div>
                    )}

                    <Descriptions bordered={isBordered}>
                        {fields.map((item) => {
                            const value = Boolean(item.key) ? _get(record, item.key) : record;

                            return (
                                <Descriptions.Item key={item.key} label={item.title} span={item.span || 3}>
                                    <FieldDisplay type={item.type} value={value} apiAction={item.apiAction} formatter={item.formatter} />
                                </Descriptions.Item>
                            );
                        })}
                    </Descriptions>
                </>
            )}
        </div>
    );
};

export default FieldBuilder;
