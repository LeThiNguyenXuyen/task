import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export enum NKTextareaFieldTheme {
    DEFAULT = 'DEFAULT',
    AUTH = 'AUTH',
    TAILWIND = 'TAILWIND',
}

interface NKTextareaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKTextareaFieldTheme;
    icon?: React.ReactNode;
}

const NKTextareaField: React.FC<NKTextareaFieldProps> = ({
    name,
    isShow = true,
    label,
    labelClassName,
    theme = NKTextareaFieldTheme.DEFAULT,
    icon,
    ...rest
}) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx([], {
                            'flex items-center gap-2 overflow-hidden rounded-full border border-white': theme === NKTextareaFieldTheme.AUTH,
                            'flex items-center gap-2  overflow-hidden rounded-lg border border-white': theme === NKTextareaFieldTheme.DEFAULT,
                            'block w-full  rounded-md border border-gray-300 bg-white shadow-sm sm:text-sm': theme === NKTextareaFieldTheme.TAILWIND,
                        })}
                    >
                        {icon}
                        <textarea
                            {...field}
                            {...rest}
                            className={clsx([
                                'w-full bg-transparent px-4 py-2 outline-none placeholder:text-gray-700 focus:outline-none',
                                {
                                    'rounded-md focus:border-[#B97953] focus:ring-[#B97953]': theme === NKTextareaFieldTheme.TAILWIND,
                                },
                            ])}
                        ></textarea>
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKTextareaField;
