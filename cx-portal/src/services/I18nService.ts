/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import i18n, { changeLanguage } from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import mainDE from '../assets/locales/de/main.json'
import mainEN from '../assets/locales/en/main.json'
import footerDE from '../assets/locales/de/footer.json'
import footerEN from '../assets/locales/en/footer.json'
import appsDE from '../assets/locales/de/apps.json'
import appsEN from '../assets/locales/en/apps.json'
import notificationDE from '../assets/locales/de/notification.json'
import notificationEN from '../assets/locales/en/notification.json'

const resources = {
  de: {
    translation: mainDE,
    footer: footerDE,
    apps: appsDE,
    notification: notificationDE,
  },
  en: {
    translation: mainEN,
    footer: footerEN,
    apps: appsEN,
    notification: notificationEN,
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
      supportedLngs: ['de', 'en'],
      interpolation: {
        escapeValue: false,
      },
    })
    .catch((e) => console.error('Translation library init got error:', e))
}

const searchPages = (expr: string): string[] => {
  const regex = new RegExp(expr, 'ig')
  return [
    ...new Set(
      Object.entries(resources.en.translation.pages)
        .concat(Object.entries(resources.de.translation.pages))
        .filter(([_key, value]) => value.match(regex))
        .map(([key, _value]) => key)
    ),
  ]
}

const searchOverlays = (expr: string): string[] => {
  const regex = new RegExp(expr, 'ig')
  return [
    ...new Set(
      Object.entries(resources.en.translation.overlays)
        .concat(Object.entries(resources.de.translation.overlays))
        .filter(([_key, value]) => value.match(regex))
        .map(([key, _value]) => key)
    ),
  ]
}

const searchActions = (expr: string): string[] => {
  const regex = new RegExp(expr, 'ig')
  return [
    ...new Set(
      Object.entries(resources.en.translation.actions)
        .concat(Object.entries(resources.de.translation.actions))
        .filter(([_key, value]) => value.match(regex))
        .map(([key, _value]) => key)
    ),
  ]
}

const I18nService = {
  init,
  changeLanguage,
  searchPages,
  searchOverlays,
  searchActions,
  useTranslation,
  supportedLanguages,
}

export default I18nService
