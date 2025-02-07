import moment from 'moment-timezone';

import { NKConstant } from '../NKConstant';

type SupportedLanguages = (typeof NKConstant.SUPPORTED_LOCALES)[number];

const formatDate = (date?: string, locale: SupportedLanguages = NKConstant.FALLBACK_LOCALE) => {
    return moment(date).locale(locale).format('LL');
};

const formatFilter = (date: string | Date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const returnCorrectDate = (date: string) => {
    const value = moment(date);

    return value.add(7, 'hours');
};

export const HKMoment = {
    moment,
    formatDate,
    formatFilter,
    returnCorrectDate,
};
