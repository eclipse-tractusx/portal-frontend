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
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  type ServiceAccountListEntry,
  ServiceAccountStatusFilter,
  useFetchServiceAccountListQuery,
} from 'features/admin/serviceApiSlice'
import { useSelector } from 'react-redux'
import { PAGES } from 'types/Constants'
import { updateTechuserSelector } from 'features/control/updates'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Patterns from 'types/Patterns'

interface FetchHookArgsType {
  statusFilter: string
  expr: string
}

export const TechnicalUserTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const update = useSelector(updateTechuserSelector)
  const [fetchHookArgs, setFetchHookArgs] = useState<FetchHookArgsType>()
  const [expr, setExpr] = useState<string>('')
  const [refresh, setRefresh] = useState<number>(0)
  const [group, setGroup] = useState<string>(ServiceAccountStatusFilter.ALL)
  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  useEffect(() => {
    setRefresh(Date.now())
  }, [update])

  useEffect(() => {
    setFetchHookArgs({
      statusFilter: group,
      expr,
    })
  }, [group, expr])

  const filterButtons = [
    {
      buttonText: t('content.usermanagement.technicalUser.tabs.all'),
      buttonValue: ServiceAccountStatusFilter.ALL,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.usermanagement.technicalUser.tabs.managed'),
      buttonValue: ServiceAccountStatusFilter.MANAGED,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.usermanagement.technicalUser.tabs.owned'),
      buttonValue: ServiceAccountStatusFilter.OWNED,
      onButtonClick: setView,
    },
  ]

  return (
    <div style={{ paddingTop: '30px' }}>
      <PageLoadingTable<ServiceAccountListEntry, FetchHookArgsType>
        searchExpr={expr}
        hasBorder={false}
        rowHeight={80}
        defaultFilter={group}
        columnHeadersBackgroundColor={'transparent'}
        toolbarVariant={'searchAndFilter'}
        title={t('content.usermanagement.technicalUser.tableHeader')}
        loadLabel={t('global.actions.more')}
        searchPlaceholder={t('content.usermanagement.technicalUser.searchText')}
        fetchHook={useFetchServiceAccountListQuery}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.serviceAccountId}
        filterViews={filterButtons}
        fetchHookArgs={fetchHookArgs}
        onSearch={(expr: string) => {
          if (!Patterns.techuser.clientId.test(expr)) return
          setExpr(expr)
          setRefresh(Date.now())
        }}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.userName'),
            flex: 2,
          },
          {
            field: 'clientId',
            headerName: t('global.field.clientId'),
            flex: 1,
          },
          {
            field: 'serviceAccountType',
            headerName: t('global.field.type'),
            flex: 1,
          },
          {
            field: 'offer',
            headerName: t('global.field.offerLink'),
            flex: 1.5,
            valueGetter: ({ row }: { row: ServiceAccountListEntry }) =>
              row.offer ? row.offer?.name : '',
          },
          {
            field: 'isOwner',
            headerName: t('global.field.owner'),
            flex: 1,
            valueGetter: ({ row }: { row: ServiceAccountListEntry }) =>
              row.isOwner ? 'Yes' : 'No',
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 1,
            renderCell: ({ row }: { row: ServiceAccountListEntry }) => (
              <>
                <IconButton
                  sx={{ marginRight: '8px' }}
                  color="secondary"
                  onClick={() =>
                    //dispatch(show(OVERLAYS.TECHUSER, row.serviceAccountId))
                    {
                      navigate(
                        `/${PAGES.TECHUSER_DETAILS}/${row.serviceAccountId}`
                      )
                    }
                  }
                >
                  <ArrowForwardIcon />
                </IconButton>
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
