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

import { useState } from 'react'
import {
  type IdentityProvider,
  type IdentityProviderUpdate,
  type IdentityProviderUpdateBody,
  OIDCAuthMethod,
  OIDCSignatureAlgorithm,
} from 'features/admin/idpApiSlice'
import { isBPN, isCompanyName, isCountryCode, isID } from 'types/Patterns'
import type { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'

const idpToForm = (idp: IdentityProvider) => {
  const form: IHashMap<string> = {}
  form.displayName = idp.displayName ?? ''
  form.metadataUrl = ''
  form.clientId = idp.oidc?.clientId ?? ''
  form.secret = ''
  form.clientAuthMethod =
    idp.oidc?.clientAuthMethod ?? OIDCAuthMethod.SECRET_BASIC
  form.signatureAlgorithm =
    idp.oidc?.signatureAlgorithm ?? OIDCSignatureAlgorithm.ES256
  return form
}

const formToUpdate = (form: IHashMap<string>): IdentityProviderUpdateBody => ({
  displayName: form.displayName,
  oidc: {
    metadataUrl: form.metadataUrl,
    clientId: form.clientId,
    secret: form.secret,
    clientAuthMethod: form.clientAuthMethod as OIDCAuthMethod,
    signatureAlgorithm: form.signatureAlgorithm as OIDCSignatureAlgorithm,
  },
})

const OSPRegisterForm = ({
  idp,
  onChange,
}: {
  idp: IdentityProvider
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  const { t } = useTranslation('osp')

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: 400, marginRight: 12 }}>
          <div style={{ marginTop: '12px 0' }}>
            <ValidatingInput
              name="extid"
              label={t('field.extid.name')}
              hint={t('field.extid.hint')}
              validate={isID}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="company"
              label={t('field.company.name')}
              hint={t('field.company.hint')}
              validate={isCompanyName}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="bpn"
              label={t('field.bpn.name')}
              hint={t('field.bpn.hint')}
              validate={isBPN}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="street"
              label={t('field.street.name')}
              hint={t('field.street.hint')}
              validate={() => true}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="country"
              label={t('field.country.name')}
              hint={t('field.country.hint')}
              validate={isCountryCode}
              onValid={onChange}
            />
          </div>
        </div>

        <div style={{ width: 400, marginLeft: 12 }}>
          <div style={{ marginTop: '12px 0' }}>
            <ValidatingInput
              name="lorem"
              label={t('field.lorem.name')}
              hint={t('field.lorem.hint')}
              validate={isID}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="ipsum"
              label={t('field.ipsum.name')}
              hint={t('field.ipsum.hint')}
              validate={isCompanyName}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="dolor"
              label={t('field.dolor.name')}
              hint={t('field.dolor.hint')}
              validate={() => true}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="sit"
              label={t('field.sit.name')}
              hint={t('field.sit.hint')}
              validate={() => true}
              onValid={onChange}
            />
          </div>
          <div style={{ margin: '12px 0' }}>
            <ValidatingInput
              name="amet"
              label={t('field.amet.name')}
              hint={t('field.amet.hint')}
              validate={() => true}
              onValid={onChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export const OSPRegisterContent = ({
  idp,
  onValid,
}: {
  idp: IdentityProvider
  onValid: (form: IdentityProviderUpdate | undefined) => void
}) => {
  const [formData, setFormData] = useState<IHashMap<string>>(idpToForm(idp))

  const checkData = (key: string, value: string | undefined): boolean => {
    const current: IHashMap<string> = { ...formData }
    current[key] = value as OIDCSignatureAlgorithm
    setFormData(current)
    const formValid = current.extid
    onValid(
      formValid
        ? {
            identityProviderId: idp.identityProviderId,
            body: formToUpdate(current),
          }
        : undefined
    )
    return true
  }

  return <OSPRegisterForm idp={idp} onChange={checkData} />
}
