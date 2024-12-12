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
  Typography,
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import {
  type ServiceAccountRole,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './style.scss'

interface AddTechUserFormProps {
  handleClose: () => void
  handleConfirm: (roles: string[]) => void
  userProfiles: {
    roleId: string
    roleName: string
  }[]
}

enum RoleType {
  Internal = 'Internal',
  External = 'External',
  NONE = 'NONE',
}

export const AddTechUserForm = ({
  handleClose,
  handleConfirm,
  userProfiles,
}: AddTechUserFormProps) => {
  const { t } = useTranslation()
  const roles = useFetchServiceAccountRolesQuery().data
  const internalRoles = roles?.filter(
    (role) => role.roleType === RoleType.Internal
  )
  const externalRoles = roles?.filter(
    (role) => role.roleType === RoleType.External
  )
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedRoleType, setSelectedRoleType] = useState<string>('')

  useEffect(() => {
    if (userProfiles.length > 0) {
      setSelectedRoles(() => {
        const roles = []
        for (const obj of userProfiles) {
          roles.push(obj.roleId)
        }
        return roles
      })
    } else {
      setSelectedRoles([])
    }
  }, [userProfiles])

  const selectCheckboxRoles = (role: string, select: boolean) => {
    if (selectedRoles && selectedRoles[0] === externalRoles?.[0].roleId) {
      setSelectedRoles([...[], role])
    } else {
      const isSelected = selectedRoles?.includes(role)
      if (!isSelected && select) {
        setSelectedRoles([...selectedRoles, role])
      } else if (isSelected && !select) {
        const oldRoles = [...selectedRoles]
        oldRoles.splice(oldRoles.indexOf(role), 1)
        setSelectedRoles([...oldRoles])
      }
    }
  }

  const selectRoles = (role: string, select: boolean, type: string) => {
    if (type === 'checkbox') {
      selectCheckboxRoles(role, select)
    } else if (type === 'radio') {
      setSelectedRoles([...[], role])
    }
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
                'content.addUser.technicalUser.addOverlay.internalRoles'
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
              {t('content.addUser.technicalUser.addOverlay.internalRoles')}
            </Typography>
            {selectedRoleType && selectedRoleType !== RoleType.NONE && (
              <Box
                sx={{
                  marginLeft: '30px',
                }}
              >
                {internalRoles?.map((role: ServiceAccountRole) => (
                  <Box key={role.roleId}>
                    <Box className="roles">
                      <Checkbox
                        key={role.roleId}
                        label={role.roleName}
                        checked={selectedRoles.indexOf(role.roleId) !== -1}
                        onChange={(e) => {
                          selectRoles(role.roleId, e.target.checked, 'checkbox')
                        }}
                        size="medium"
                        value={selectedRoles}
                        disabled={selectedRoleType === RoleType.External}
                      />
                    </Box>
                    <Typography
                      variant="body3"
                      sx={{
                        marginLeft: '30px',
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
                'content.addUser.technicalUser.addOverlay.externalRoles'
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
              {t('content.addUser.technicalUser.addOverlay.externalRoles')}
            </Typography>
            {selectedRoleType && selectedRoleType !== RoleType.NONE && (
              <Box
                sx={{
                  marginLeft: '30px',
                }}
              >
                {externalRoles?.map((role: ServiceAccountRole) => (
                  <Box key={role.roleId}>
                    <Box className="roles">
                      <Radio
                        label={role.roleName}
                        key={role.roleId}
                        checked={
                          selectedRoles &&
                          selectedRoles[0] === externalRoles?.[0].roleId
                        }
                        onChange={(e) => {
                          selectRoles(role.roleId, e.target.checked, 'radio')
                        }}
                        name="radio-buttons"
                        value={selectedRoles}
                        size="small"
                        disabled={selectedRoleType === RoleType.Internal}
                      />
                    </Box>
                    <Typography
                      variant="body3"
                      sx={{
                        marginLeft: '30px',
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
            disabled={!selectedRoleType}
            variant="contained"
            onClick={() => {
              handleConfirm(
                selectedRoleType === RoleType.NONE
                  ? [RoleType.NONE]
                  : selectedRoles
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
