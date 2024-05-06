import * as React from 'react';

import NKBooleanInput, { NKBooleanInputProps } from './NKBooleanInput';
import NKDatePicker, { NKDatePickerProps } from './NKDatePicker';
import NKDateRangePicker, { NKDateRangeProps } from './NKDateRangePicker';
import NKInputNumber, { NKInputNumberProps } from './NKInputNumber';
import NKRichText, { NKRichTextProps } from './NKRichText';
import NKSelectApiOption, { NKSelectApiOptionProps } from './NKSelectApiOption';
import NKSelectIcon, { NKSelectIconProps } from './NKSelectIcon';
import NKSelectMultiApiOption, { NKSelectMultiApiOptionProps } from './NKSelectMultiApiOption';
import NKTextField, { NKTextFieldProps } from './NKTextField';
import NKTextareaField, { NKTextAreaFieldProps } from './NKTextareaField';
import NKTimeRangePicker, { NKTimeRangeProps } from './NKTimeRangePicker';
import NKUploadImage, { NKUploadImageProps } from './NKUploadImage';
import NKUploadMultipleImage, { NKUploadMultipleImageProps } from './NKUploadMultipleImage';
import NKWatchDisplay, { NKWatchDisplayProps } from './NKWatchDisplay';

export enum NKFormType {
    TEXT = 'text',
    PASSWORD = 'password',
    TEXTAREA = 'textarea',
    DATE = 'date',
    DATE_TIME = 'date_time',
    DATE_WEEK = 'date_week',
    DATE_MONTH = 'date_month',
    DATE_QUARTER = 'date_quarter',
    DATE_YEAR = 'date_year',
    DATE_RANGE = 'date_range',
    SELECT_API_OPTION = 'select_api_option',
    SELECT_MULTI_API_OPTION = 'select_multi_api_option',
    SELECT_ICON = 'select_icon',
    UPLOAD_IMAGE = 'upload_image',
    MULTI_UPLOAD_IMAGE = 'multi_upload_image',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    RICH_TEXT = 'rich_text',
    WATCH_DISPLAY = 'watch_display',
    TIME_RANGE = 'time_range',
}

interface NKFormProps {
    name: string;
    label: string;
}

export type FieldProps = NKFormProps &
    (
        | NKFieldsProps<NKFormType.TEXT, NKTextFieldProps>
        | NKFieldsProps<NKFormType.PASSWORD, NKTextFieldProps>
        | NKFieldsProps<NKFormType.TEXTAREA, NKTextAreaFieldProps>
        | NKFieldsProps<NKFormType.DATE, NKDatePickerProps>
        | NKFieldsProps<NKFormType.DATE_TIME, NKDatePickerProps>
        | NKFieldsProps<NKFormType.DATE_WEEK, NKDatePickerProps>
        | NKFieldsProps<NKFormType.DATE_MONTH, NKDatePickerProps>
        | NKFieldsProps<NKFormType.DATE_QUARTER, NKDatePickerProps>
        | NKFieldsProps<NKFormType.DATE_YEAR, NKDatePickerProps>
        | NKRequireFieldsProps<NKFormType.SELECT_API_OPTION, NKSelectApiOptionProps>
        | NKFieldsProps<NKFormType.UPLOAD_IMAGE, NKUploadImageProps>
        | NKFieldsProps<NKFormType.MULTI_UPLOAD_IMAGE, NKUploadMultipleImageProps>
        | NKFieldsProps<NKFormType.NUMBER, NKInputNumberProps>
        | NKFieldsProps<NKFormType.BOOLEAN, NKBooleanInputProps>
        | NKFieldsProps<NKFormType.WATCH_DISPLAY, NKWatchDisplayProps>
        | NKFieldsProps<NKFormType.RICH_TEXT, NKRichTextProps>
        | NKFieldsProps<NKFormType.SELECT_ICON, NKSelectIconProps>
        | NKRequireFieldsProps<NKFormType.SELECT_MULTI_API_OPTION, NKSelectMultiApiOptionProps>
        | NKFieldsProps<NKFormType.DATE_RANGE, NKDateRangeProps>
        | NKFieldsProps<NKFormType.TIME_RANGE, NKTimeRangeProps>
    );

interface NKFieldsProps<Type, IField> {
    type: Type;
    fieldProps?: IField;
}

interface NKRequireFieldsProps<Type, IField> {
    type: Type;
    fieldProps: IField;
}

const NKForm: React.FC<FieldProps> = ({ label, name, type, fieldProps }) => {
    switch (type) {
        case NKFormType.TEXT:
            return <NKTextField name={name} label={label} {...fieldProps} />;
        case NKFormType.TEXTAREA:
            return <NKTextareaField name={name} label={label} {...fieldProps} />;
        case NKFormType.PASSWORD:
            return <NKTextField name={name} label={label} type={'password'} {...fieldProps} />;
        case NKFormType.DATE:
            return <NKDatePicker name={name} label={label} {...fieldProps} />;
        case NKFormType.DATE_TIME:
            return <NKDatePicker name={name} label={label} showTime {...fieldProps} />;
        case NKFormType.DATE_WEEK:
            return <NKDatePicker name={name} label={label} picker="week" {...fieldProps} />;
        case NKFormType.DATE_MONTH:
            return <NKDatePicker name={name} label={label} picker="month" {...fieldProps} />;
        case NKFormType.DATE_QUARTER:
            return <NKDatePicker name={name} label={label} picker="quarter" {...fieldProps} />;
        case NKFormType.DATE_YEAR:
            return <NKDatePicker name={name} label={label} picker="year" {...fieldProps} />;
        case NKFormType.UPLOAD_IMAGE:
            return <NKUploadImage name={name} label={label} maxCount={1} {...fieldProps} />;
        case NKFormType.NUMBER:
            return <NKInputNumber name={name} label={label} {...fieldProps} />;
        case NKFormType.MULTI_UPLOAD_IMAGE:
            return <NKUploadMultipleImage name={name} label={label} {...fieldProps} />;
        case NKFormType.BOOLEAN:
            return <NKBooleanInput name={name} label={label} {...fieldProps} />;
        case NKFormType.RICH_TEXT:
            return <NKRichText name={name} label={label} {...fieldProps} />;
        case NKFormType.WATCH_DISPLAY:
            return <NKWatchDisplay name={name} label={label} {...fieldProps} />;
        case NKFormType.SELECT_API_OPTION:
            return <NKSelectApiOption name={name} label={label} {...fieldProps} />;
        case NKFormType.SELECT_ICON:
            return <NKSelectIcon name={name} label={label} {...fieldProps} />;
        case NKFormType.SELECT_MULTI_API_OPTION:
            return <NKSelectMultiApiOption name={name} label={label} {...fieldProps} />;
        case NKFormType.DATE_RANGE:
            return <NKDateRangePicker name={name} label={label} {...fieldProps} />;
        case NKFormType.TIME_RANGE:
            return <NKTimeRangePicker name={name} label={label} {...fieldProps} />;
        default:
            return <NKTextField name={name} label={label} {...(fieldProps as any)} />;
    }
};

export default NKForm;
