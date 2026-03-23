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
  PageLoadingTable,
  type PaginFetchArgs,
} from '@arena2036/portal-shared-components-construct-x'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { setSearchInput } from 'features/appManagement/actions'
import { updateApplicationRequestSelector } from 'features/control/updates'
import {
  AppFilterType,
  type ApplicationRequest,
} from 'features/admin/applicationRequestApiSlice'
import { RegistrationRequestsTableColumns } from '../RegistrationTableColumns'
import { type GridEventListener } from '@mui/x-data-grid'
import './style.scss'
import { refetch } from 'features/admin/registration/slice'
import { isCompanyName } from 'types/Patterns'

interface FetchHookArgsType {
  statusFilter: string
  expr: string
}

export const RequestList = ({
  fetchHook,
  onTableCellClick,
  loaded,
  showConfirmOverlay,
  onConfirmationCancel,
}: {
  fetchHook: (paginArgs: PaginFetchArgs) => void
  onTableCellClick: GridEventListener<'cellClick'>
  loaded: number
  showConfirmOverlay?: (applicationId: string) => void
  onConfirmationCancel?: (applicationId: string, name: string) => void
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const refetchApps = useSelector(refetch)
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(updateApplicationRequestSelector)
  const [group, setGroup] = useState<string>(AppFilterType.INREVIEW)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>(
    AppFilterType.INREVIEW
  )
  const [fetchHookArgs, setFetchHookArgs] = useState<FetchHookArgsType>()
  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setFilterStatus(viewValue)
    setGroup(viewValue)
    setRefresh(Date.now())
  }

  useEffect(() => {
    setFetchHookArgs({
      statusFilter: filterStatus,
      expr: onValidate(searchExpr) ? searchExpr : '',
    })
  }, [filterStatus, searchExpr])

  useEffect(() => {
    if (refetchApps) setRefresh(Date.now())
  }, [refetchApps])

  const filterView = [
    {
      buttonText: t('content.admin.registration-requests.filter.all'),
      buttonValue: AppFilterType.ALL,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.admin.registration-requests.filter.review'),
      buttonValue: AppFilterType.INREVIEW,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.admin.registration-requests.filter.closed'),
      buttonValue: AppFilterType.CLOSED,
      onButtonClick: setView,
    },
  ]

  const columns = RegistrationRequestsTableColumns(
    t,
    showConfirmOverlay,
    onConfirmationCancel
  )

  useEffect(() => {
    if (loaded !== 0) setRefresh(Date.now())
  }, [loaded])

  const onValidate = (expr: string) => {
    const validateExpr = isCompanyName(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  return (
    <section id="registration-section-id">
      <PageLoadingTable<ApplicationRequest, FetchHookArgsType>
        sx={{
          '.MuiDataGrid-cell': {
            alignContent: 'center !important',
          },
        }}
        autoFocus={false}
        searchExpr={searchExpr}
        rowHeight={90}
        alignCell="start"
        onCellClick={onTableCellClick}
        toolbarVariant={'searchAndFilter'}
        hasBorder={false}
        columnHeadersBackgroundColor={'transparent'}
        searchPlaceholder={t('global.table.searchName')}
        searchInputData={searchInputData}
        onSearch={(expr: string) => {
          if (expr !== '' && !onValidate(expr)) return
          setRefresh(Date.now())
          setSearchExpr(expr)
        }}
        searchDebounce={1000}
        title={t('content.admin.registration-requests.tabletitle')}
        loadLabel={t('global.actions.more')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.applicationId}
        columns={columns}
        descriptionText={`${t(
          'content.admin.registration-requests.introText1'
        )}${t('content.admin.registration-requests.introText2')}`}
        defaultFilter={group}
        filterViews={filterView}
      />
    </section>
  )
}
