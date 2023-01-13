/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { GridColDef } from '@mui/x-data-grid'
import { Tooltips, Typography } from 'cx-portal-shared-components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LockIcon from '@mui/icons-material/Lock'
import Box from '@mui/material/Box'
import { ConnectorContentAPIResponse } from 'features/connector/types'

// Columns definitions of Connector page Data Grid
export const ConnectorTableColumns = (
  translationHook: any,
  onDelete: (row: ConnectorContentAPIResponse) => void
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'name',
      headerName: t('content.edcconnector.columns.name'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'location',
      headerName: t('content.edcconnector.columns.location'),
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <Typography variant="body2">{row.location}</Typography>
      ),
    },
    {
      field: 'type',
      headerName: t('content.edcconnector.columns.type'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: { row: any }) => (
        <Typography variant="body2">
          {row.type === 'COMPANY_CONNECTOR'
            ? t('content.edcconnector.rowValue.owned')
            : t('content.edcconnector.rowValue.managed')}
        </Typography>
      ),
    },
    {
      field: 'dapsRegistrationSuccessful',
      headerName: t('content.edcconnector.columns.status'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <Box>
          <LockIcon
            sx={{
              color: row.dapsRegistrationSuccessful ? 'green' : '#b6b6b6',
              cursor: 'pointer',
            }}
          />
        </Box>
      ),
    },
    {
      field: 'detail',
      headerName: '',
      flex: 0.3,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <Box>
          <DeleteOutlineIcon
            sx={{
              color: '#adadad',
              marginRight: '-30px',
              ':hover': {
                color: 'blue',
                cursor: 'pointer',
              },
            }}
            onClick={() => onDelete(row)}
          />
        </Box>
      ),
    },
    {
      field: 'none',
      headerName: '',
      flex: 0.3,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <>
          {row.status === 'PENDING' && (
            <Tooltips
              additionalStyles={{
                cursor: 'pointer',
                marginTop: '30px !important',
              }}
              tooltipPlacement="bottom"
              tooltipText={t('content.edcconnector.columns.tooltipText')}
              children={
                <span>
                  <Box>
                    <AccessTimeIcon
                      sx={{
                        marginLeft: '-30px',
                        color: '#adadad',
                      }}
                    />
                  </Box>
                </span>
              }
            />
          )}
        </>
      ),
    },
  ]
}
