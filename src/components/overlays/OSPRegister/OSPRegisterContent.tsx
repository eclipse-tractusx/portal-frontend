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

import { type CSSProperties, useState } from 'react'
import { type IdentityProvider } from 'features/admin/idpApiSlice'
import {
  isBPN,
  isCityName,
  isCompanyName,
  isCountryCode,
  isFirstName,
  isID,
  isLastName,
  isMail,
  isName,
  isRegionName,
  isStreetName,
  isStreetNumber,
  isUserName,
  isZipCode,
} from 'types/Patterns'
import { useTranslation } from 'react-i18next'
import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import {
  Checkbox,
  SelectList,
  Typography,
} from '@catena-x/portal-shared-components'
import {
  type PartnerRegistration,
  type CompanyRoleAgreementData,
  type CompanyRole,
  UNIQUE_ID_TYPE,
  emptyPartnerRegistration,
} from 'features/admin/networkApiSlice'

const emptyData: PartnerRegistration = {
  externalId: '',
  name: '',
  bpn: '',
  streetName: '',
  streetNumber: '',
  city: '',
  zipCode: '',
  region: '',
  countryAlpha2Code: '',
  uniqueIds: [],
  userDetails: [
    {
      identityProviderId: '',
      providerId: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    },
  ],
  companyRoles: [],
}

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
  const { t } = useTranslation('osp')

  const [data, setData] = useState<PartnerRegistration>(emptyData)

  const updateData = (newData: PartnerRegistration | undefined) => {
    if (newData) setData(newData)
    onChange(newData)
  }

  const invalidate = () => {
    updateData(undefined)
  }

  const inputStyle: CSSProperties = { width: 260 }

  const inputs: Record<string, JSX.Element> = {
    extid: (
      <ValidatingInput
        style={inputStyle}
        name={'extid'}
        label={t('field.extid.name')}
        hint={t('field.extid.hint')}
        validate={isID}
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
        style={inputStyle}
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
        style={inputStyle}
        name={'bpn'}
        label={t('field.bpn.name')}
        hint={t('field.bpn.hint')}
        validate={isBPN}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            bpn: value,
          })
        }}
      />
    ),
    country: (
      <ValidatingInput
        style={inputStyle}
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
        style={inputStyle}
        name={'region'}
        label={t('field.region.name')}
        hint={t('field.region.hint')}
        validate={isRegionName}
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
        style={inputStyle}
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
        style={inputStyle}
        name={'zipcode'}
        label={t('field.zipcode.name')}
        hint={t('field.zipcode.hint')}
        validate={isZipCode}
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
        style={inputStyle}
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
        style={inputStyle}
        name={'streetNumber'}
        label={t('field.streetNumber.name')}
        hint={t('field.streetNumber.hint')}
        validate={isStreetNumber}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            streetNumber: value,
          })
        }}
      />
    ),
    identityProviderId: (
      <ValidatingInput
        style={inputStyle}
        name={'identityProviderId'}
        label={t('field.identityProviderId.name')}
        hint={t('field.identityProviderId.hint')}
        validate={isID}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            userDetails: [
              {
                ...data.userDetails[0],
                identityProviderId: value,
              },
            ],
          })
        }}
      />
    ),
    providerId: (
      <ValidatingInput
        style={inputStyle}
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

    username: (
      <ValidatingInput
        style={inputStyle}
        name={'username'}
        label={t('field.username.name')}
        hint={t('field.username.hint')}
        validate={isUserName}
        onInvalid={invalidate}
        onValid={(_key, value: string) => {
          updateData({
            ...data,
            userDetails: [
              {
                ...data.userDetails[0],
                username: value,
              },
            ],
          })
        }}
      />
    ),
    firstName: (
      <ValidatingInput
        style={inputStyle}
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
        style={inputStyle}
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
        style={inputStyle}
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
      <div style={{ marginTop: -39, marginRight: 30, width: 820 }}>
        ,
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
            onChangeItem: (value: ItemType): void => {
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
        style={{ width: 400 }}
        name={'uniqeIdValue'}
        label={t('field.uniqeIdValue.name')}
        hint={t('field.uniqeIdValue.hint')}
        validate={isName}
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
        {inputs.identityProviderId}
        {inputs.providerId}
        {inputs.username}
      </div>
      <div style={rowStyle}>
        {inputs.firstName}
        {inputs.lastName}
        {inputs.email}
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
  const initialData: PartnerRegistration = {
    ...emptyPartnerRegistration,
    userDetails: [
      {
        ...emptyPartnerRegistration.userDetails[0],
        identityProviderId: idp.identityProviderId,
      },
    ],
  }
  const [formData, setFormData] = useState<string>(
    JSON.stringify(initialData, null, 2)
  )
  const [debug, setDebug] = useState<boolean>(false)
  const toggleDebug = () => {
    setDebug(!debug)
  }

  const doCheckForm = (
    partnerRegistration: PartnerRegistration | undefined
  ) => {
    const valid =
      partnerRegistration?.name !== undefined &&
      partnerRegistration?.externalId !== undefined &&
      partnerRegistration.companyRoles.length > 0 &&
      partnerRegistration?.uniqueIds.length > 0 &&
      partnerRegistration?.uniqueIds[0].value !== undefined
    onValid(valid ? partnerRegistration : undefined)
    setFormData(
      valid ? JSON.stringify(partnerRegistration, null, 2) : '# data invalid'
    )
    return !!valid
  }

  return (
    <>
      <OSPRegisterForm
        idp={idp}
        companyRoleAgreementData={companyRoleAgreementData}
        onChange={doCheckForm}
      />
      <pre
        style={{
          fontSize: '10px',
          backgroundColor: '#eeeeee',
          cursor: 'pointer',
        }}
        onClick={toggleDebug}
        onKeyUp={toggleDebug}
      >
        {debug ? formData : '{...}'}
      </pre>
      ,
    </>
  )
}
