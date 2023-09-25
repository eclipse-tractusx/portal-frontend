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
  TenantUser,
  useFetchUsersSearchQuery,
} from 'features/admin/userApiSlice'
import { useNavigate } from 'react-router-dom'
import { UserList } from 'components/shared/frame/UserList'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import { OVERLAYS, ROLES } from 'types/Constants'
import { useState } from 'react'
import UserService from 'services/UserService'

export const ActiveUserTable = ({
  addUserResponse,
}: {
  addUserResponse: boolean
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [expr, setExpr] = useState<string>('')

  return (
    <UserList
      sectionTitle={'content.usermanagement.table.headline'}
      addButtonLabel={
        UserService.hasRole(ROLES.USERMANAGEMENT_ADD)
          ? 'content.usermanagement.table.add'
          : ''
      }
      addButtonClick={() => dispatch(show(OVERLAYS.ADD_USER))}
      addMultipleButtonLabel={
        UserService.hasRole(ROLES.USERMANAGEMENT_ADD)
          ? 'content.usermanagement.table.addMultiple'
          : ''
      }
      onMultipleButtonClick={() => dispatch(show(OVERLAYS.ADD_MULTIPLE_USER))}
      tableLabel={'content.usermanagement.table.title'}
      fetchHook={useFetchUsersSearchQuery}
      fetchHookArgs={{ expr, addUserResponse }}
      searchExpr={expr}
      onSearch={setExpr}
      onDetailsClick={(row: TenantUser) => {
        navigate(`/userdetails/${row.companyUserId}`)
      }}
      isDetail={true}
    />
  )
}
