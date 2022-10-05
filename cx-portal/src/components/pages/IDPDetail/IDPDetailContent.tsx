/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { editIDPSelector, FORMS, storeForm } from 'features/control/formSlice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'

const EditInput = ({ name }: { name: string }) => {
  const { t } = useTranslation('', { keyPrefix: 'content.idpdetail' })
  const dispatch = useDispatch()
  const fieldValue = useSelector(editIDPSelector)

  const checkField = (e: any) => {
    let att: { [name: string]: string } = {}
    att[e.target.name] = e.target.value
    dispatch(storeForm({ form: FORMS.IDP_FORM, att }))
  }

  return (
    <Input
      name={name}
      label={t(name)}
      value={fieldValue[name] || ''}
      onChange={checkField}
    />
  )
}

export default function IDPDetailContent({ idp }: { idp: IdentityProvider }) {
  const { t } = useTranslation('', { keyPrefix: 'content.idpdetail' })
  const dispatch = useDispatch()
  const authType = idp.saml ? IDPAuthType.SAML : IDPAuthType.OIDC
  const authTypeData = idp.oidc || idp.saml
  const state = idp.enabled ? 'enabled' : 'disabled'

  useEffect(() => {
    let att: { [name: string]: string } = {}
    att.displayName = idp.displayName || ''
    att.metadataUrl = ''
    att.clientId = authTypeData?.clientId || ''
    att.secret = ''
    att.clientAuthMethod = authTypeData?.clientAuthMethod || ''
    att.signatureAlgorithm = authTypeData?.signatureAlgorithm || ''
    dispatch(storeForm({ form: FORMS.IDP_FORM, att }))
    // eslint-disable-next-line
  }, [idp])

  return (
    <div className="idp-detail-content">
      <Input label={'ID'} value={idp.identityProviderId} disabled={true} />
      <div className="idp-name-row">
        <Input label={t('alias')} value={idp.alias} disabled={true} />
        <EditInput name="displayName" />
      </div>
      <div className="idp-name-row">
        <Input label={t('authType')} value={authType} disabled={true} />
        <Input label={t('status')} value={state} disabled={true} />
      </div>
      <Input
        label={t('authorizationUrl')}
        value={authTypeData?.authorizationUrl || ''}
        disabled={true}
      />
      <EditInput name="metadataUrl" />
      <div className="idp-name-row">
        <EditInput name="clientId" />
        <EditInput name="secret" />
      </div>
      <div className="idp-name-row">
        <EditInput name="clientAuthMethod" />
        <EditInput name="signatureAlgorithm" />
      </div>
      <ul>
        {idp.mappers.map((mapper) => (
          <li key={mapper.id}>
            <Input label={mapper.type} value={mapper.name} disabled={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}
