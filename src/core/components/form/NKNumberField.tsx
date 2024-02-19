import * as React from 'react';

import { InputNumber, InputNumberProps } from 'antd';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export type NKNumberFieldTheme = 'DEFAULT' | 'AUTH';

export interface NKNumberFieldProps extends InputNumberProps {
    theme?: NKNumberFieldTheme;
    icon?: React.ReactNode;
}

type Props = NKNumberFieldProps & NKFieldWrapperProps;

const NKNumberField: React.FC<Props> = ({ name, isShow = true, label, labelClassName, theme = 'AUTH', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller name={name} control={formMethods.control} render={({ field }) => <InputNumber {...field} className="w-full" {...rest} />} />
        </NKFieldWrapper>
    );
};

export default NKNumberField;
