import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';
import { NKTextFieldTheme } from './NKTextField';

interface NKSelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKTextFieldTheme;
    icon?: React.ReactNode;
    options: NKSelectFieldOption[];
}

export interface NKSelectFieldOption {
    label: string;
    value: any;
}

const NKSelectField: React.FunctionComponent<NKSelectFieldProps> = ({
    name,
    isShow = true,
    label,
    labelClassName,
    theme = NKTextFieldTheme.DEFAULT,
    icon,
    options,
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
                            'block w-full rounded-xl  py-3 text-gray-900 shadow-sm focus:outline-none bg-[#F3F4F6] placeholder:text-gray-400  sm:text-sm sm:leading-6 px-4':
                                theme === NKTextFieldTheme.AUTH,
                        })}
                    >
                        {icon}
                        <select {...field} {...rest} className={clsx(['w-full focus:outline-none bg-inherit'])}>
                            {options.map((option, index) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKSelectField;
