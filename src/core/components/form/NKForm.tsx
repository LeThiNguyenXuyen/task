import * as React from 'react';

import _ from 'lodash';

import NKBooleanInput, { NKBooleanInputProps } from './NKBooleanInput';
import NKDatePicker, { NKDatePickerProps } from './NKDatePicker';
import NKLocationField, { NKLocationFieldProps } from './NKLocationField';
import NKRichText, { NKRichTextProps } from './NKRichText';
import NKSelectApiOption, { NKSelectApiOptionProps } from './NKSelectApiOption';
import NKTextField, { NKTextFieldProps } from './NKTextField';
import NKTextareaField, { NKTextAreaFieldProps } from './NKTextareaField';
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
    SELECT_API_OPTION = 'select_api_option',
    SELECT_ICON = 'select_icon',
    UPLOAD_IMAGE = 'upload_image',
    MULTI_UPLOAD_IMAGE = 'multi_upload_image',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    RICH_TEXT = 'rich_text',
    WATCH_DISPLAY = 'watch_display',
    LOCATION_NAME = 'location_name',
    LOCATION_PLACE = 'location_place',
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
        | NKFieldsProps<NKFormType.BOOLEAN, NKBooleanInputProps>
        | NKFieldsProps<NKFormType.WATCH_DISPLAY, NKWatchDisplayProps>
        | NKFieldsProps<NKFormType.RICH_TEXT, NKRichTextProps>
        | NKFieldsProps<NKFormType.LOCATION_NAME, NKLocationFieldProps>
        | NKFieldsProps<NKFormType.LOCATION_PLACE, NKLocationFieldProps>
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
        case NKFormType.LOCATION_NAME:
            return <NKLocationField name={name} label={label} {...fieldProps} valueField="name" />;
        case NKFormType.LOCATION_PLACE:
            return <NKLocationField name={name} label={label} {...fieldProps} valueField="placeId" />;

        default:
            return <NKTextField name={name} label={label} {...(fieldProps as any)} />;
    }
};

export default NKForm;
