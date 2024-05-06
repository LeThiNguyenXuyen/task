import * as React from 'react';

import { SwitchProps } from 'antd';
import { Switch } from 'antd/lib';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKBooleanInputProps extends SwitchProps {}

type Props = NKBooleanInputProps & NKFieldWrapperProps;

const NKBooleanInput: React.FC<Props> = ({ name, isShow = true, label, labelClassName, onChangeExtra, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name} onChangeExtra={onChangeExtra}>
            <div>
                <Controller
                    name={name}
                    control={formMethods.control}
                    render={({ field }) => <Switch {...field} checked={field.value} {...rest} className="" />}
                />
            </div>
        </NKFieldWrapper>
    );
};

export default NKBooleanInput;
