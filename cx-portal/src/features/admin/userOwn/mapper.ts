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

import { UserDetail } from './types'

export const userDetailsToCards = (user: UserDetail) => [
  {
    cardCategory: 'Personal Information',
    cardContentItems: {
      name: { label: 'Name', value: user.firstName },
      surname: { label: 'Nachname', value: user.lastName },
      email: { label: 'E-Mail', value: user.email },
      bpn: { label: 'BPN', value: user.bpn },
    },
  },
  {
    cardCategory: 'Status Information',
    cardContentItems: {
      status: { label: 'Status', value: user.status },
      userCreated: {
        label: 'Nutzer angelegt',
        value: user.created.substring(0, 16).replace('T', ' '),
      },
    },
  },
  {
    cardCategory: 'Issuer Information',
    cardContentItems: {
      organisation: { label: 'Organisation', value: 'BMW' },
      adminName: { label: 'Admin Name', value: 'Admin Muster' },
      adminMail: { label: 'Admin E-Mail', value: 'admin.muster@test.de' },
    },
  },
]
