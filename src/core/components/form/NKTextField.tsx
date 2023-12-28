import * as React from "react";

import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";

import NKFieldWrapper from "./NKFieldWrapper";

export enum NKTextFieldTheme {
    DEFAULT = "DEFAULT",
    AUTH = "AUTH",
}

interface NKTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKTextFieldTheme;
    icon?: React.ReactNode;
}

const NKTextField: React.FC<NKTextFieldProps> = ({ name, isShow = true, label, labelClassName, theme = NKTextFieldTheme.DEFAULT, icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx([], {
                            "": theme === NKTextFieldTheme.AUTH,
                        })}
                    >
                        {icon}
                        <input
                            {...field}
                            {...rest}
                            className={clsx(["w-full focus:outline-none"], {
                                "block w-full rounded-xl border border-gray-100  py-3 text-gray-900 shadow-sm focus:outline-none bg-[#F3F4F6] placeholder:text-gray-400  sm:text-sm text-sm sm:leading-6 px-4":
                                    theme === NKTextFieldTheme.AUTH,
                            })}
                        />
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKTextField;
