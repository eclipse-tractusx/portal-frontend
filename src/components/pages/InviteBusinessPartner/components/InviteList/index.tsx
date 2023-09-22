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
  IconButton,
  PageLoadingTable,
  type PaginFetchArgs,
} from '@catena-x/portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { CompanyInvite } from 'features/admin/inviteApiSlice'
import { useTranslation } from 'react-i18next'
import './style.scss'
import { useState } from 'react'
import dayjs from 'dayjs'
import { setSearchInput } from 'features/appManagement/actions'
import { updateInviteSelector } from 'features/control/updates'

export const InviteList = ({
  fetchHook,
  fetchHookArgs,
  onSearch,
  searchExpr,
}: {
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  onSearch?: (search: string) => void
  searchExpr?: string
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updateInviteSelector)

  const validateSearchText = (expr: string) => {
    const validateExpr = /^[ A-Za-z0-9]*$/.test(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  return (
    <section id="identity-management-id">
      <PageLoadingTable<CompanyInvite>
        searchExpr={searchExpr}
        toolbarVariant="premium"
        searchPlaceholder={t('global.table.searchName')}
        searchInputData={searchInputData}
        onSearch={(expr: string) => {
          if (!onSearch || !validateSearchText(expr)) return
          setRefresh(Date.now())
          onSearch(expr)
        }}
        searchDebounce={1000}
        title={t('content.invite.tabletitle')}
        loadLabel={t('global.actions.loadmore')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.applicationId}
        columns={[
          {
            field: 'companyName',
            headerName: t('content.invite.columns.companyName'),
            flex: 1.5,
            sortable: false,
          },
          {
            field: 'firstAndLastName',
            headerName: t('content.invite.columns.firstAndLastName'),
            flex: 1.5,
            sortable: false,
            valueGetter: ({ row }: { row: CompanyInvite }) =>
              `${row.firstName || ''} ${row.lastName || ''}`,
          },
          {
            field: 'dateCreated',
            headerName: t('content.invite.columns.date'),
            flex: 1,
            valueGetter: ({ row }: { row: CompanyInvite }) =>
              dayjs(row.dateCreated).format('YYYY-MM-DD'),
            sortable: false,
          },
          {
            field: 'applicationStatus',
            headerName: t('content.invite.columns.status'),
            flex: 1,
            sortable: false,
          },
          {
            field: 'details',
            headerName: t('content.invite.columns.details'),
            flex: 0.7,
            sortable: false,
            renderCell: ({ row }: { row: CompanyInvite }) => (
              <IconButton
                disabled={true}
                color="secondary"
                onClick={() =>
                  console.log('on details click: Company Name', row.companyName)
                }
              >
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
      />
    </section>
  )
}
