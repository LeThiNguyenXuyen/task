import moment from 'moment-timezone';

import { NKConstant } from '../NKConstant';

type SupportedLanguages = (typeof NKConstant.SUPPORTED_LOCALES)[number];

const formatDate = (date?: string, locale: SupportedLanguages = NKConstant.FALLBACK_LOCALE) => {
    return moment(date).locale(locale).format('LL');
};

export const HKMoment = {
    moment,
    formatDate,
};
