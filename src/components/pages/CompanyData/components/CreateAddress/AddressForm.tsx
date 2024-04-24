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
import { isCityName, isName, isStreetName, isZipCode } from 'types/Patterns'
import type { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import { type CompanyDataAddressType } from 'features/companyData/companyDataApiSlice'

const responseToForm = (data: CompanyDataAddressType) => {
  const form: IHashMap<string> = {}
  form.companySite = data.companySite ?? ''
  form.street = data.street ?? ''
  form.postalCode = data.postalCode ?? ''
  form.city = data.city ?? ''
  form.addressTitle = data.addressTitle ?? ''
  return form
}

const formToUpdate = (form: IHashMap<string>) => ({
  companySite: form.companySite,
  addressTitle: form.addressTitle,
  postalCode: form.postalCode,
  street: form.street,
  city: form.city,
})

const UpdateForm = ({
  data,
  onChange,
}: {
  data: CompanyDataAddressType
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div style={{ marginTop: '34px' }}>
        <ValidatingInput
          name="companySite"
          label={t('content.companyData.address.form.companySite.name')}
          value={data.companySite}
          validate={(expr) => isName(expr)}
          hint={t('content.companyData.address.form.companySite.hint')}
          debounceTime={0}
          onValid={onChange}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="addressTitle"
          label={t('content.companyData.address.form.addressTitle.name')}
          value={data.addressTitle}
          hint={t('content.companyData.address.form.addressTitle.hint')}
          validate={(expr) => isStreetName(expr)}
          onValid={onChange}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="street"
          label={t('content.companyData.address.form.street.name')}
          value={data.street}
          hint={t('content.companyData.address.form.street.hint')}
          validate={(expr) => isZipCode(expr)}
          onValid={onChange}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="postalCode"
          label={t('content.companyData.address.form.postal.name')}
          value={data.postalCode}
          hint={t('content.companyData.address.form.postal.hint')}
          validate={(expr) => isZipCode(expr)}
          onValid={onChange}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="city"
          label={t('content.companyData.address.form.city.name')}
          value={data.city}
          hint={t('content.companyData.address.form.city.hint')}
          validate={(expr) => isCityName(expr)}
          onValid={onChange}
        />
      </div>
    </>
  )
}

export const AddressForm = ({
  onValid,
}: {
  onValid: (form: { body: CompanyDataAddressType } | undefined) => void
}) => {
  const data: CompanyDataAddressType = {
    companySite: '',
    street: '',
    postalCode: '',
    city: '',
    addressTitle: '',
  }
  const [formData, setFormData] = useState<IHashMap<string>>(
    responseToForm(data)
  )

  const checkData = (key: string, value: string | undefined): boolean => {
    const current: IHashMap<string> = { ...formData }
    current[key] = value!
    setFormData(current)
    const formValid =
      current.companySite &&
      current.street &&
      current.city &&
      current.postalCode &&
      current.addressTitle
    onValid(
      formValid
        ? {
            body: formToUpdate(current),
          }
        : undefined
    )
    return true
  }

  return <UpdateForm data={data} onChange={checkData} />
}
