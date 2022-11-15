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

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageLoadingTable, StatusTag } from 'cx-portal-shared-components'
import { GridRowId } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import uniqueId from 'lodash/uniqueId'
import {
  TenantUser,
  useFetchUsersSearchQuery,
} from 'features/admin/userApiSlice'
import { updatePartnerSelector } from 'features/control/updatesSlice'
import { setSelectedUserToAdd } from 'features/admin/userDeprecated/actions'
import Patterns from 'types/Patterns'

export default function UserListContent() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [expr, setExpr] = useState<string>('')
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updatePartnerSelector)

  const validateSearchText = (text: string): boolean =>
    Patterns.SEARCH.test(text.trim())

  return (
    <PageLoadingTable<TenantUser>
      toolbarVariant={'premium'}
      columnHeadersBackgroundColor={'transparent'}
      searchExpr={expr}
      searchPlaceholder={t('global.table.search')}
      searchInputData={searchInputData}
      onSearch={(expr: string) => {
        if (expr !== '' && !validateSearchText(expr)) return
        setRefresh(Date.now())
        setExpr(expr)
      }}
      searchDebounce={1000}
      onSelection={(id: GridRowId[]) => {
        dispatch(setSelectedUserToAdd(id))
      }}
      title={t('content.usermanagement.table.title')}
      loadLabel={t('global.actions.loadmore')}
      fetchHook={useFetchUsersSearchQuery}
      fetchHookArgs={{ expr }}
      fetchHookRefresh={refresh}
      getRowId={(row: { [key: string]: string }) => uniqueId(row.companyUserId)}
      columns={[
        {
          field: 'name',
          headerName: t('global.field.name'),
          flex: 4,
          valueGetter: ({ row }: { row: TenantUser }) =>
            `${row.firstName} ${row.lastName}`,
        },
        { field: 'email', headerName: t('global.field.email'), flex: 5 },
        {
          field: 'status',
          headerName: t('global.field.status'),
          flex: 2,
          renderCell: ({ value: status }) => {
            return (
              <StatusTag color="label" label={t(`global.field.${status}`)} />
            )
          },
        },
      ]}
      checkboxSelection
    />
  )
}
