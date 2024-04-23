/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
} from '@catena-x/portal-shared-components'
import { appManagementSelector } from 'features/appManagement/slice'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetchUsersSearchQuery } from 'features/admin/userApiSlice'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const CompanyAddressList = ({
  handleButtonClick,
  handleSecondButtonClick,
}: {
  handleButtonClick: () => void
  handleSecondButtonClick: () => void
}) => {
  const { t } = useTranslation()
  const searchInputData = useSelector(appManagementSelector)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [refresh, setRefresh] = useState<number>(0)
  const args = {}
  return (
    <Box>
      <PageLoadingTable<any, any>
        autoFocus={false}
        onButtonClick={handleButtonClick}
        buttonLabel={t('content.companyData.table.buttonAddress')}
        secondButtonLabel={t('content.companyData.table.buttonSite')}
        onSecondButtonClick={handleSecondButtonClick}
        toolbarVariant="premium"
        searchPlaceholder={t('content.companyData.table.search')}
        columnHeadersBackgroundColor={'#FFFFFF'}
        searchInputData={searchInputData}
        searchExpr={searchExpr}
        onSearch={(expr: string) => {
            setSearchExpr(expr)
            setRefresh(1)
        }}
        searchDebounce={1000}
        noRowsMsg={t('content.companyData.table.noRowsMsg')}
        title={t('content.companyData.table.title')}
        loadLabel={t('global.actions.more')}
        fetchHook={useFetchUsersSearchQuery}
        fetchHookArgs={args}
        fetchHookRefresh={refresh}
        getRowId={(row: { [key: string]: string }) => row.companyUserId}
        columns={[
          {
            field: 'site',
            headerName: t('content.companyData.table.site'),
            flex: 3,
          },
          {
            field: 'location',
            headerName: t('content.companyData.table.location'),
            flex: 3,
          },
        ]}
        disableColumnMenu
      />
    </Box>
  )
}
