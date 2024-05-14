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
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { Radio, Typography } from '@catena-x/portal-shared-components'
import {
  type ServiceAccountRole,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'

export type DefaultFormFieldValuesType = {
  TechnicalUserName: string
  TechnicalUserService: string
  TechnicalUserDescription: string
}

export type FormSelectType = {
  control: Control<DefaultFormFieldValuesType>
  trigger: (
    name:
      | 'TechnicalUserName'
      | 'TechnicalUserService'
      | 'TechnicalUserDescription'
  ) => void
  errors: FieldErrors<{
    TechnicalUserName: string
    TechnicalUserService: string
    TechnicalUserDescription: string
  }>
  name:
    | 'TechnicalUserName'
    | 'TechnicalUserService'
    | 'TechnicalUserDescription'
  rules: Object
}

export type FormAddType = {
  control: Control<DefaultFormFieldValuesType>
  trigger: (
    name:
      | 'TechnicalUserName'
      | 'TechnicalUserService'
      | 'TechnicalUserDescription'
  ) => void
  errors: FieldErrors<{
    TechnicalUserName: string
    TechnicalUserService: string
    TechnicalUserDescription: string
  }>
  helperText: string
  label: string
  placeholder: string
  name:
    | 'TechnicalUserName'
    | 'TechnicalUserService'
    | 'TechnicalUserDescription'
  rules: Object
  limit?: number
}

const TechnicalUserAddFormSelect = ({
  control,
  trigger,
  errors,
  name,
  rules,
}: FormSelectType) => {
  const { t } = useTranslation()
  const roles = useFetchServiceAccountRolesQuery().data
  const [selectedValue, setSelectedValue] = useState<string>()

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Box className="technicalUserForm">
          <InputLabel
            error={!!errors[name as keyof Object]}
            sx={{ marginBottom: '7px', color: '#000' }}
          >
            <Typography variant="h5">
              {t('content.addUser.technicalUser.addOverlay.service')}
            </Typography>
          </InputLabel>
          <Typography variant="body2">
            {t('content.addUser.technicalUser.addOverlay.serviceSubHeading')}
          </Typography>
          {roles?.map((role: ServiceAccountRole) => (
            <>
              <Radio
                key={role.roleId}
                name="radio-buttons"
                label={role.roleName}
                checked={selectedValue === role.roleId}
                value={role.roleId}
                onChange={(event) => {
                  setSelectedValue(event.target.value)
                  trigger(name)
                  onChange(event)
                }}
                size="small"
                sx={{
                  display: 'flex',
                  fontFamily: 'LibreFranklin-Light !important',
                }}
              />
              <Typography variant="body3" className="roleDescription">
                {role.roleDescription ?? '-'}
              </Typography>
            </>
          ))}
          {!!errors[name as keyof Object] && (
            <FormHelperText
              sx={{ marginBottom: '23px', color: 'danger.danger' }}
            >
              {t('content.addUser.technicalUser.addOverlay.error.select')}
            </FormHelperText>
          )}
        </Box>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  )
}

const TechnicalUserAddFormTextfield = ({
  control,
  trigger,
  errors,
  helperText,
  label,
  placeholder,
  name,
  rules,
  limit = 80,
}: FormAddType) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel
            error={!!errors[name as keyof Object]}
            sx={{ marginBottom: '7px', color: '#000' }}
          >
            <Typography variant="body2">{label}</Typography>
          </InputLabel>
          <TextField
            error={!!errors[name as keyof Object]}
            fullWidth
            helperText={
              errors[name as keyof Object]
                ? helperText
                : `${value.length}/${limit}`
            }
            inputProps={{
              maxLength: limit,
            }}
            multiline
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            placeholder={placeholder}
            value={value}
            variant="filled"
            FormHelperTextProps={{
              sx: {
                marginLeft: errors[name as keyof Object] ? '' : 'auto',
              },
            }}
            InputProps={{
              endAdornment: !!errors[name as keyof Object] && (
                <InputAdornment sx={{ color: 'danger.danger' }} position="end">
                  <ErrorOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  )
}

export const TechnicalUserAddForm = ({
  control,
  errors,
  handleSubmit,
  trigger,
}: {
  control: Control<DefaultFormFieldValuesType>
  errors: FieldErrors<{
    TechnicalUserName: string
    TechnicalUserService: string
    TechnicalUserDescription: string
  }>
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  handleSubmit: any
  trigger: (
    name:
      | 'TechnicalUserName'
      | 'TechnicalUserService'
      | 'TechnicalUserDescription'
  ) => void
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ marginBottom: '23px' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <TechnicalUserAddFormTextfield
            {...{
              control,
              errors,
              trigger,
              name: 'TechnicalUserName',
              rules: {
                required: true,
              },
              placeholder: t(
                'content.addUser.technicalUser.addOverlay.username'
              ),
              label: t('content.addUser.technicalUser.addOverlay.username'),
              helperText: t(
                'content.addUser.technicalUser.addOverlay.error.description'
              ),
            }}
          />
        </div>
        <div className="form-input">
          <TechnicalUserAddFormTextfield
            {...{
              control,
              errors,
              trigger,
              name: 'TechnicalUserDescription',
              rules: {
                required: true,
              },
              placeholder: t(
                'content.addUser.technicalUser.addOverlay.description'
              ),
              label: t('content.addUser.technicalUser.addOverlay.description'),
              helperText: t(
                'content.addUser.technicalUser.addOverlay.error.description'
              ),
              limit: 120,
            }}
          />
        </div>
        <div className="form-input">
          <TechnicalUserAddFormSelect
            {...{
              control,
              errors,
              trigger,
              name: 'TechnicalUserService',
              rules: {
                required: true,
                validate: (value: string) => value !== 'none',
              },
            }}
          />
        </div>
      </form>
    </Box>
  )
}
