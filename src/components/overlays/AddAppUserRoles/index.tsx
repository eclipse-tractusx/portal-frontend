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

import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
  Stepper,
  Typography,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AppRoles } from './AppRoles'
import UserListContent from './UserListContent'
import { useDispatch, useSelector } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import './style.scss'
import {
  rolesToAddSelector,
  selectedUserSelector,
  setRolesToAdd,
  setSelectedUserToAdd,
} from 'features/admin/userDeprecated/slice'
import {
  setUserRoleResp,
  useUpdateUserRolesMutation,
  type UserRoleRequest,
  SuccessErrorType,
} from 'features/admin/appuserApiSlice'
import { Box } from '@mui/material'
import { useState } from 'react'

export default function AddAppUserRoles({
  subscriptionId,
}: {
  subscriptionId: string
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()

  const roles = useSelector(rolesToAddSelector)
  const users = useSelector(selectedUserSelector)
  const [activeStep, setActiveStep] = useState(1)
  const [updateUserRoles] = useUpdateUserRolesMutation()

  const handleConfirm = () => {
    if (!appId || !users || roles.length <= 0) return

    users.map(async (user) => {
      const data: UserRoleRequest = {
        appId,
        companyUserId: user,
        subscriptionId,
        body: roles,
      }
      dispatch(setRolesToAdd([]))
      try {
        await updateUserRoles(data).unwrap()
        dispatch(setUserRoleResp(SuccessErrorType.SUCCESS))
        clearUsersAndRoles()
      } catch (err) {
        console.error(err, 'ERROR WHILE FETCHING DOCUMENT')
        dispatch(setUserRoleResp(SuccessErrorType.ERROR))
      }
      dispatch(closeOverlay())
    })
  }

  const handleCancel = () => {
    dispatch(show(OVERLAYS.NONE, ''))
    clearUsersAndRoles()
  }

  const clearUsersAndRoles = () => {
    dispatch(setRolesToAdd([]))
    dispatch(setSelectedUserToAdd([]))
  }

  const AddStepsList = [
    {
      headline: 'Search & Select Users',
      step: 1,
      color: '#0F71CB',
    },
    {
      headline: 'Add Roles',
      step: 2,
    },
  ]

  return (
    <>
      <DialogHeader
        title={t('content.addUserRight.headline')}
        intro={''}
        closeWithIcon={true}
        onCloseWithIcon={handleCancel}
      />

      <DialogContent className="add-user-overlay-content">
        <div style={{ width: '40%', margin: '0 auto 40px' }}>
          <Stepper list={AddStepsList} showSteps={2} activeStep={activeStep} />
        </div>
        <Box
          sx={{
            margin: '50px 110px',
            display: activeStep === 1 ? 'block' : 'none',
          }}
        >
          <Typography variant="label3">
            {t('content.addUserRight.selectUsersDescription')}
          </Typography>
          <Box sx={{ mt: '46px' }}>
            <UserListContent />
          </Box>
        </Box>
        <Box
          sx={{
            margin: '50px 110px',
            display: activeStep === 2 ? 'block' : 'none',
          }}
        >
          <Typography variant="label3">
            {t('content.addUserRight.addRolesDescription')}
          </Typography>
          <Box sx={{ mt: '46px' }}>
            <Typography variant="label1">
              {t('content.addUserRight.selectRoles')}
            </Typography>
          </Box>
          <Box sx={{ mb: '30px' }}>
            <Typography variant="body2">
              <a href="">{`> ${t('content.addUserRight.roleDescriptions')}`}</a>
            </Typography>
          </Box>
          <AppRoles />
        </Box>
      </DialogContent>

      <DialogActions>
        {activeStep === 1 ? (
          <Button
            variant="contained"
            onClick={() => {
              setActiveStep(2)
            }}
            disabled={users.length <= 0}
          >
            {t('content.addUserRight.confirmSelectedUsers')}
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => {
                setActiveStep(1)
              }}
            >
              {t('global.actions.back')}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleConfirm()
              }}
              disabled={!users || roles.length <= 0}
            >
              {t('content.addUserRight.confirmSelectedRoles')}
            </Button>
          </>
        )}
      </DialogActions>
    </>
  )
}
