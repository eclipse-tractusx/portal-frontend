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

import {
  DialogActions,
  DialogContent,
  DialogHeader,
  Button,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AppRoles } from './AppRoles'
import UserListContent from './UserListContent'
import { useDispatch, useSelector } from 'react-redux'
import { closeOverlay, show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import './AddAppUserRoles.scss'
import {
  rolesToAddSelector,
  selectedUserSelector,
} from 'features/admin/userDeprecated/slice'
import {
  setUserRoleResp,
  useUpdateUserRolesMutation,
  type UserRoleRequest,
  SuccessErrorType,
} from 'features/admin/appuserApiSlice'
import { setRolesToAdd } from 'features/admin/userDeprecated/actions'

export default function AddAppUserRoles() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()

  const roles = useSelector(rolesToAddSelector)
  const users = useSelector(selectedUserSelector)

  const [updateUserRoles] = useUpdateUserRolesMutation()

  const handleConfirm = async () => {
    if (!appId || !users || roles.length <= 0) return

    users.map(async (user) => {
      const data: UserRoleRequest = {
        appId: appId,
        companyUserId: user,
        body: roles,
      }
      dispatch(setRolesToAdd([]))
      try {
        await updateUserRoles(data).unwrap()
        dispatch(setUserRoleResp(SuccessErrorType.SUCCESS))
      } catch (err) {
        dispatch(setUserRoleResp(SuccessErrorType.ERROR))
      }
      dispatch(closeOverlay())
    })
  }

  const handleCancel = () => {
    dispatch(show(OVERLAYS.NONE, ''))
    dispatch(setRolesToAdd([]))
  }

  return (
    <>
      <DialogHeader
        title={t('content.addUserRight.headline')}
        intro={t('content.addUserRight.subheadline')}
        closeWithIcon={true}
        onCloseWithIcon={handleCancel}
      />

      <DialogContent className="add-user-overlay-content">
        <div className="add-user-overlay-content-roles">
          <AppRoles />
        </div>

        <div className="add-user-overlay-content-content">
          <UserListContent />
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => dispatch(show(OVERLAYS.NONE))}
        >
          {t('global.actions.cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleConfirm()}
          disabled={!users || roles.length <= 0}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
