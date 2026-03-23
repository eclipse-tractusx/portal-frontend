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
import { Trans, useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import { type Control, Controller, type FieldErrors } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import {
  Checkbox,
  Radio,
  Typography,
  Tooltips,
} from '@arena2036/portal-shared-components-construct-x'
import {
  type ServiceAccountRole,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'
import { groupBy } from 'lodash'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { ErrorType } from 'features/appManagement/types'

export type DefaultFormFieldValuesType = {
  TechnicalUserName: string
  TechnicalUserService: string[]
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
    TechnicalUserService: string[]
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
    TechnicalUserService: string[]
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

enum RoleType {
  Internal = 'Internal',
  External = 'External',
  InternalOnlyVisible = 'InternalOnlyVisible',
  NONE = 'NONE',
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
  const internalRoles = roles?.filter(
    (role) => role.roleType === RoleType.Internal
  )
  const grouped = groupBy(internalRoles, 'onlyAccessibleByProvider')
  const internalRolesVisible = grouped.true
  const internalRolesNotVisible = grouped.false
  const externalRoles = roles?.filter(
    (role) => role.roleType === RoleType.External
  )
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedRoleType, setSelectedRoleType] = useState<string>('')
  const boxStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const handleCheckBoxRoles = (role: string, select: boolean) => {
    const isSelected = selectedRoles?.includes(role)
    if (!isSelected && select) {
      setSelectedRoles([...selectedRoles, role])
    } else if (isSelected && !select) {
      const oldRoles = [...selectedRoles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      setSelectedRoles([...oldRoles])
    }
  }

  const selectCheckBoxRoles = (
    role: string,
    select: boolean,
    roleType?: string
  ) => {
    if (selectedRoles && selectedRoles[0] === externalRoles?.[0].roleId) {
      setSelectedRoles([...[], role])
    } else if (roleType === 'internalRolesVisible') {
      if (
        selectedRoles.every((id) =>
          internalRolesVisible.some((role) => role.roleId === id)
        )
      )
        handleCheckBoxRoles(role, select)
      else setSelectedRoles([...[], role])
    } else if (roleType === 'internalRolesNotVisible') {
      if (
        selectedRoles.every((id) =>
          internalRolesNotVisible.some((role) => role.roleId === id)
        )
      )
        handleCheckBoxRoles(role, select)
      else setSelectedRoles([...[], role])
    }
  }

  const selectRoles = (
    role: string,
    select: boolean,
    type: string,
    roleType?: string
  ) => {
    if (type === 'checkbox') {
      selectCheckBoxRoles(role, select, roleType)
    } else if (type === 'radio') {
      setSelectedRoles([...[], role])
    }
  }

  const selectCheckboxOnChange = (role: string, select: boolean) => {
    if (selectedRoles && selectedRoles[0] === externalRoles?.[0].roleId) {
      return [...[], role]
    } else {
      const isSelected = selectedRoles?.includes(role)
      if (!isSelected && select) {
        return [...selectedRoles, role]
      } else if (isSelected && !select) {
        const oldRoles = [...selectedRoles]
        oldRoles.splice(oldRoles.indexOf(role), 1)
        return [...oldRoles]
      }
    }
  }

  return (
    <>
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
            <Trans>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                {t('content.addUser.technicalUser.addOverlay.note')}
              </Typography>
            </Trans>
            <Box>
              <Radio
                label={t(
                  'content.addUser.technicalUser.addOverlay.externalUserRoles'
                )}
                checked={selectedRoleType === RoleType.External}
                onChange={() => {
                  setSelectedRoleType(RoleType.External)
                }}
                name="radio-button"
                value={selectedRoleType}
                size="medium"
              />
              <Typography variant="body3" sx={{ ml: '30px', mb: '10px' }}>
                {t(
                  'content.addUser.technicalUser.addOverlay.externalUserRolesDescription'
                )}
              </Typography>
              {selectedRoleType && selectedRoleType !== RoleType.NONE && (
                <Box
                  sx={{
                    ml: '30px',
                  }}
                >
                  {externalRoles?.map((role: ServiceAccountRole) => (
                    <Box key={role.roleId}>
                      <Box className="roles" sx={boxStyle}>
                        <Radio
                          label={role.roleName}
                          key={role.roleId}
                          checked={
                            selectedRoles &&
                            selectedRoles[0] === externalRoles?.[0].roleId
                          }
                          onChange={(e) => {
                            selectRoles(role.roleId, e.target.checked, 'radio')
                            trigger(name)
                            onChange([...[], role.roleId])
                          }}
                          name="radio-buttons"
                          value={selectedRoles}
                          size="small"
                          disabled={
                            selectedRoleType === RoleType.Internal ||
                            selectedRoleType === RoleType.InternalOnlyVisible
                          }
                        />
                      </Box>
                      <Typography
                        variant="body3"
                        sx={{
                          ml: '30px',
                          color:
                            selectedRoleType === RoleType.Internal ||
                            selectedRoleType === RoleType.InternalOnlyVisible
                              ? 'rgba(0, 0, 0, 0.38)'
                              : 'initial',
                        }}
                      >
                        {role.roleDescription}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              <Radio
                label={t(
                  'content.addUser.technicalUser.addOverlay.internalUserRoles'
                )}
                checked={selectedRoleType === RoleType.Internal}
                onChange={() => {
                  setSelectedRoleType(RoleType.Internal)
                }}
                name="radio-button"
                value={selectedRoleType}
                size="medium"
              />
              <Typography
                variant="body3"
                sx={{
                  ml: '30px',
                  mb: '10px',
                }}
              >
                {t(
                  'content.addUser.technicalUser.addOverlay.internalUserRolesDescription'
                )}
              </Typography>
              {selectedRoleType && selectedRoleType !== RoleType.NONE && (
                <Box
                  sx={{
                    ml: '30px',
                  }}
                >
                  {internalRolesNotVisible?.map((role: ServiceAccountRole) => (
                    <Box key={role.roleId}>
                      <Box className="roles" sx={boxStyle}>
                        <Checkbox
                          key={role.roleId}
                          label={role.roleName}
                          checked={selectedRoles.indexOf(role.roleId) !== -1}
                          onChange={(e) => {
                            selectRoles(
                              role.roleId,
                              e.target.checked,
                              'checkbox',
                              'internalRolesNotVisible'
                            )
                            trigger(name)
                            onChange(
                              selectCheckboxOnChange(
                                role.roleId,
                                e.target.checked
                              )
                            )
                          }}
                          size="medium"
                          value={selectedRoles}
                          disabled={
                            selectedRoleType === RoleType.External ||
                            selectedRoleType === RoleType.InternalOnlyVisible
                          }
                        />
                      </Box>
                      <Typography
                        variant="body3"
                        sx={{
                          ml: '30px',
                          color:
                            selectedRoleType === RoleType.External ||
                            selectedRoleType === RoleType.InternalOnlyVisible
                              ? 'rgba(0, 0, 0, 0.38)'
                              : 'initial',
                        }}
                      >
                        {role.roleDescription}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Radio
                  label={t(
                    'content.addUser.technicalUser.addOverlay.internalUserRolesOnlyVisible'
                  )}
                  checked={selectedRoleType === RoleType.InternalOnlyVisible}
                  onChange={() => {
                    setSelectedRoleType(RoleType.InternalOnlyVisible)
                  }}
                  name="radio-button"
                  value={selectedRoleType}
                  size="medium"
                />
                <Tooltips
                  tooltipPlacement="right-start"
                  tooltipText={t(
                    'content.addUser.technicalUser.addOverlay.userDetailsNotVisible'
                  )}
                  children={
                    <VisibilityOffIcon
                      sx={{
                        ml: '-5px !important',
                        fontSize: '22px',
                        cursor: 'pointer',
                        color: '#adadad',
                        ':hover': {
                          color: '#000',
                        },
                      }}
                    />
                  }
                />
              </Box>
              <Typography
                variant="body3"
                sx={{
                  ml: '30px',
                  mb: '10px',
                }}
              >
                {t(
                  'content.addUser.technicalUser.addOverlay.internalUserRolesDescriptionOnlyVisible'
                )}
              </Typography>
              {selectedRoleType && selectedRoleType !== RoleType.NONE && (
                <Box
                  sx={{
                    ml: '30px',
                  }}
                >
                  {internalRolesVisible?.map((role: ServiceAccountRole) => (
                    <Box key={role.roleId}>
                      <Box sx={boxStyle} className="roles">
                        <Checkbox
                          label={role.roleName}
                          key={role.roleId}
                          checked={selectedRoles.indexOf(role.roleId) !== -1}
                          size="medium"
                          value={selectedRoles}
                          disabled={
                            selectedRoleType === RoleType.External ||
                            selectedRoleType === RoleType.Internal
                          }
                          onChange={(e) => {
                            trigger(name)
                            onChange(
                              selectCheckboxOnChange(
                                role.roleId,
                                e.target.checked
                              )
                            )
                            selectRoles(
                              role.roleId,
                              e.target.checked,
                              'checkbox',
                              'internalRolesVisible'
                            )
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color:
                            selectedRoleType === RoleType.External ||
                            selectedRoleType === RoleType.Internal
                              ? 'rgba(0, 0, 0, 0.38)'
                              : 'initial',
                          ml: '30px',
                        }}
                        variant="body3"
                      >
                        {role.roleDescription}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        )}
        name={name}
        control={control}
        rules={rules}
      />
      {errors?.TechnicalUserService?.type === ErrorType.REQUIRED && (
        <Typography variant="body3" className="file-error-msg">
          {t('content.addUser.technicalUser.addOverlay.roleMandatory')}
        </Typography>
      )}
    </>
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
            <Typography variant="label3">{label}</Typography>
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
    TechnicalUserService: string[]
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
                'content.addUser.technicalUser.addOverlay.error.username'
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
              },
            }}
          />
        </div>
      </form>
    </Box>
  )
}
