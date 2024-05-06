/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
  isCity,
  isCountry,
  isCountryCode,
  isName,
  isStreet,
  isZipCode,
} from 'types/Patterns'
import type { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import { SelectList } from '@catena-x/portal-shared-components'
import { type CompanyDataSiteType } from 'features/companyData/companyDataApiSlice'
import { useSelector } from 'react-redux'
import { companyDataSelector } from 'features/companyData/slice'

const responseToForm = (data: CompanyDataSiteType) => {
  const form: IHashMap<string> = {}
  form.siteName = data.siteName ?? ''
  form.street = data.street ?? ''
  form.postalCode = data.postalCode ?? ''
  form.city = data.city ?? ''
  form.countryCode = data.countryCode ?? ''
  form.countryIdentifier = data.countryIdentifier ?? ''
  form.identifierNumber = data.identifierNumber ?? ''
  return form
}

const formToUpdate = (form: IHashMap<string>) => ({
  siteName: form.siteName,
  street: form.street,
  postalCode: form.postalCode,
  city: form.city,
  countryCode: form.countryCode,
  countryIdentifier: form.countryIdentifier,
  identifierNumber: form.identifierNumber,
})

const UpdateForm = ({
  data,
  onChange,
}: {
  data: CompanyDataSiteType
  onChange: (key: string, value: string | undefined) => boolean
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div style={{ marginTop: '34px' }}>
        <ValidatingInput
          name="siteName"
          label={t('content.companyData.site.form.site.name')}
          value={data.siteName}
          validate={(expr) => isName(expr)}
          hint={t('content.companyData.site.form.site.hint')}
          errorMessage={t('content.companyData.site.form.site.error')}
          onValid={onChange}
          onInvalid={onChange}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="street"
          label={t('content.companyData.site.form.street.name')}
          value={data.street}
          hint={t('content.companyData.site.form.street.hint')}
          validate={(expr) => isStreet(expr)}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.street.error')}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="city"
          label={t('content.companyData.site.form.city.name')}
          value={data.city}
          hint={t('content.companyData.site.form.city.hint')}
          validate={(expr) => isCity(expr)}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.city.error')}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="countryCode"
          label={t('content.companyData.site.form.countryCode.name')}
          value={data.countryCode}
          hint={t('content.companyData.site.form.countryCode.hint')}
          validate={(expr) => isCountry(expr)}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.countryCode.error')}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="postalCode"
          label={t('content.companyData.site.form.postal.name')}
          value={data.postalCode}
          hint={t('content.companyData.site.form.postal.hint')}
          validate={(expr) => isZipCode(expr)}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.postal.error')}
        />
      </div>
      <div
        style={{
          marginTop: '-20px',
          marginBottom: '25px',
        }}
      >
        <SelectList
          error={false}
          helperText={t('content.companyData.site.form.countryIdentifier.hint')}
          defaultValue={data.countryIdentifier}
          items={[]}
          label={t('content.companyData.site.form.countryIdentifier.name')}
          placeholder={t(
            'content.companyData.site.form.countryIdentifier.name'
          )}
          onChangeItem={() => {}}
          keyTitle={'id'}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="identifierNumber"
          label={t('content.companyData.site.form.identifierNumber.name')}
          value={data.countryIdentifier}
          hint={t('content.companyData.site.form.identifierNumber.hint')}
          validate={(expr) => isCountryCode(expr)}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t(
            'content.companyData.site.form.identifierNumber.error'
          )}
        />
      </div>
    </>
  )
}

export const SiteForm = ({
  onValid,
  newForm,
}: {
  onValid: (form: { body: CompanyDataSiteType } | undefined) => void
  newForm: boolean
}) => {
  const siteData = useSelector(companyDataSelector)

  const data: CompanyDataSiteType = {
    siteName: newForm ? '' : siteData.site.name,
    street: newForm ? '' : siteData.address.physicalPostalAddress.street.name,
    postalCode: newForm
      ? ''
      : siteData.address.physicalPostalAddress.postalCode,
    city: newForm ? '' : siteData.address.physicalPostalAddress.city,
    countryCode: newForm ? '' : siteData.address.physicalPostalAddress.country,
    countryIdentifier: newForm ? '' : '',
    identifierNumber: newForm ? '' : '',
  }
  const [formData, setFormData] = useState<IHashMap<string>>(
    responseToForm(data)
  )

  const checkData = (key: string, value: string | undefined): boolean => {
    const current: IHashMap<string> = { ...formData }
    current[key] = value!
    setFormData(current)
    const formValid =
      current.siteName &&
      current.street &&
      current.city &&
      current.postalCode &&
      current.countryCode &&
      current.countryIdentifier &&
      current.identifierNumber
    onValid(
      formValid
        ? {
            body: formToUpdate(current),
          }
        : undefined
    )
    return false
  }

  return <UpdateForm data={data} onChange={checkData} />
}
