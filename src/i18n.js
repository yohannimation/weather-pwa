import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: require('./locales/EN/translation.json') },
            fr: { translation: require('./locales/FR/translation.json') },
        },
        debug: false,
        fallbackLng: 'en',
    });
        
export default i18n;