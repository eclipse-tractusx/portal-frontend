import i18n, { changeLanguage } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import mainDE from '../assets/locales/de/main.json'
import mainEN from '../assets/locales/en/main.json'
import footerDE from '../assets/locales/de/footer.json'
import footerEN from '../assets/locales/en/footer.json'
import appsEN from '../assets/locales/en/apps.json'

const resources = {
  de: {
    translation: mainDE,
    footer: footerDE,
  },
  en: {
    translation: mainEN,
    footer: footerEN,
    apps: appsEN,
  },
}

const supportedLanguages = Object.keys(resources).sort()

const init = (): void => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((e) => console.error('Translation library init got error:', e))
}

const I18nService = {
  init,
  changeLanguage,
  useTranslation,
  supportedLanguages,
}

export default I18nService
