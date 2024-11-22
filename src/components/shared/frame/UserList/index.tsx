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

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  StatusTag,
  type PaginFetchArgs,
} from '@catena-x/portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import type { TenantUser } from 'features/admin/userApiSlice'
import './style.scss'
import { setSearchInput } from 'features/appManagement/actions'
import { appManagementSelector } from 'features/appManagement/slice'
import { isSearchUserEmail } from 'types/Patterns'
import { TableVariants } from 'components/shared/cfx/PageLoadingTable/helpers'
import { PageLoadingTable } from 'components/shared/cfx/PageLoadingTable'
import { OverLappingStatusTag } from 'components/shared/cfx/OverLappingStatusTag'
import { getClientId } from 'services/EnvironmentService'

interface FetchHookArgsType {
  appId?: string
  expr: string
  userRoleResponse?: boolean | string
  role?: boolean
  addUserResponse?: boolean
}

export const UserList = ({
  sectionTitle,
  addButtonLabel,
  addButtonClick,
  addButtonDisabled,
  addButtonTooltip,
  addMultipleButtonLabel,
  onMultipleButtonClick,
  tableLabel,
  onDetailsClick,
  fetchHook,
  fetchHookArgs,
  onSearch,
  searchExpr,
  isDetail,
}: {
  sectionTitle: string
  addButtonLabel: string
  addButtonClick: () => void
  addButtonDisabled?: boolean
  addButtonTooltip?: string
  addMultipleButtonLabel?: string
  onMultipleButtonClick?: () => void
  tableLabel: string
  onDetailsClick?: (row: TenantUser) => void
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: FetchHookArgsType
  onSearch?: (search: string) => void
  searchExpr?: string
  isDetail?: boolean
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState<number>(0)
  const searchInputData = useSelector(appManagementSelector)

  const validateSearchText = (expr: string) => {
    const validateExpr = isSearchUserEmail(expr)
    if (validateExpr) dispatch(setSearchInput({ open: true, text: expr }))
    return validateExpr
  }

  useEffect(() => {
    setRefresh(Date.now())
  }, [fetchHookArgs?.userRoleResponse, fetchHookArgs?.addUserResponse])

  return (
    <section id="identity-management-id" className="user-management-section">
      <SubHeaderTitle title={t(sectionTitle)} variant="h3" />
      <PageLoadingTable<TenantUser, FetchHookArgsType>
        tableVariant={TableVariants.SERVER_SIDE}
        autoFocus={false}
        onButtonClick={addButtonClick}
        buttonLabel={t(addButtonLabel)}
        buttonDisabled={addButtonDisabled}
        buttonTooltip={addButtonTooltip}
        secondButtonLabel={addMultipleButtonLabel && t(addMultipleButtonLabel)}
        onSecondButtonClick={onMultipleButtonClick}
        toolbarVariant="premium"
        searchPlaceholder={t('global.table.search')}
        columnHeadersBackgroundColor={'#FFFFFF'}
        searchInputData={searchInputData}
        searchExpr={searchExpr}
        onSearch={(expr: string) => {
          if (!onSearch || !validateSearchText(expr)) return
          setRefresh(Date.now())
          onSearch(expr)
        }}
        searchDebounce={1000}
        noRowsMsg={t('content.usermanagement.appUserDetails.table.noRowsMsg')}
        title={t(tableLabel)}
        loadLabel={t('global.actions.more')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.companyUserId}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.name'),
            flex: 2,
            valueGetter: ({ row }: { row: TenantUser }) =>
              `${row.firstName} ${row.lastName}`,
          },
          { field: 'email', headerName: t('global.field.email'), flex: 3 },
          {
            field: 'status',
            headerName: t('global.field.status'),
            flex: 1.5,
            renderCell: ({ value: status }) => {
              return (
                <StatusTag color="label" label={t(`global.field.${status}`)} />
              )
            },
          },
          {
            field: 'roles',
            headerName: t('global.field.role'),
            flex: 4,
            renderCell: ({ value: roles }) => (
              <OverLappingStatusTag roles={roles} />
            ),
          },
          {
            field: 'details',
            headerName: isDetail
              ? t('global.field.details')
              : t('global.field.edit'),
            flex: 1.5,
            renderCell: ({ row }: { row: TenantUser }) => (
              <IconButton
                disabled={onDetailsClick === undefined}
                color="secondary"
                onClick={() => {
                  onDetailsClick?.(row)
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
        disableColumnMenu
      />
    </section>
  )
}
