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

import { Input } from 'cx-portal-shared-components'
import { IdentityProvider, IDPAuthType } from 'features/admin/idpApiSlice'
import { useTranslation } from 'react-i18next'
import './style.scss'

export default function IDPDetailContent({ idp }: { idp: IdentityProvider }) {
  const { t } = useTranslation('', { keyPrefix: 'content.idpdetail' })
  const authType = idp.saml ? IDPAuthType.SAML : IDPAuthType.OIDC
  const authTypeData = idp.oidc || idp.saml
  const state = idp.enabled ? 'enabled' : 'disabled'

  const Field = ({ name, value }: { name: string; value: string }) => (
    <div style={{ margin: '12px 0' }}>
      <Input label={name} value={value} disabled={true} />
    </div>
  )

  return (
    <div className="idp-detail-content">
      <div className="idp-name-row">
        <Field name={t('alias')} value={idp.alias} />
        <Field name={t('displayName')} value={idp.displayName || ''} />
      </div>
      <div className="idp-name-row">
        <Field name={t('authType')} value={authType} />
        <Field name={t('status')} value={state} />
      </div>
      <Field name={t('authURL')} value={authTypeData?.authorizationUrl || ''} />
      <Field
        name={t('authMethod')}
        value={authTypeData?.clientAuthMethod || ''}
      />
      <ul>
        {idp.mappers.map((mapper) => (
          <li key={mapper.id}>
            <Field name={mapper.type} value={mapper.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}
