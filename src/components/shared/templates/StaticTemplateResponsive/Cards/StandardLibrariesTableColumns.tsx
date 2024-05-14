/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import type { GridColDef } from '@mui/x-data-grid'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { IconButton } from '@catena-x/portal-shared-components'
import {
  type StandardLibraryType,
  type StdRows,
} from 'features/staticContent/staticContentApiSlice'
import { useTranslation } from 'react-i18next'

interface UidType {
  uid: number
  title: string
}

const getItemTitle = (values: number[], uids: UidType[]) => {
  return (
    uids.filter((e: { uid: number }) => values?.includes(e.uid))?.[0]?.title ??
    ''
  )
}

export const StandardLibrariesTableColumns = (
  stdJson: StandardLibraryType
): Array<GridColDef> => {
  const { t } = useTranslation()
  return [
    {
      field: 'Capabilities',
      headerName: t('content.standardLibraryTable.capabilities'),
      flex: 1.5,
      disableColumnMenu: true,
      valueGetter: ({ row }: { row: StdRows }) =>
        row?.capabilities?.length > 0 && stdJson
          ? getItemTitle(row.capabilities, stdJson.capabilities)
          : '',
    },
    {
      field: 'Version',
      headerName: t('content.standardLibraryTable.version'),
      flex: 1,
      disableColumnMenu: true,
      valueGetter: ({ row }: { row: StdRows }) => row.releaseOfDocument,
    },
    {
      field: 'Title',
      headerName: t('content.standardLibraryTable.title'),
      flex: 1.5,
      disableColumnMenu: true,
      valueGetter: ({ row }: { row: StdRows }) => row.title,
    },
    {
      field: 'Download',
      headerName: t('content.standardLibraryTable.download'),
      flex: 1,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      valueGetter: ({ row }: { row: StdRows }) => row.title,
      renderCell: ({ row }: { row: StdRows }) => (
        <IconButton color="secondary" size="small">
          <a
            href={`https://catena-x.net/${row.download}`}
            target="_blank"
            rel="noreferrer"
          >
            <DownloadForOfflineIcon />
          </a>
        </IconButton>
      ),
    },
  ]
}
