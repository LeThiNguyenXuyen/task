import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { resources } from './resources';

export const lngs: Record<'vi' | 'en', string> = {
    en: 'English',
    vi: 'Tiếng Việt',
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: import.meta.env.NODE_ENV === 'development',
        fallbackLng: 'en',
        detection: {
            order: ['queryString', 'cookie', 'localstorage'],
            lookupLocalStorage: 'lang',
            lookupCookie: 'lang',
            lookupQuerystring: 'lang',
            caches: ['localStorage', 'cookie'],
        },
        ns: ['common'],
        resources,
    });
export default i18n;
