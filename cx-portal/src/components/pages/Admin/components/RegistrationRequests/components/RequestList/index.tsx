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

import { PageLoadingTable, PaginFetchArgs } from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { setSearchInput } from 'features/appManagement/actions'
import { updateApplicationRequestSelector } from 'features/control/updatesSlice'
import { ApplicationRequest } from 'features/admin/applicationRequestApiSlice'
import { RegistrationRequestsTableColumns } from '../../registrationTableColumns'
import { GridCellParams } from '@mui/x-data-grid'

export const RequestList = ({
  fetchHook,
  fetchHookArgs,
  onSearch,
  onApproveClick,
  onDeclineClick,
  isLoading,
  onTableCellClick,
}: {
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
  onSearch?: (search: string) => void
  onApproveClick: (id: string) => void
  onDeclineClick: (id: string) => void
  isLoading: boolean
  onTableCellClick: (params: GridCellParams) => void
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updateApplicationRequestSelector)

  const columns = RegistrationRequestsTableColumns(
    useTranslation,
    onApproveClick,
    onDeclineClick,
    isLoading
  )

  const onValidate = (expr: string) => {
    const validateExpr = /^[ A-Za-z]*$/.test(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  return (
    <section id="identity-management-id">
      <PageLoadingTable<ApplicationRequest>
        rowHeight={80}
        onCellClick={onTableCellClick}
        toolbarVariant="premium"
        searchPlaceholder={t('global.table.searchName')}
        searchInputData={searchInputData}
        onSearch={(expr: string) => {
          if (!onSearch || !onValidate(expr)) return
          setRefresh(Date.now())
          onSearch(expr)
        }}
        searchDebounce={1000}
        title={t('content.admin.registration-requests.tabletitle')}
        loadLabel={t('global.actions.more')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.applicationId}
        columns={columns}
      />
    </section>
  )
}
