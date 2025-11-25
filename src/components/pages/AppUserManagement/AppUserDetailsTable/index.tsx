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

import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { UserList } from 'components/shared/frame/UserList'
import { show } from 'features/control/overlay'
import { OVERLAYS, ROLES } from 'types/Constants'
import {
  type AppRole,
  useFetchAppUsersSearchQuery,
} from 'features/admin/appuserApiSlice'
import type { TenantUser } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import { userHasPortalRole } from 'services/AccessService'

export const AppUserDetailsTable = ({
  roles,
  userRoleResponse,
  subscriptionId,
}: {
  roles: AppRole[] | undefined
  userRoleResponse: string
  subscriptionId: string
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const [expr, setExpr] = useState<string>('')

  return (
    <UserList
      sectionTitle={'content.usermanagement.appUserDetails.subheadline'}
      addButtonLabel={'content.usermanagement.appUserDetails.table.add'}
      addButtonClick={() =>
        dispatch(show(OVERLAYS.ADD_APP_USER_ROLES, appId, subscriptionId))
      }
      addButtonDisabled={
        !roles ||
        roles.length === 0 ||
        !userHasPortalRole(ROLES.MODIFY_USER_ACCOUNT)
      }
      addButtonTooltip={
        roles && roles?.length <= 0
          ? t('content.usermanagement.appUserDetails.table.buttonTooltip')
          : ''
      }
      tableLabel={'content.usermanagement.appUserDetails.table.title'}
      fetchHook={useFetchAppUsersSearchQuery}
      fetchHookArgs={{ appId, expr, userRoleResponse, role: true }}
      onSearch={setExpr}
      onDetailsClick={
        userHasPortalRole(ROLES.MODIFY_USER_ACCOUNT)
          ? (row: TenantUser) =>
              dispatch(
                show(
                  OVERLAYS.EDIT_APP_USER_ROLES,
                  row.companyUserId,
                  subscriptionId
                )
              )
          : undefined
      }
    />
  )
}
