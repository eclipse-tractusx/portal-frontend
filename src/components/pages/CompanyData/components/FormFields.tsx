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

import { useEffect, useState } from 'react'
import {
  isCity,
  isCommercialRegNumber,
  isCountry,
  isEori,
  isName,
  isStreet,
  isVatID,
  isVies,
  isZipCode,
} from 'types/Patterns'
import type { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import { SelectList } from '@catena-x/portal-shared-components'
import { type CompanyDataFieldsType } from 'features/companyData/companyDataApiSlice'
import { useSelector } from 'react-redux'
import { companyDataSelector } from 'features/companyData/slice'
import {
  type UniqueIdentifier,
  useFetchUniqueIdentifierQuery,
} from 'features/admin/userApiSlice'

const responseToForm = (data: CompanyDataFieldsType) => {
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
  identifiers,
  newForm,
}: {
  data: CompanyDataFieldsType
  onChange: (key: string, value: string | undefined) => boolean
  identifiers: UniqueIdentifier[]
  newForm: boolean
}) => {
  const { t } = useTranslation()
  const [defaultIdentifier, setDefaultIdentifier] =
    useState<UniqueIdentifier[]>()

  useEffect(() => {
    const current = identifiers.filter(
      (item) => item.label === data.countryIdentifier
    )
    setDefaultIdentifier(current)
  }, [identifiers, data])

  return (
    <>
      <div style={{ marginTop: '34px' }}>
        <ValidatingInput
          name="siteName"
          label={t('content.companyData.site.form.site.name')}
          value={data.siteName ?? ''}
          validate={isName}
          hint={t('content.companyData.site.form.site.hint')}
          errorMessage={t('content.companyData.site.form.site.error')}
          onValid={onChange}
          onInvalid={onChange}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="street"
          label={t('content.companyData.site.form.street.name')}
          value={data.street ?? ''}
          hint={t('content.companyData.site.form.street.hint')}
          validate={isStreet}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.street.error')}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="city"
          label={t('content.companyData.site.form.city.name')}
          value={data.city ?? ''}
          hint={t('content.companyData.site.form.city.hint')}
          validate={isCity}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.city.error')}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="countryCode"
          label={t('content.companyData.site.form.countryCode.name')}
          value={data.countryCode ?? ''}
          hint={t('content.companyData.site.form.countryCode.hint')}
          validate={isCountry}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.countryCode.error')}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="postalCode"
          label={t('content.companyData.site.form.postal.name')}
          value={data.postalCode ?? ''}
          hint={t('content.companyData.site.form.postal.hint')}
          validate={isZipCode}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t('content.companyData.site.form.postal.error')}
          skipInitialValidation={newForm}
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
          defaultValue={defaultIdentifier?.[0]}
          items={identifiers}
          label={t('content.companyData.site.form.countryIdentifier.name')}
          placeholder={t(
            'content.companyData.site.form.countryIdentifier.name'
          )}
          onChangeItem={(val) => {
            onChange('countryIdentifier', val.label)
          }}
          keyTitle={'label'}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="identifierNumber"
          label={t('content.companyData.site.form.identifierNumber.name')}
          value={data.identifierNumber ?? ''}
          hint={t('content.companyData.site.form.identifierNumber.hint')}
          validate={(expr) =>
            isCommercialRegNumber(expr) ||
            isVatID(expr) ||
            isVies(expr) ||
            isEori(expr)
          }
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t(
            'content.companyData.site.form.identifierNumber.error'
          )}
          skipInitialValidation={newForm}
        />
      </div>
    </>
  )
}

export const FormFields = ({
  onValid,
  newForm,
}: {
  onValid: (form: { body: CompanyDataFieldsType } | undefined) => void
  newForm: boolean
}) => {
  const companyData = useSelector(companyDataSelector)

  const [code, setCode] = useState<string>(
    companyData?.address?.physicalPostalAddress?.country ?? ''
  )

  const { data: identifiers } = useFetchUniqueIdentifierQuery(code, {
    skip: code === '',
  })

  const identifier = companyData.identifiers.filter(
    (item) => item.type !== null && item.type !== ''
  )

  const data: CompanyDataFieldsType = {
    siteName: newForm ? '' : companyData.site.name,
    street: newForm
      ? ''
      : companyData.address.physicalPostalAddress.street.name,
    postalCode: newForm
      ? ''
      : companyData.address.physicalPostalAddress.postalCode,
    city: newForm ? '' : companyData.address.physicalPostalAddress.city,
    countryCode: newForm
      ? ''
      : companyData.address.physicalPostalAddress.country,
    countryIdentifier: newForm ? '' : identifier?.[0]?.type ?? '',
    identifierNumber: newForm ? '' : identifier?.[0]?.value ?? '',
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
      current.identifierNumber &&
      current.countryIdentifier
    onValid(
      formValid
        ? {
            body: formToUpdate(current),
          }
        : undefined
    )
    return false
  }

  useEffect(() => {
    if (formData.countryCode !== '') {
      setCode(formData.countryCode)
    }
  }, [formData])

  return (
    <UpdateForm
      newForm={newForm}
      identifiers={identifiers ?? []}
      data={data}
      onChange={checkData}
    />
  )
}
