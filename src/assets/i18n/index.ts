import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en';
import tr from './lang/tr';

i18next.use(initReactI18next).init({
  fallbackLng: 'en_US',
  lng: localStorage.getItem('language') || 'en_US',
  resources: {
    en_US: en,
    tr_TR: tr,
  },
});

export default i18next;
