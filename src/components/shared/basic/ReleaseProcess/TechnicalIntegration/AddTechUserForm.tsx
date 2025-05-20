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
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import {
  type ServiceAccountRole,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'
import { useEffect, useMemo, useState } from 'react'
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
  const { data: serviceAccountRoles } = useFetchServiceAccountRolesQuery()

  const internalUserRoles = useMemo(() => {
    if (!serviceAccountRoles) return undefined
    return serviceAccountRoles.filter(
      (role) => role.roleType === RoleType.Internal
    )
  }, [serviceAccountRoles])

  const internalUserRolesVisible = useMemo(() => {
    if (!internalUserRoles) return undefined
    const grouped = groupBy(internalUserRoles, 'onlyAccessibleByProvider')
    return grouped.true
  }, [internalUserRoles])

  const internalUserRolesNotVisible = useMemo(() => {
    if (!internalUserRoles) return undefined
    const grouped = groupBy(internalUserRoles, 'onlyAccessibleByProvider')
    return grouped.false
  }, [internalUserRoles])

  const externalUserRoles = useMemo(() => {
    if (!serviceAccountRoles) return undefined
    return serviceAccountRoles.filter(
      (role) => role.roleType === RoleType.External
    )
  }, [serviceAccountRoles])

  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([])
  const [selectedRoleType, setSelectedRoleType] = useState<string>('')
  const boxStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  // Initialize state based on existing profiles or create new
  useEffect(() => {
    if (createNewTechUserProfile) {
      setSelectedUserRoles([])
      setSelectedRoleType('')
    } else {
      const initialRoleIds = userProfiles.map((profile) => profile.roleId)
      setSelectedUserRoles(initialRoleIds)

      if (userProfiles.length > 0 && userProfiles[0]?.type) {
        const firstProfileType = userProfiles[0].type
        const firstProfileRoleId = userProfiles[0].roleId

        const isInternalVisible =
          firstProfileType === RoleType.Internal &&
          internalUserRolesVisible?.some(
            (role) => role.roleId === firstProfileRoleId
          )

        setSelectedRoleType(
          isInternalVisible ? RoleType.InternalOnlyVisible : firstProfileType
        )
      } else {
        // Fallback if editing an existing profile that has no roles or type info
        setSelectedRoleType(RoleType.NONE)
      }
    }
  }, [userProfiles, internalUserRolesVisible, createNewTechUserProfile])

  const handleRadioChange = (newRoleType: string) => {
    if (selectedRoleType !== newRoleType) {
      setSelectedRoleType(newRoleType)
      setSelectedUserRoles([])
    }
  }

  const handleCheckboxChange = (roleId: string, checked: boolean) => {
    setSelectedUserRoles((prevSelectedUserRoles) => {
      if (checked) {
        // Add role if not already selected (ensuring uniqueness)
        return [...prevSelectedUserRoles, roleId].filter(
          (value, index, self) => self.indexOf(value) === index
        )
      } else {
        return prevSelectedUserRoles.filter((id) => id !== roleId)
      }
    })
  }

  const handleExternalRadioChange = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedUserRoles([roleId])
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
          onCloseWithIcon={handleClose}
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
                handleRadioChange(RoleType.External)
              }}
              name="role-type"
              value={RoleType.External}
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
            {selectedRoleType === RoleType.External && (
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
                        checked={selectedUserRoles.includes(role.roleId)}
                        onChange={(e) => {
                          handleExternalRadioChange(
                            role.roleId,
                            e.target.checked
                          )
                        }}
                        name="external-role"
                        value={role.roleId}
                        size="small"
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
                'content.apprelease.technicalIntegration.form.internalUserRoles'
              )}
              checked={selectedRoleType === RoleType.Internal}
              onChange={() => {
                handleRadioChange(RoleType.Internal)
              }}
              name="role-type"
              value={RoleType.Internal}
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
            {selectedRoleType === RoleType.Internal && (
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
                          label={role.roleName}
                          checked={selectedUserRoles.includes(role.roleId)}
                          onChange={(e) => {
                            handleCheckboxChange(role.roleId, e.target.checked)
                          }}
                          size="medium"
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
                  handleRadioChange(RoleType.InternalOnlyVisible)
                }}
                name="role-type"
                value={RoleType.InternalOnlyVisible}
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
            {selectedRoleType === RoleType.InternalOnlyVisible && (
              <Box
                sx={{
                  marginLeft: '30px',
                }}
              >
                {internalUserRolesVisible?.map((role: ServiceAccountRole) => (
                  <Box key={role.roleId}>
                    <Box className="roles" sx={boxStyle}>
                      <Checkbox
                        label={role.roleName}
                        checked={selectedUserRoles.includes(role.roleId)}
                        onChange={(e) => {
                          handleCheckboxChange(role.roleId, e.target.checked)
                        }}
                        size="medium"
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
              name="role-type"
              size="medium"
              checked={selectedRoleType === RoleType.NONE}
              label={t('content.apprelease.technicalIntegration.noneOption')}
              onChange={() => {
                handleRadioChange(RoleType.NONE)
              }}
              value={RoleType.NONE}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
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
