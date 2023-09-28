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
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
} from '@catena-x/portal-shared-components'
import {
  setUserRoleResp,
  SuccessErrorType,
  useFetchAppRolesQuery,
  UserRoleRequest,
  useUpdateUserRolesMutation,
} from 'features/admin/appuserApiSlice'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { closeOverlay, show } from 'features/control/overlay'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { OVERLAYS } from 'types/Constants'
import './style.scss'

export default function EditAppUserRoles({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()

  const [roles, setRoles] = useState<string[]>([])
  const [updateUserRoles] = useUpdateUserRolesMutation()
  const appDetails = useFetchAppDetailsQuery(appId ?? '').data
  const appRoles = useFetchAppRolesQuery(appId ?? '').data
  const { data, refetch } = useFetchUserDetailsQuery(id)
  const assignedRoles =
    data &&
    data.assignedRoles.filter((assignedRole) => assignedRole.appId === appId)[0]
      ?.roles

  useEffect(() => {
    setRoles(assignedRoles ?? [])
  }, [assignedRoles])

  const selectRole = (role: string, select: boolean) => {
    const isSelected = roles.includes(role)
    if (!isSelected && select) {
      setRoles([...roles, role])
    } else if (isSelected && !select) {
      const oldRoles = [...roles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      setRoles([...oldRoles])
    }
  }

  const saveRoles = async () => {
    if (!appId) return
    const data: UserRoleRequest = {
      appId,
      companyUserId: id,
      body: roles,
    }
    try {
      await updateUserRoles(data).unwrap()
      refetch()
      dispatch(setUserRoleResp(SuccessErrorType.SUCCESS))
      dispatch(closeOverlay())
    } catch (err) {
      dispatch(setUserRoleResp(SuccessErrorType.ERROR))
      dispatch(closeOverlay())
    }
  }

  const checkConfirmBtn = () => {
    return (
      assignedRoles &&
      roles &&
      assignedRoles.length === roles.length &&
      assignedRoles.every((value) => roles.includes(value))
    )
  }

  return (
    <>
      <div className="roles-heading">
        <DialogHeader
          {...{
            title:
              t('content.usermanagement.appUserDetails.editRoles.title') +
              appDetails?.title,
            intro: t(
              'content.usermanagement.appUserDetails.editRoles.subtitle'
            ),
            closeWithIcon: true,
            onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
          }}
        />
      </div>
      <DialogContent>
        <div className="roles-list">
          <ul>
            {appRoles &&
              roles &&
              appRoles.map((role) => (
                <li key={role.roleId}>
                  <Checkbox
                    label={role.role}
                    checked={roles.indexOf(role.role) !== -1}
                    onChange={(e) => {
                      selectRole(role.role, e.target.checked)
                    }}
                  />
                </li>
              ))}
          </ul>
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
          onClick={saveRoles}
          disabled={checkConfirmBtn()}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
