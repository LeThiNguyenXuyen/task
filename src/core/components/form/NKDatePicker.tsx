import * as React from 'react';

import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { isDate } from 'lodash';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKDatePickerProps {}

type Props = NKDatePickerProps & NKFieldWrapperProps & DatePickerProps;

const NKDatePicker: React.FC<Props> = ({ name, isShow = true, label, labelClassName, onChangeExtra, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name} onChangeExtra={onChangeExtra}>
            <div>
                <Controller
                    name={name}
                    control={formMethods.control}
                    render={({ field }) => (
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={dayjs(field.value)}
                            onChange={(date, dateString) => {
                                if (dateString === '' || isDate(dateString)) {
                                    field.onChange(new Date().toISOString());
                                } else {
                                    field.onChange(moment(dateString, 'DD/MM/YYYY').toDate().toISOString());
                                }
                            }}
                            {...rest}
                            className="w-full"
                        />
                    )}
                />
            </div>
        </NKFieldWrapper>
    );
};

export default NKDatePicker;
