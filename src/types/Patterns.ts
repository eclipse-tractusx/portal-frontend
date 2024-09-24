/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { getRequireHttpsUrlPattern } from '../services/EnvironmentService'

// check the REQUIRE_HTTPS_URL_PATTERN environment variable, defaulting to !== 'false' if not set
const requireHttpsUrlPattern = getRequireHttpsUrlPattern() !== 'false'

const DOMAIN =
  /([a-z0-9]|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(\.([a-z0-9]|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])){1,10}/i
const URLPATH = /(\/[a-z0-9-._~:/?#[\]@!$&'()*+,;=%]{0,500}){0,20}/
// construct regex patterns for URL based on the REQUIRE_HTTPS_URL_PATTERN environment variable
const urlProtocol = requireHttpsUrlPattern ? 'https' : 'https?'
const urlPattern = new RegExp(
  `^(${urlProtocol})://(${DOMAIN.source})(:\\d{1,5})?(${URLPATH.source})?$`,
  'i'
)
const prefixUrlPattern = new RegExp(`^${urlProtocol}:`, 'i')
const nameGroup = 'A-Za-z\u00C0-\u017F'
const personNameToken = `([${nameGroup}]\\.|[${nameGroup}']{2,30})`
const personNamePattern = new RegExp(
  `^([Dd]r\\.? )?${personNameToken}(( ?- ?| )${personNameToken}){0,16}(,? [JjSs](un|en|n?r)\\.?)?$`
)

export const Patterns = {
  ID: /^[a-z0-9_.@-]{1,80}$/i,
  LABEL: /^[a-z0-9-_ ]{1,80}$/i,
  BPN: /^BPNL[0-9A-Z]{12}$/i,
  MAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*))@(([a-z0-9-]+\.)+[a-z]{2,})$/,
  DOMAIN: new RegExp(`^${DOMAIN.source}$`, 'i'),
  PATH: new RegExp(`^${URLPATH.source}$`, 'i'),
  URL: urlPattern,
  UUID: /^[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}$/i,
  EXTID: /^[a-z0-9]{6,36}$/i,
  COMPANY_NAME:
    /^(?!.*\s$)([\wÀ-ÿ£$€¥¢@%*+\-/\\,.:;=<>!?&^#'\x22()[\]]\s?){1,160}$/,
  personName: personNamePattern,
  name: /^([A-Za-z\u00C0-\u017F-,.'](?!.*[-,.]{2})[A-Za-z\u00C0-\u017F-,.']{0,40} ?)[^ –]{1,40}$/,
  zipcode: /^[A-Z0-9-]{1,8}$/,
  streetNumber: /^[0-9A-Za-z- ]{1,20}$/,
  regionName: /^[0-9A-Za-z- ]{2,20}$/,
  prefix: {
    BPN: /^BPNL/i,
    URL: prefixUrlPattern,
    MAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/,
  },
  SEARCH: /^[a-zA-ZÀ-ÿ0-9 !?@&_+\-.]{3,80}$/,
  partner: {
    COMMERCIAL_REG_NUMBER: /^[a-zA-Z\d-\s]{9}$/,
    VAT_ID: /^[a-zA-Z\d-\s]{8,15}$/,
    LEI_CODE: /^[a-zA-Z\d]{20}$/,
    VIES: /.{1,500}/,
    EORI: /^[a-zA-Z\d\s]{18}$/,
  },
  appMarketCard: {
    appTitle: /^([A-Za-z.:_@&0-9' -]){5,40}$/,
    appProvider: /^([A-Za-z.:_@&0-9' -]){3,30}$/,
    shortDescriptionEN: /^([a-zA-Z0-9 !?@&#'"()_\-=/*.,;:]){10,255}$/,
    shortDescriptionDE: /^([a-zA-ZÀ-ÿ0-9 !?@&#'"()_\-=/*.,;:]){10,255}$/,
    useCaseCategory: /^([A-Za-z])$/,
    appLanguage: /^([A-Za-z ])$/,
    pricingInformation: /^([A-Za-z0-9/€ ]){1,15}$/,
  },
  offerCard: {
    serviceName: /^[^-\s()'"#@.&](?!.*[%&?,';:!\s-]{2}).{2,200}$/,
    serviceType: /^([A-Za-z])$/,
    shortDescription: /^(?! *$).{10,120}$/,
  },
  offerPage: {
    longDescription: /^(?! *$).{10,1999}$/,
  },
  appPage: {
    longDescriptionEN:
      /^[^ @=<>*\-+#?%&_:;]([a-zA-Z0-9 !?@&#'"()[\]_\-+=<>/*.,;:%\r\n]){9,1999}$/,
    longDescriptionDE:
      /^[^ @=<>*\-+#?%&_:;]([a-zA-ZÀ-ÿ0-9 !?@&#'"()[\]_\-+=<>/*.,;:%\r\n]){9,1999}$/,
  },
  idp: {
    clientId: /^[a-zA-Z0-9-_]{2,80}$/,
    clientSecret: /^.{1,200}$/,
  },
  connectors: {
    NAME: /^[^-\s()'"#@.&](?!.*[%&?,';:!\s-]{2}).{1,19}$/,
    COUNTRY: /^[A-Z]{2}$/,
    TECHNICAL_USER_NAME: /^[A-Za-z][a-zA-ZÀ-ÿ0-9 !&#'"()_\-=/.,;:]{1,80}$/,
    TECHNICAL_USER_DESCRIPTION:
      /^[A-Za-z][a-zA-ZÀ-ÿ0-9 !@&#'"()_\-=/*.,;:]{1,120}$/,
  },
  CANCEL_INPUT: /^[a-z0-9 ?*%$#@!-](?=)/i,
  techuser: {
    clientId: /^[a-zA-Z0-9-]{0,80}$/,
  },
  companyData: {
    CITY: /^[A-ZÀ-ÿ0-9Śął](([ .'-]|\. )?[A-Za-zÀ-ÿ0-9Śął]{1,40}){1,10}$/,
    STREET:
      /^(?!.*\s$)([a-zA-Z0-9À-ÿšŚął]{1,40}( ?[.,'/-] ?| )?){1,10}[a-zA-Z0-9À-ÿšŚął.]$/,
    COUNTRYCODE: /^[A-Za-zÀ-ÿ]{2,3}$/,
    COMMERCIAL_REG_NUMBER: /^(?!.*\s$)([A-Za-z0-9](\.|\s|-)?){4,21}$/,
    VAT_ID: /^(?!.*\s$)([A-Za-z0-9](\.|\s|-|\/)?){5,18}$/,
    LEI_CODE: /^[A-Za-z0-9]{20}$/,
    VIES: /^[A-Z]{2}[0-9A-Za-z+*.]{2,12}$/,
    EORI: /^[A-Z]{2}[A-Za-z0-9]{1,15}$/,
    POSTAL_CODE:
      /^(?!.*\s$)(?=[a-zA-Z\d-]{0,10}[-\s]?[a-zA-Z\d-]{0,10}$)[a-zA-Z\d\s-]{2,10}$/,
  },
  EMAIL_SEARCH: /^[ A-Za-z0-9._!@+-]*$/,
}

export const isEmpty = (expr: string) => !expr || expr.trim() === ''
export const isID = (expr: string) => Patterns.ID.test(expr)
export const isMail = (expr: string) => Patterns.MAIL.test(expr)
export const isBPN = (expr: string) => Patterns.BPN.test(expr)
export const isDomain = (expr: string) => Patterns.DOMAIN.test(expr)
export const isURL = (expr: string) => Patterns.URL.test(expr)
export const isKeycloakURL = (expr: string) =>
  isURL(expr) && !expr.includes('#')
export const isUUID = (expr: string) => Patterns.UUID.test(expr)
export const isExtID = (expr: string) =>
  Patterns.EXTID.test(expr) || isUUID(expr)
export const isCompanyName = (expr: string) => Patterns.COMPANY_NAME.test(expr)
export const isName = (expr: string) => Patterns.name.test(expr)
export const isCityName = isName
export const isStreetName = isName
export const isRegionName = (expr: string) => Patterns.regionName.test(expr)
export const isPersonName = (expr: string) => Patterns.personName.test(expr)
export const isFirstName = isPersonName
export const isLastName = isPersonName
export const isUserName = (expr: string) => isName(expr) || isMail(expr)
export const isZipCode = (expr: string) => Patterns.zipcode.test(expr)
export const isStreetNumber = (expr: string) => Patterns.streetNumber.test(expr)
export const isIDPClientID = (expr: string) => Patterns.idp.clientId.test(expr)
export const isIDPClientSecret = (expr: string) =>
  Patterns.idp.clientSecret.test(expr)
export const isCName = (expr: string) => Patterns.connectors.NAME.test(expr)
export const isCountryCode = (expr: string) =>
  Patterns.connectors.COUNTRY.test(expr)
export const isValidCancelInput = (expr: string) =>
  Patterns.CANCEL_INPUT.test(expr)
export const isClientID = (expr: string) =>
  Patterns.techuser.clientId.test(expr)
export const isCommercialRegNumber = (expr: string) =>
  Patterns.partner.COMMERCIAL_REG_NUMBER.test(expr)
export const isVatID = (expr: string) => Patterns.partner.VAT_ID.test(expr)
export const isLeiCode = (expr: string) => Patterns.partner.LEI_CODE.test(expr)
export const isVies = (expr: string) => Patterns.partner.VIES.test(expr)
export const isEori = (expr: string) => Patterns.partner.EORI.test(expr)
export const isPartnerUniqueID = (expr: string) =>
  isVies(expr) ||
  isCommercialRegNumber(expr) ||
  isVatID(expr) ||
  isLeiCode(expr) ||
  isEori(expr)
export const isMailOrEmpty = (expr: string) => expr === '' || isMail(expr)
export const isBPNOrEmpty = (expr: string) => expr === '' || isBPN(expr)
export const isDomainOrEmpty = (expr: string) => expr === '' || isDomain(expr)
export const isURLOrEmpty = (expr: string) => expr === '' || isURL(expr)
export const isIDOrEmpty = (expr: string) => expr === '' || isID(expr)
export const isUUIDOrEmpty = (expr: string) => expr === '' || isUUID(expr)
export const isNameOrEmpty = (expr: string) => expr === '' || isName(expr)
export const isCompanyNameOrEmpty = (expr: string) =>
  expr === '' || isCompanyName(expr)
export const isCityNameOrEmpty = (expr: string) =>
  expr === '' || isCityName(expr)
export const isStreetNameOrEmpty = (expr: string) =>
  expr === '' || isStreetName(expr)
export const isRegionNameOrEmpty = (expr: string) =>
  expr === '' || isRegionName(expr)
export const isFirstNameOrEmpty = (expr: string) =>
  expr === '' || isFirstName(expr)
export const isLastNameOrEmpty = (expr: string) =>
  expr === '' || isLastName(expr)
export const isUserNameOrEmpty = (expr: string) =>
  expr === '' || isUserName(expr)
export const isZipCodeOrEmpty = (expr: string) => expr === '' || isZipCode(expr)
export const isCountryCodeOrEmpty = (expr: string) =>
  expr === '' || isCountryCode(expr)
export const isStreetNumberOrEmpty = (expr: string) =>
  expr === '' || isStreetNumber(expr)
export const isCity = (expr: string) => Patterns.companyData.CITY.test(expr)
export const isStreet = (expr: string) => Patterns.companyData.STREET.test(expr)
export const isCountry = (expr: string) =>
  Patterns.companyData.COUNTRYCODE.test(expr)
export const isCompanyCommercialRegNumber = (expr: string) =>
  Patterns.companyData.COMMERCIAL_REG_NUMBER.test(expr)
export const isCompanyVatID = (expr: string) =>
  Patterns.companyData.VAT_ID.test(expr)
export const isCompantVies = (expr: string) =>
  Patterns.companyData.VIES.test(expr)
export const isCompanyEori = (expr: string) =>
  Patterns.companyData.EORI.test(expr)
export const isCompanyVies = (expr: string) =>
  Patterns.companyData.VIES.test(expr)
export const isPostalCode = (expr: string) =>
  Patterns.companyData.POSTAL_CODE.test(expr)

export default Patterns
