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
} from 'cx-portal-shared-components'
import {
  AppRole,
  PortalRoleRequest,
  setUserRoleResp,
  useFetchCoreoffersRolesQuery,
  useUpdatePortalRolesMutation,
} from 'features/admin/appuserApiSlice'
import { useFetchUsersRolesQuery } from 'features/admin/userApiSlice'
import { closeOverlay, show } from 'features/control/overlay/actions'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import './style.scss'

export default function EditPortalRoles({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const appRoles = useFetchCoreoffersRolesQuery().data
  const { data, refetch } = useFetchUsersRolesQuery(id)
  const assignedRoles = data?.content[0].roles ?? []

  const [allRoles, setAllRoles] = useState<AppRole[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [offerId, setOfferId] = useState<string>('')

  const [updatePortalRoles] = useUpdatePortalRolesMutation()

  useEffect(() => {
    const rolesArr: AppRole[] = []
    appRoles && appRoles.map((a) => rolesArr.push(...a.roles))
    setAllRoles(rolesArr)
    appRoles && setOfferId(appRoles[0].offerId)
  }, [appRoles])

  useEffect(() => {
    setSelectedRoles(assignedRoles ?? [])
  }, [assignedRoles])

  useEffect(() => {
    dispatch(setUserRoleResp(''))
  }, [dispatch])

  const selectRole = (role: string, select: boolean) => {
    const isSelected = selectedRoles.includes(role)
    if (!isSelected && select) {
      setSelectedRoles([...selectedRoles, role])
    } else if (isSelected && !select) {
      const oldRoles = [...selectedRoles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      setSelectedRoles([...oldRoles])
    }
  }

  const saveRoles = async () => {
    if (!id || !offerId) return
    const data: PortalRoleRequest = {
      companyUserId: id,
      offerId: offerId,
      roles: selectedRoles,
    }
    try {
      await updatePortalRoles(data).unwrap()
      refetch()
      dispatch(setUserRoleResp('success'))
      dispatch(closeOverlay())
    } catch (err) {
      dispatch(setUserRoleResp('error'))
      dispatch(closeOverlay())
    }
  }

  const checkConfirmBtn = () => {
    return (
      assignedRoles &&
      selectedRoles &&
      assignedRoles.length === selectedRoles.length &&
      assignedRoles.every((value) => selectedRoles.includes(value))
    )
  }

  return (
    <>
      <div className="roles-heading">
        <DialogHeader
          {...{
            title: t('content.account.editRoles.title'),
            intro: t('content.account.editRoles.subtitle'),
            closeWithIcon: true,
            onCloseWithIcon: () => dispatch(show(OVERLAYS.NONE, '')),
          }}
        />
      </div>
      <DialogContent>
        <div className="roles-list">
          <ul>
            {allRoles &&
              selectedRoles &&
              allRoles.map((role) => (
                <li key={role.roleId}>
                  <Checkbox
                    label={role.role}
                    checked={selectedRoles.indexOf(role.role) !== -1}
                    onChange={(e) => selectRole(role.role, e.target.checked)}
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
