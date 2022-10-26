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

const DOMAIN =
  /([a-z0-9]|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(\.([a-z0-9]|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])){1,10}/i
const URLPATH = /(\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=%]{0,500}){0,20}/

export const Patterns = {
  BPN: /^BPNL[0-9A-Z]{12}$/i,
  MAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z0-9-]+\.)+[a-z]{2,}))$/i,
  DOMAIN: new RegExp(`^${DOMAIN.source}$`, 'i'),
  PATH: new RegExp(`^${URLPATH.source}$`, 'i'),
  URL: new RegExp(
    `^(https)://(${DOMAIN.source})(:\\d{1,5})?(${URLPATH.source})?$`,
    'i'
  ),
  NAME: /^([A-Za-zÀ-ÿ-,.']{1,40} ?){1,8}$/i,
  UUID: /^[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}$/i,
  prefix: {
    BPN: /^BPNL/i,
    URL: /^https:/i,
    MAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/,
    URNID: /^urn:uuid:[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$/i,
  },
  SEARCH: /^[a-zA-ZÀ-ÿ0-9 !?@&_\-.]{3,80}$/,
  appMarketCard: {
    appTitle: /^([A-Za-z.:_@&0-9 -]){5,40}$/,
    appProvider: /^([A-Za-z ]){3,30}$/,
    shortDescriptionEN: /^([a-zA-Z0-9 !?@&#'"()_\-=/*.,;:]){10,255}$/,
    shortDescriptionDE: /^([a-zA-ZÀ-ÿ0-9 !?@&#'"()_\-=/*.,;:]){10,255}$/,
    useCaseCategory: /^([A-Za-z])$/,
    appLanguage: /^([A-Za-z ])$/,
    pricingInformation: /^([A-Za-z0-9/€ ]){1,15}$/,
  },
  appPage: {
    longDescriptionEN: /^([a-zA-Z0-9 !?@&#'"()[\]_\-+=<>/*.,;:]){10,2000}$/,
    longDescriptionDE: /^([a-zA-ZÀ-ÿ0-9 !?@&#'"()[\]_\-+=<>/*.,;:]){10,2000}$/,
    providerHomePage: /^([A-Za-z.:@&0-9 !])+$/,
    phone: /^\+(\d{2})+(\(\s\d{3}\))?\s?\d{9,20}$/,
  },
  idp: {
    clientId: /^[a-zA-Z0-9-]*$/,
    clientSecret: /^[a-zA-Z0-9]*$/,
    metaDataUrl: /^[a-zA-Z0-9- ]*$/,
  },
}

export const isMail = (expr: string) => Patterns.MAIL.test(expr)
export const isBPN = (expr: string) => Patterns.BPN.test(expr)
export const isDomain = (expr: string) => Patterns.DOMAIN.test(expr)
export const isURL = (expr: string) => Patterns.URL.test(expr)
export const isUUID = (expr: string) => Patterns.UUID.test(expr)

export default Patterns
