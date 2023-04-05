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

import { IdentityProvider } from 'features/admin/idpApiSlice'
import { Image, Tooltips } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './style.scss'

export default function IDPStateProgress({ idp }: { idp: IdentityProvider }) {
  const { t } = useTranslation('idp')
  const configured = idp.oidc?.clientId ? true : false

  const getConjunction = (enabled: boolean) =>
    enabled ? ' &' : `, ${t('field.not')}`

  const getText = (configured: boolean, enabled: boolean) =>
    configured
      ? `${t('field.configured')}${getConjunction(enabled)} ${t(
          'field.enabled'
        )}`
      : `${t('field.not')} ${t('field.configured')}`

  const getStateImage = (configured: boolean, enabled: boolean) =>
    `<svg viewBox="-6 -6 112 36" xmlns="http://www.w3.org/2000/svg"><g stroke="gray" stroke-width="2">
    <path d="M 12 12 H 80"/>
    <circle fill="gray" cx="12" cy="12" r="11"/>
    <circle fill="${configured ? 'gray' : 'white'}" cx="50" cy="12" r="11"/>
    <circle fill="${enabled ? 'gray' : 'white'}" cx="88" cy="12" r="11"/>
    </g></svg>`

  const stateMessage = getText(configured, idp.enabled)

  return (
    <Tooltips tooltipPlacement="left" tooltipText={stateMessage}>
      <div>
        <Image
          alt={stateMessage}
          style={{ width: '112px', height: '40px' }}
          src={`data:image/svg+xml;utf8,${getStateImage(
            configured,
            idp.enabled
          )}`}
        />
      </div>
    </Tooltips>
  )
}
