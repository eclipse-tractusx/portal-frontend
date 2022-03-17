import i18n, { changeLanguage } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import mainDE from '../assets/locales/de/main.json'
import mainEN from '../assets/locales/en/main.json'
import helpDE from '../assets/locales/de/help.json'
import helpEN from '../assets/locales/en/help.json'

const resources = {
  de: {
    translation: mainDE,
    help: helpDE,
  },
  en: {
    translation: mainEN,
    help: helpEN,
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
