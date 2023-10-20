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

import { Checkbox } from '@catena-x/portal-shared-components'
import { type IdentityProvider } from 'features/admin/idpApiSlice'
import { useState } from 'react'
import { type IHashMap } from 'types/MainTypes'

type AgreementMap = IHashMap<boolean>

export const OSPConsentContent = ({
  idp,
  onValid,
}: {
  idp: IdentityProvider
  onValid: (consent: boolean) => void
}) => {
  const TEST_AGREEMENTS: Array<string> = [
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
  ]
  const agreementMap: AgreementMap = TEST_AGREEMENTS.reduce((a, c) => {
    a[c] = false
    return a
  }, {} as AgreementMap)

  const [consent, setConsent] = useState<AgreementMap>(agreementMap)

  const doCheckData = (agreement: string) => {
    const currentConsent = consent
    currentConsent[agreement] = !currentConsent[agreement]
    const valid = TEST_AGREEMENTS.reduce((a, c) => a && currentConsent[c], true)
    console.log(valid)
    onValid(valid)
    setConsent({ ...currentConsent })
  }

  return (
    <div style={{ margin: '80px 120px' }}>
      {TEST_AGREEMENTS.map((agreement) => (
        <Checkbox
          label={`I consent to ${agreement}`}
          onChange={() => {
            doCheckData(agreement)
          }}
          checked={consent[agreement]}
        />
      ))}
    </div>
  )
}
