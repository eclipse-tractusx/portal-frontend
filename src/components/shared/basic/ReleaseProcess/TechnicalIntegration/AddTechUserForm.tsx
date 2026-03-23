/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Radio,
  Tooltips,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'
import {
  type ServiceAccountRole,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { groupBy } from 'lodash'

interface AddTechUserFormProps {
  handleClose: () => void
  handleConfirm: (roles: string[]) => void
  userProfiles: {
    roleId: string
    roleName: string
    type: string
  }[]
  createNewTechUserProfile: boolean
}

enum RoleType {
  Internal = 'Internal',
  InternalOnlyVisible = 'InternalOnlyVisible',
  External = 'External',
  NONE = 'NONE',
}

export const AddTechUserForm = ({
  handleClose,
  handleConfirm,
  userProfiles,
  createNewTechUserProfile,
}: AddTechUserFormProps) => {
  const { t } = useTranslation()
  const roles = useFetchServiceAccountRolesQuery().data
  const internalUserRoles = roles?.filter(
    (role) => role.roleType === RoleType.Internal
  )
  const grouped = groupBy(internalUserRoles, 'onlyAccessibleByProvider')
  const internalUserRolesVisible = grouped.true
  const internalUserRolesNotVisible = grouped.false
  const externalUserRoles = roles?.filter(
    (role) => role.roleType === RoleType.External
  )
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([])
  const [selectedRoleType, setSelectedRoleType] = useState<string>('')
  const boxStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  useEffect(() => {
    if (userProfiles.length > 0 && !createNewTechUserProfile) {
      setSelectedUserRoles(() => {
        const roles = []
        for (const obj of userProfiles) {
          roles.push(obj.roleId)
        }
        return roles
      })
    } else {
      setSelectedUserRoles([])
    }
  }, [userProfiles])

  const handleCheckboxRoles = (role: string, select: boolean) => {
    const isRoleSelected = selectedUserRoles?.includes(role)
    if (!isRoleSelected && select) {
      setSelectedUserRoles([...selectedUserRoles, role])
    } else if (isRoleSelected && !select) {
      const oldUserRoles = [...selectedUserRoles]
      oldUserRoles.splice(oldUserRoles.indexOf(role), 1)
      setSelectedUserRoles([...oldUserRoles])
    }
  }

  const selectCheckboxRoles = (
    role: string,
    select: boolean,
    roleType?: string
  ) => {
    if (
      selectedUserRoles &&
      selectedUserRoles[0] === externalUserRoles?.[0].roleId
    ) {
      setSelectedUserRoles([...[], role])
    } else if (roleType === 'internalRolesVisible') {
      if (
        selectedUserRoles.every((id) =>
          internalUserRolesVisible.some((role) => role.roleId === id)
        )
      )
        handleCheckboxRoles(role, select)
      else setSelectedUserRoles([...[], role])
    } else if (roleType === 'internalRolesNotVisible') {
      if (
        selectedUserRoles.every((id) =>
          internalUserRolesNotVisible.some((role) => role.roleId === id)
        )
      )
        handleCheckboxRoles(role, select)
      else setSelectedUserRoles([...[], role])
    }
  }

  const selectRoles = (
    role: string,
    select: boolean,
    type: string,
    roleType?: string
  ) => {
    if (type === 'checkbox') {
      selectCheckboxRoles(role, select, roleType)
    } else if (type === 'radio') {
      setSelectedUserRoles([...[], role])
    }
  }

  const renderAccessibleByProvider = () => {
    return (
      <Tooltips
        tooltipPlacement="right-start"
        tooltipText={t(
          'content.apprelease.technicalIntegration.form.userDetailsNotVisible'
        )}
        children={
          <VisibilityOffIcon
            sx={{
              marginLeft: '-5px !important',
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
    )
  }

  return (
    <div>
      <Dialog
        open={true}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader
          title={t('content.apprelease.technicalIntegration.form.title')}
          intro={t('content.apprelease.technicalIntegration.form.intro')}
          closeWithIcon={true}
          onCloseWithIcon={() => {
            handleClose()
          }}
        />
        <DialogContent
          sx={{
            marginBottom: '25px',
            padding: '0px 80px 20px 80px',
          }}
        >
          <Box className={'radio-container'}>
            <Radio
              label={t(
                'content.apprelease.technicalIntegration.form.externalUserRoles'
              )}
              checked={selectedRoleType === RoleType.External}
              onChange={() => {
                setSelectedRoleType(RoleType.External)
              }}
              name="radio-button"
              value={selectedRoleType}
              size="medium"
            />
            <Typography
              variant="body3"
              sx={{
                marginLeft: '30px',
                marginBottom: '10px',
              }}
            >
              {t(
                'content.apprelease.technicalIntegration.form.externalUserRolesDescription'
              )}
            </Typography>
            {selectedRoleType && selectedRoleType !== RoleType.NONE && (
              <Box
                sx={{
                  marginLeft: '30px',
                }}
              >
                {externalUserRoles?.map((role: ServiceAccountRole) => (
                  <Box key={role.roleId}>
                    <Box className="roles" sx={boxStyle}>
                      <Radio
                        label={role.roleName}
                        key={role.roleId}
                        checked={
                          selectedUserRoles &&
                          selectedUserRoles[0] === externalUserRoles?.[0].roleId
                        }
                        onChange={(e) => {
                          selectRoles(role.roleId, e.target.checked, 'radio')
                        }}
                        name="radio-buttons"
                        value={selectedUserRoles}
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
                        marginLeft: '30px',
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
                'content.apprelease.technicalIntegration.form.internalUserRoles'
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
                marginLeft: '30px',
                marginBottom: '10px',
              }}
            >
              {t(
                'content.apprelease.technicalIntegration.form.internalUserRolesDescription'
              )}
            </Typography>
            {selectedRoleType && selectedRoleType !== RoleType.NONE && (
              <Box
                sx={{
                  marginLeft: '30px',
                }}
              >
                {internalUserRolesNotVisible?.map(
                  (role: ServiceAccountRole) => (
                    <Box key={role.roleId}>
                      <Box className="roles" sx={boxStyle}>
                        <Checkbox
                          key={role.roleId}
                          label={role.roleName}
                          checked={
                            selectedUserRoles.indexOf(role.roleId) !== -1
                          }
                          onChange={(e) => {
                            selectRoles(
                              role.roleId,
                              e.target.checked,
                              'checkbox',
                              'internalRolesNotVisible'
                            )
                          }}
                          size="medium"
                          value={selectedUserRoles}
                          disabled={
                            selectedRoleType === RoleType.External ||
                            selectedRoleType === RoleType.InternalOnlyVisible
                          }
                        />
                      </Box>
                      <Typography
                        variant="body3"
                        sx={{
                          marginLeft: '30px',
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
                  )
                )}
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
                  'content.apprelease.technicalIntegration.form.internalUserRolesOnlyVisible'
                )}
                checked={selectedRoleType === RoleType.InternalOnlyVisible}
                onChange={() => {
                  setSelectedRoleType(RoleType.InternalOnlyVisible)
                }}
                name="radio-button"
                value={selectedRoleType}
                size="medium"
              />
              {renderAccessibleByProvider()}
            </Box>
            <Typography
              variant="body3"
              sx={{
                marginLeft: '30px',
                marginBottom: '10px',
              }}
            >
              {t(
                'content.apprelease.technicalIntegration.form.internalUserRolesDescriptionOnlyVisible'
              )}
            </Typography>
            {selectedRoleType && selectedRoleType !== RoleType.NONE && (
              <Box
                sx={{
                  marginLeft: '30px',
                }}
              >
                {internalUserRolesVisible?.map((role: ServiceAccountRole) => (
                  <Box key={role.roleId}>
                    <Box className="roles" sx={boxStyle}>
                      <Checkbox
                        key={role.roleId}
                        label={role.roleName}
                        checked={selectedUserRoles.indexOf(role.roleId) !== -1}
                        onChange={(e) => {
                          selectRoles(
                            role.roleId,
                            e.target.checked,
                            'checkbox',
                            'internalRolesVisible'
                          )
                        }}
                        size="medium"
                        value={selectedUserRoles}
                        disabled={
                          selectedRoleType === RoleType.External ||
                          selectedRoleType === RoleType.Internal
                        }
                      />
                    </Box>
                    <Typography
                      variant="body3"
                      sx={{
                        marginLeft: '30px',
                        color:
                          selectedRoleType === RoleType.External ||
                          selectedRoleType === RoleType.Internal
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
              name="radio-buttons"
              size="medium"
              checked={selectedRoleType === RoleType.NONE}
              label={`${t(
                'content.apprelease.technicalIntegration.noneOption'
              )}`}
              onChange={() => {
                setSelectedRoleType(RoleType.NONE)
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose()
            }}
          >
            {t('global.actions.close')}
          </Button>
          <Button
            disabled={
              !selectedRoleType ||
              (selectedRoleType !== RoleType.NONE &&
                selectedUserRoles.length === 0)
            }
            variant="contained"
            onClick={() => {
              handleConfirm(
                selectedRoleType === RoleType.NONE
                  ? [RoleType.NONE]
                  : selectedUserRoles
              )
            }}
          >
            {t('global.actions.continue')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
