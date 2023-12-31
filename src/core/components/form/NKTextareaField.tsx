import * as React from "react";

import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";

import NKFieldWrapper from "./NKFieldWrapper";

export enum NKTextareaFieldTheme {
    DEFAULT = "DEFAULT",
    AUTH = "AUTH",
    TAILWIND = "TAILWIND",
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
                            "border border-white rounded-full flex items-center gap-2 overflow-hidden": theme === NKTextareaFieldTheme.AUTH,
                            "border border-white rounded-lg  flex items-center gap-2 overflow-hidden": theme === NKTextareaFieldTheme.DEFAULT,
                            "block w-full  border bg-white border-gray-300 shadow-sm sm:text-sm rounded-md": theme === NKTextareaFieldTheme.TAILWIND,
                        })}
                    >
                        {icon}
                        <textarea
                            {...field}
                            {...rest}
                            className={clsx([
                                "w-full placeholder:text-gray-700 py-2 px-4 focus:outline-none bg-transparent outline-none",
                                {
                                    "focus:border-[#B97953] focus:ring-[#B97953] rounded-md": theme === NKTextareaFieldTheme.TAILWIND,
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
