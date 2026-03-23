/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { type CSSProperties, useState } from 'react'
import { type IdentityProvider } from 'features/admin/idpApiSlice'
import {
  isBPNOrEmpty,
  isCityName,
  isCompanyName,
  isCountryCode,
  isExtID,
  isFirstName,
  isID,
  isLastName,
  isMail,
  isPartnerUniqueID,
  isRegionNameOrEmpty,
  isStreetName,
  isStreetNumberOrEmpty,
  isZipCodeOrEmpty,
} from 'types/Patterns'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import {
  Checkbox,
  SelectList,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import {
  type PartnerRegistration,
  type CompanyRoleAgreementData,
  type CompanyRole,
  UNIQUE_ID_TYPE,
  emptyPartnerRegistration,
} from 'features/admin/networkApiSlice'

const getEmptyPartnerRegistration = (identityProviderId: string) => ({
  ...emptyPartnerRegistration,
  userDetails: [
    {
      ...emptyPartnerRegistration.userDetails[0],
      identityProviderId,
    },
  ],
})

type ItemType = { id: string }

const uniqeIdItems: Array<ItemType> = Object.keys(UNIQUE_ID_TYPE).map(
  (item) => ({
    id: item,
  })
)

const OSPRegisterForm = ({
  idp,
  companyRoleAgreementData,
  onChange,
}: {
  idp: IdentityProvider
  companyRoleAgreementData: CompanyRoleAgreementData
  onChange: (partnerRegistration: PartnerRegistration | undefined) => boolean
}) => {
  const { t } = useTranslation('idp')

  const [data, setData] = useState<PartnerRegistration>(
    getEmptyPartnerRegistration(idp.identityProviderId)
  )

  const updateData = (newData: PartnerRegistration | undefined) => {
    if (newData) setData(newData)
    onChange(newData)
  }

  const invalidate = () => {
    updateData(undefined)
  }

  const inputStyle2: CSSProperties = { width: 406 }
  const inputStyle3: CSSProperties = { width: 260 }

  const inputs: Record<string, JSX.Element> = {
    extid: (
      <ValidatingInput
        style={inputStyle3}
        name={'extid'}
        label={t('field.extid.name')}
        hint={t('field.extid.hint')}
        validate={isExtID}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            externalId: value,
          })
        }}
      />
    ),
    company: (
      <ValidatingInput
        style={inputStyle3}
        name={'company'}
        label={t('field.company.name')}
        hint={t('field.company.hint')}
        validate={isCompanyName}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            name: value,
          })
        }}
      />
    ),
    bpn: (
      <ValidatingInput
        style={inputStyle3}
        name={'bpn'}
        label={t('field.bpn.name')}
        hint={t('field.bpn.hint')}
        validate={isBPNOrEmpty}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            bpn: value ? value.toLocaleUpperCase() : null,
          })
        }}
      />
    ),
    country: (
      <ValidatingInput
        style={inputStyle3}
        name={'country'}
        label={t('field.country.name')}
        hint={t('field.country.hint')}
        validate={isCountryCode}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            countryAlpha2Code: value,
          })
        }}
      />
    ),
    region: (
      <ValidatingInput
        style={inputStyle3}
        name={'region'}
        label={t('field.region.name')}
        hint={t('field.region.hint')}
        validate={isRegionNameOrEmpty}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            region: value,
          })
        }}
      />
    ),
    city: (
      <ValidatingInput
        style={inputStyle3}
        name={'city'}
        label={t('field.city.name')}
        hint={t('field.city.hint')}
        validate={isCityName}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            city: value,
          })
        }}
      />
    ),
    zipcode: (
      <ValidatingInput
        style={inputStyle3}
        name={'zipcode'}
        label={t('field.zipcode.name')}
        hint={t('field.zipcode.hint')}
        validate={isZipCodeOrEmpty}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            zipCode: value,
          })
        }}
      />
    ),
    streetName: (
      <ValidatingInput
        style={inputStyle3}
        name={'streetName'}
        label={t('field.streetName.name')}
        hint={t('field.streetName.hint')}
        validate={isStreetName}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            streetName: value,
          })
        }}
      />
    ),
    streetNumber: (
      <ValidatingInput
        style={inputStyle3}
        name={'streetNumber'}
        label={t('field.streetNumber.name')}
        hint={t('field.streetNumber.hint')}
        validate={isStreetNumberOrEmpty}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            streetNumber: value,
          })
        }}
      />
    ),
    providerId: (
      <ValidatingInput
        style={inputStyle2}
        name={'providerId'}
        label={t('field.providerId.name')}
        hint={t('field.providerId.hint')}
        validate={isID}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            userDetails: [
              {
                ...data.userDetails[0],
                providerId: value,
              },
            ],
          })
        }}
      />
    ),
    firstName: (
      <ValidatingInput
        style={inputStyle2}
        name={'firstName'}
        label={t('field.firstName.name')}
        hint={t('field.firstName.hint')}
        validate={isFirstName}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            userDetails: [
              {
                ...data.userDetails[0],
                firstName: value,
              },
            ],
          })
        }}
      />
    ),
    lastName: (
      <ValidatingInput
        style={inputStyle2}
        name={'lastName'}
        label={t('field.lastName.name')}
        hint={t('field.lastName.hint')}
        validate={isLastName}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            userDetails: [
              {
                ...data.userDetails[0],
                lastName: value,
              },
            ],
          })
        }}
      />
    ),
    email: (
      <ValidatingInput
        style={inputStyle2}
        name={'email'}
        label={t('field.email.name')}
        hint={t('field.email.hint')}
        validate={isMail}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            userDetails: [
              {
                ...data.userDetails[0],
                email: value,
              },
            ],
          })
        }}
      />
    ),
    uniqueId: (
      <div style={{ marginTop: -15, marginRight: 26, width: 814 }}>
        <SelectList
          {...{
            items: uniqeIdItems,
            defaultValue: uniqeIdItems[0],
            label: t('field.uniqueId.name'),
            placeholder: '',
            helperText: t('field.uniqueId.name'),
            margin: 'dense',
            variant: 'filled',
            clearText: 'clear',
            keyTitle: 'id',
            onChangeItem: (value): void => {
              updateData({
                ...data,
                uniqueIds: [
                  {
                    ...data.uniqueIds[0],
                    type: value.id as UNIQUE_ID_TYPE,
                  },
                ],
              })
            },
          }}
        />
      </div>
    ),
    uniqeIdValue: (
      <ValidatingInput
        style={inputStyle2}
        name={'uniqeIdValue'}
        label={t('field.uniqeIdValue.name')}
        hint={t('field.uniqeIdValue.hint')}
        validate={isPartnerUniqueID}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            uniqueIds: [
              {
                ...data.uniqueIds[0],
                value,
              },
            ],
          })
        }}
      />
    ),
    companyRoles: (
      <div>
        <div>
          <Typography variant="label3">
            {t('field.companyRoles.name')}
          </Typography>
        </div>
        {companyRoleAgreementData.companyRoles.map((role: CompanyRole) => (
          <Checkbox
            key={role.companyRole}
            label={role.companyRole}
            onChange={(e) => {
              const useRole = e.target.checked
              const companyRoles = [...data.companyRoles]
              if (useRole) {
                companyRoles.push(role.companyRole)
                companyRoles.sort((a, b) => a.localeCompare(b))
              } else {
                const index = companyRoles.indexOf(role.companyRole)
                if (index > -1) {
                  companyRoles.splice(index, 1)
                }
              }
              updateData({
                ...data,
                companyRoles,
              })
            }}
          />
        ))}
      </div>
    ),
  }

  const rowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 864,
  }

  return (
    <>
      <div style={rowStyle}>
        {inputs.company}
        {inputs.extid}
        {inputs.bpn}
      </div>
      <div style={rowStyle}>
        {inputs.country}
        {inputs.region}
        {inputs.zipcode}
      </div>
      <div style={rowStyle}>
        {inputs.city}
        {inputs.streetName}
        {inputs.streetNumber}
      </div>
      <div style={rowStyle}>
        {inputs.uniqueId}
        {inputs.uniqeIdValue}
      </div>
      <div style={rowStyle}>
        {inputs.providerId}
        {inputs.email}
      </div>
      <div style={rowStyle}>
        {inputs.firstName}
        {inputs.lastName}
      </div>
      <div>{inputs.companyRoles}</div>
    </>
  )
}

export const OSPRegisterContent = ({
  idp,
  companyRoleAgreementData,
  onValid,
}: {
  idp: IdentityProvider
  companyRoleAgreementData: CompanyRoleAgreementData
  onValid: (form: PartnerRegistration | undefined) => void
}) => {
  const doCheckForm = (
    partnerRegistration: PartnerRegistration | undefined
  ) => {
    const valid =
      partnerRegistration &&
      partnerRegistration.companyRoles.length > 0 &&
      partnerRegistration?.uniqueIds.length > 0 &&
      isPartnerUniqueID(partnerRegistration?.uniqueIds[0].value)
    onValid(valid ? partnerRegistration : undefined)
    return !!valid
  }

  return (
    <OSPRegisterForm
      idp={idp}
      companyRoleAgreementData={companyRoleAgreementData}
      onChange={doCheckForm}
    />
  )
}
