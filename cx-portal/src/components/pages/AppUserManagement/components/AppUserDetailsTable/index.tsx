/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { TenantUser } from 'features/admin/userApiSlice'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import { useFetchAppUsersQuery } from 'features/admin/appuserApiSlice'
import { useParams } from 'react-router-dom'
import { UserList } from 'components/shared/frame/UserList'

export const AppUserDetailsTable = () => {
  const dispatch = useDispatch()
  const { appId } = useParams()
  return (
    <UserList
      fetchHook={useFetchAppUsersQuery}
      fetchHookArgs={{ appId }}
      onDetailsClick={(row: TenantUser) =>
        dispatch(show(OVERLAYS.EDIT_APP_USER_ROLES, row.companyUserId))
      }
    />
  )
}
