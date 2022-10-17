/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import { Controller } from 'react-hook-form'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import {
  ServiceAccountRole,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'

export type DefaultFormFieldValuesType = {
  TechnicalUserName: string
  TechnicalUserService: string
  TechnicalUserDescription: string
}

const TechnicalUserAddFormSelect = ({
  control,
  trigger,
  errors,
  name,
  rules,
}: any) => {
  const { t } = useTranslation()
  const roles = useFetchServiceAccountRolesQuery().data

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel error={!!errors[name]} sx={{ marginBottom: '7px' }}>
            {t('content.addUser.technicalUser.addOverlay.service')}
          </InputLabel>
          <Select
            error={!!errors[name]}
            onChange={(event) => {
              trigger(name)
              onChange(event)
            }}
            value={value}
            variant="filled"
            fullWidth
            sx={{
              color: value === 'none' ? 'gray' : '',
            }}
          >
            <MenuItem disabled value="none">
              {t('global.actions.pleaseSelect')}
            </MenuItem>
            {roles?.map((role: ServiceAccountRole) => (
              <MenuItem key={role.roleId} value={role.roleId}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
          {!!errors[name] && (
            <FormHelperText
              sx={{ marginBottom: '23px', color: 'danger.danger' }}
            >
              {t('content.addUser.technicalUser.addOverlay.error.select')}
            </FormHelperText>
          )}
        </>
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
}: any) => {
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <>
          <InputLabel error={!!errors[name]} sx={{ marginBottom: '7px' }}>
            {label}
          </InputLabel>
          <TextField
            error={!!errors[name]}
            fullWidth
            helperText={
              !!errors[name] ? helperText : `${value.length}/${limit}`
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
              sx: { marginLeft: !!errors[name] ? '' : 'auto' },
            }}
            InputProps={{
              endAdornment: !!errors[name] && (
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
}: any) => {
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
