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

import { useEffect, useState } from 'react'
import type {
  IdentityProviderUser,
  UserIdentityProvidersItem,
} from 'features/admin/idpApiSlice'
import { isID } from 'types/Patterns'
import type { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import { getApiBase } from 'services/EnvironmentService'
import UserService from 'services/UserService'

const EnableIDPForm = ({
  userId = '',
  onChange,
}: {
  userId?: string
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  const { t } = useTranslation('idp')
  return (
    <div style={{ margin: '20px 0' }}>
      <ValidatingInput
        name={'userId'}
        label={t('enable.label')}
        hint={t('enable.hint')}
        value={userId}
        validate={isID}
        onValid={onChange}
      />
    </div>
  )
}

export const EnableIDPContent = ({
  identityProviderId,
  companyUserId,
  onValid,
}: {
  identityProviderId: string
  companyUserId: string
  onValid: (form: IdentityProviderUser | undefined) => void
}) => {
  const [formData, setFormData] = useState<IHashMap<string>>({})
  const [userId, setUserId] = useState<string>('')

  const checkData = (key: string, value: string | undefined): boolean => {
    if (!value) {
      onValid(undefined)
      return false
    }
    const current: IHashMap<string> = { ...formData }
    current[key] = value
    setFormData(current)
    const formValid = !!current.userId
    onValid(
      formValid
        ? {
            companyUserId: '',
            identityProviderId: '',
            userId: current.userId,
            userName: '',
          }
        : undefined
    )
    return true
  }

  useEffect(() => {
    if (!identityProviderId || !companyUserId) return
    fetch(
      `${getApiBase()}/api/administration/identityprovider/owncompany/users/${companyUserId}/identityprovider/${identityProviderId}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data: UserIdentityProvidersItem) => setUserId(data.userId))
      .catch((e) => console.log(e))
  }, [identityProviderId, companyUserId])

  return (
    <div style={{ width: '85%', margin: '40px auto' }}>
      <EnableIDPForm onChange={checkData} userId={userId} />
    </div>
  )
}
