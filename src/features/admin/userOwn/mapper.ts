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

import type { KeycloakTokenParsed } from 'keycloak-js'
import type { AdminData, UserDetail } from './types'
import { t } from 'i18next'

export const userDetailsToCards = (
  user: UserDetail,
  parsedToken?: KeycloakTokenParsed
) => [
  {
    cardCategory: t('content.account.personalInfo.title'),
    cardContentItems: {
      name: {
        label: t('content.account.personalInfo.name'),
        value: user.firstName,
      },
      surname: {
        label: t('content.account.personalInfo.surname'),
        value: user.lastName,
      },
      email: {
        label: t('content.account.personalInfo.email'),
        value: user.email,
      },
      bpn: { label: t('content.account.personalInfo.bpn'), value: user.bpn },
    },
  },
  {
    cardCategory: t('content.account.statusInfo.title'),
    cardContentItems: {
      status: {
        label: t('content.account.statusInfo.status'),
        value: user.status,
      },
      userCreated: {
        label: t('content.account.statusInfo.userCreated'),
        value: user.created.substring(0, 16).replace('T', ' '),
      },
    },
  },
  {
    cardCategory: t('content.account.issuerInfo.title'),
    cardContentItems: {
      organisation: {
        label: t('content.account.issuerInfo.organisation'),
        value: parsedToken ? parsedToken.organisation : 'N/A',
      },
      adminName: {
        label: t('content.account.issuerInfo.adminName'),
        value: 'N/A',
      },
      adminMail: {
        label: t('content.account.issuerInfo.adminMail'),
        value: user.admin?.length
          ? user.admin?.map((data: AdminData) => data.email)
          : 'N/A',
      },
    },
  },
]
