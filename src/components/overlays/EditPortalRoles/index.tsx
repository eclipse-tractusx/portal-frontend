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
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogHeader,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import {
  type AppRole,
  type PortalRoleRequest,
  setUserRoleResp,
  SuccessErrorType,
  useFetchCoreoffersRolesQuery,
  useUpdatePortalRolesMutation,
} from 'features/admin/appuserApiSlice'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { closeOverlay, show } from 'features/control/overlay'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import './style.scss'
import UserService from 'services/UserService'

export default function EditPortalRoles({ id }: { id: string }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const appRoles = useFetchCoreoffersRolesQuery().data
  const { data, refetch } = useFetchUserDetailsQuery(id)
  const assignedRoles = useMemo(
    () =>
      data?.assignedRoles.filter(
        (item) => item.appId === '9b957704-3505-4445-822c-d7ef80f27fcd' //added static for testing
      )[0]?.roles ?? [],
    [data]
  )

  const [allRoles, setAllRoles] = useState<AppRole[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [offerId, setOfferId] = useState<string>('')
  const [allAdminRoles, setAllAdminRoles] = useState<AppRole[]>([])

  const [updatePortalRoles] = useUpdatePortalRolesMutation()

  useEffect(() => {
    if (appRoles) {
      setAllRoles(appRoles[0].roles)
      setOfferId(appRoles[0].offerId)
    }
  }, [appRoles])

  useEffect(() => {
    if (allRoles) {
      const adminRoles = allRoles.filter((item) => item.role.includes('Admin'))
      setAllAdminRoles(adminRoles)
    }
  }, [allRoles])

  useEffect(() => {
    setSelectedRoles(assignedRoles ?? [])
  }, [assignedRoles])

  useEffect(() => {
    dispatch(setUserRoleResp(''))
  }, [dispatch])

  const handleSelectRole = (role: string, select: boolean) => {
    const isSelected = selectedRoles.includes(role)
    if (!isSelected && select) {
      setSelectedRoles([...selectedRoles, role])
    } else if (isSelected && !select) {
      const oldRoles = [...selectedRoles]
      oldRoles.splice(oldRoles.indexOf(role), 1)
      setSelectedRoles([...oldRoles])
    }
  }

  const handleSaveRoles = async () => {
    if (!id || !offerId) return
    const data: PortalRoleRequest = {
      companyUserId: id,
      offerId,
      roles: selectedRoles,
    }
    try {
      await updatePortalRoles(data).unwrap()
      refetch()
      dispatch(setUserRoleResp(SuccessErrorType.SUCCESS))
      dispatch(closeOverlay())
    } catch (err) {
      dispatch(setUserRoleResp(SuccessErrorType.ERROR))
      dispatch(closeOverlay())
    }
  }

  const checkConfirmButton = () =>
    selectedRoles.length === 0 ||
    (assignedRoles &&
      selectedRoles &&
      assignedRoles.length === selectedRoles.length &&
      assignedRoles.every((value) => selectedRoles.includes(value)))

  const disabledCheckbox = (currentRole: AppRole) =>
    UserService.getUsername() === id
      ? allAdminRoles.includes(currentRole)
      : false

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
                    disabled={disabledCheckbox(role)}
                    label={role.role}
                    checked={selectedRoles.indexOf(role.role) !== -1}
                    onChange={(e) => {
                      handleSelectRole(role.role, e.target.checked)
                    }}
                  />
                </li>
              ))}
          </ul>
        </div>
        {UserService.getUsername() === id && (
          <Typography variant="body3" sx={{ mt: 3 }}>
            {t('shared.userRoles.errorMsg')}
          </Typography>
        )}
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
          onClick={handleSaveRoles}
          disabled={checkConfirmButton()}
        >
          {t('global.actions.confirm')}
        </Button>
      </DialogActions>
    </>
  )
}
