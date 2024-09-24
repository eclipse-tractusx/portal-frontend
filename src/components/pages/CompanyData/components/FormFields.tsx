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
  isCompanyCommercialRegNumber,
  isCountry,
  isCompanyEori,
  isName,
  isStreet,
  isCompanyVatID,
  isCompanyVies,
  isPostalCode,
} from 'types/Patterns'
import type { IHashMap } from 'types/MainTypes'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import { type CompanyDataFieldsType } from 'features/companyData/companyDataApiSlice'
import { useSelector } from 'react-redux'
import { companyDataSelector } from 'features/companyData/slice'
import {
  type UniqueIdentifier,
  useFetchUniqueIdentifierQuery,
} from 'features/admin/userApiSlice'
import { SelectList } from './SelectList'

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
  isAddress,
}: {
  data: CompanyDataFieldsType
  onChange: (key: string, value: string | undefined) => boolean
  identifiers: UniqueIdentifier[]
  newForm: boolean
  isAddress: boolean
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
          label={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.site.name`
          )}
          value={data.siteName ?? ''}
          validate={isName}
          hint={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.site.hint`
          )}
          errorMessage={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.site.error`
          )}
          onValid={onChange}
          onInvalid={onChange}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="street"
          label={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.street.name`
          )}
          value={data.street ?? ''}
          hint={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.street.hint`
          )}
          validate={isStreet}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.street.error`
          )}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="city"
          label={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.city.name`
          )}
          value={data.city ?? ''}
          hint={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.city.hint`
          )}
          validate={isCity}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.city.error`
          )}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="countryCode"
          label={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.countryCode.name`
          )}
          value={data.countryCode ?? ''}
          hint={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.countryCode.hint`
          )}
          validate={isCountry}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.countryCode.error`
          )}
          skipInitialValidation={newForm}
        />
      </div>
      <div style={{ margin: '12px 0' }}>
        <ValidatingInput
          name="postalCode"
          label={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.postal.name`
          )}
          value={data.postalCode ?? ''}
          hint={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.postal.hint`
          )}
          validate={isPostalCode}
          onValid={onChange}
          onInvalid={onChange}
          errorMessage={t(
            `content.companyData.${isAddress ? 'address' : 'site'}.form.postal.error`
          )}
          skipInitialValidation={newForm}
        />
      </div>
      {isAddress && (
        <>
          <div
            style={{
              marginTop: '-20px',
              marginBottom: '25px',
            }}
          >
            <SelectList
              error={false}
              helperText={t(
                'content.companyData.address.form.countryIdentifier.hint'
              )}
              defaultValue={defaultIdentifier?.[0]}
              items={identifiers}
              label={t(
                'content.companyData.address.form.countryIdentifier.name'
              )}
              placeholder={t(
                'content.companyData.address.form.countryIdentifier.name'
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
              label={t(
                'content.companyData.address.form.identifierNumber.name'
              )}
              value={data.identifierNumber ?? ''}
              hint={t('content.companyData.address.form.identifierNumber.hint')}
              validate={(expr) =>
                isCompanyCommercialRegNumber(expr) ||
                isCompanyVatID(expr) ||
                isCompanyVies(expr) ||
                isCompanyEori(expr)
              }
              onValid={onChange}
              onInvalid={onChange}
              errorMessage={t(
                'content.companyData.address.form.identifierNumber.error'
              )}
              skipInitialValidation={newForm}
            />
          </div>
        </>
      )}
    </>
  )
}

export const FormFields = ({
  onValid,
  newForm,
  isAddress,
}: {
  onValid: (form: { body: CompanyDataFieldsType } | undefined) => void
  newForm: boolean
  isAddress: boolean
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
      isName(current.siteName) &&
      current.street &&
      isStreet(current.street) &&
      current.city &&
      isCity(current.city)
    current.postalCode && isPostalCode(current.postalCode)
    current.countryCode && isCountry(current.countryCode)
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
      isAddress={isAddress}
    />
  )
}
