import * as React from 'react';

import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

const { TextArea } = Input;

export interface NKTextAreaFieldProps extends TextAreaProps {}

type Props = NKTextAreaFieldProps & NKFieldWrapperProps;

const NKTextareaField: React.FC<Props> = ({ name, isShow = true, label, labelClassName, onChangeExtra, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name} onChangeExtra={onChangeExtra}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => <TextArea rows={4} {...field} {...rest} className="w-full" />}
            />
        </NKFieldWrapper>
    );
};

export default NKTextareaField;
