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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import {
  IconButton,
  PageLoadingTable,
} from '@catena-x/portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import './AdminCredential.scss'
import { useFetchCompanySearchQuery } from 'features/admin/applicationRequestApiSlice'

export interface DummyData {
  date: string
  companyInfo: string
  certificate: string
}

enum FilterType {
  ALL = 'all',
  OPEN = 'open',
  CONFIRMED = 'confirmed',
  DECLINED = 'declined',
}

export default function AdminCredentialElements() {
  const { t } = useTranslation()

  const [group, setGroup] = useState<string>(FilterType.ALL)

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setGroup(viewValue)
  }

  const filterButtons = [
    {
      buttonText: t('content.adminCertificate.tabs.all'),
      buttonValue: FilterType.ALL,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.open'),
      buttonValue: FilterType.OPEN,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.confirmed'),
      buttonValue: FilterType.CONFIRMED,
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminCertificate.tabs.declined'),
      buttonValue: FilterType.DECLINED,
      onButtonClick: setView,
    },
  ]

  const columns = [
    { field: 'id', hide: true },
    {
      field: 'dateCreated',
      headerName: t('content.adminCertificate.table.date'),
      flex: 1.5,
      valueGetter: ({ row }: { row: any }) =>
        dayjs(row.dateCreated).format('YYYY-MM-DD'),
    },
    {
      field: 'companyName',
      headerName: t('content.adminCertificate.table.companyInfo'),
      flex: 2,
    },
    {
      field: 'applicationId',
      headerName: t('content.adminCertificate.table.certificate'),
      flex: 1.5,
    },
    {
      field: 'details',
      headerName: t('content.adminCertificate.table.details'),
      flex: 1,
      renderCell: ({ row }: { row: any }) => (
        <IconButton
          color="secondary"
          size="small"
          onClick={() =>
            console.log('on details click: Company Name', row.companyName)
          }
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
    {
      field: 'status',
      headerName: '',
      flex: 2,
      renderCell: ({ row }: { row: any }) => (
        <>
          <Button
            size="small"
            color="error"
            variant="contained"
            className="statusBtn"
          >
            {t('global.actions.decline')}
          </Button>
          <Button
            size="small"
            color="success"
            variant="contained"
            className="statusBtn ml-10"
          >
            {t('global.actions.confirm')}
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="recommended-main">
      <PageLoadingTable<DummyData>
        alignCell="start"
        toolbarVariant={'searchAndFilter'}
        hasBorder={false}
        columnHeadersBackgroundColor={'transparent'}
        searchPlaceholder={t('content.adminCertificate.search')}
        searchDebounce={1000}
        title=""
        loadLabel={t('global.actions.more')}
        fetchHook={useFetchCompanySearchQuery}
        getRowId={(row: { [key: string]: string }) => row.applicationId}
        columns={columns}
        defaultFilter={group}
        filterViews={filterButtons}
      />
    </div>
  )
}
