/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import { Textarea } from '@catena-x/portal-shared-components'
import { type IdentityProvider } from 'features/admin/idpApiSlice'
import {
  type PartnerRegistration,
  UNIQUE_ID_TYPE,
  COMPANY_ROLE,
} from 'features/admin/networkApiSlice'
import { useState } from 'react'
import UserService from 'services/UserService'

export const OSPRegisterContent = ({
  idp,
  onValid,
}: {
  idp: IdentityProvider
  onValid: (form: PartnerRegistration | undefined) => void
}) => {
  const TEST_DATA: PartnerRegistration = {
    externalId: '3fa85f64-0000-0000-0000-2c963f66afa6',
    name: 'Testcompany',
    bpn: 'BPNL000000123456',
    streetName: 'Bremer Str.',
    streetNumber: '6',
    city: 'München',
    zipCode: '80809',
    region: 'Bayern',
    countryAlpha2Code: 'DE',
    uniqueIds: [
      {
        type: UNIQUE_ID_TYPE.COMMERCIAL_REG_NUMBER,
        value: 'string',
      },
    ],
    userDetails: [
      {
        identityProviderId: idp.identityProviderId,
        providerId: idp.alias,
        username: UserService.getUsername(),
        firstName: UserService.getName(),
        lastName: UserService.getName(),
        email: UserService.getEmail(),
      },
    ],
    companyRoles: [COMPANY_ROLE.ACTIVE_PARTICIPANT],
  }

  const [data, setData] = useState<string>(JSON.stringify(TEST_DATA, null, 2))

  const doCheckData = (value: string) => {
    try {
      const registerData = JSON.parse(value)
      setData(JSON.stringify(registerData, null, 2))
      onValid(registerData)
    } catch (e) {
      setData(value)
      onValid(undefined)
    }
  }

  return (
    <Textarea
      minRows={20}
      value={data}
      onChange={(e) => {
        doCheckData(e.target.value)
      }}
    />
  )
}
