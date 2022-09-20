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

import { ProvisionIdentityProviderForm } from 'components/pages/Admin/components/ProvisionIdentityProviderForm'
import { useState } from 'react'
import { info } from 'services/LogService'
import { ProvisioningApi } from 'features/provisioning/api'
import { ProvisionIdentityProviderData } from 'features/provisioning/types'

export default function Admin() {
  const [processing, setProcessing] = useState<string>('input')

  const doSubmit = (data: ProvisionIdentityProviderData) => {
    setProcessing('busy')

    new ProvisioningApi()
      .provisionIdp(data)
      .then(() => {
        setProcessing('success')
        info(`provisioning for company ${data.organisationName} started`)
      })
      .catch((error: unknown) => {
        setProcessing('failure')
        info(`provisioning for company ${data.organisationName} failed`)
        info(JSON.stringify(error))
      })
      .finally(() => {
        setTimeout(() => {
          setProcessing('input')
        }, 5000)
      })
  }

  return (
    <main className="Admin">
      <ProvisionIdentityProviderForm onSubmit={doSubmit} state={processing} />
    </main>
  )
}
