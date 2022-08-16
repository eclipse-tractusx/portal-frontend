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

import { TenantUser, useFetchUsersQuery } from 'features/admin/userApiSlice'
import { useNavigate } from 'react-router-dom'
import { UserList } from 'components/shared/frame/UserList'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'

export const ActiveUserTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <UserList
      sectionTitle={'content.usermanagement.table.headline'}
      addButtonLabel={'content.usermanagement.table.add'}
      addButtonClick={() => dispatch(show(OVERLAYS.ADD_USER))}
      tableLabel={'content.usermanagement.table.title'}
      fetchHook={useFetchUsersQuery}
      onDetailsClick={(row: TenantUser) =>
        navigate(`/userdetails/${row.companyUserId}`)
      }
    />
  )
}
