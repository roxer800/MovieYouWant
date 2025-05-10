import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en.json';
import ka from './lang/ka.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (cb) => {
    const savedLang = await AsyncStorage.getItem('language');
    cb(savedLang || 'en');
  },
  init: () => {},
  cacheUserLanguage: async (lang) => {
    await AsyncStorage.setItem('language', lang);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ka: { translation: ka },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
