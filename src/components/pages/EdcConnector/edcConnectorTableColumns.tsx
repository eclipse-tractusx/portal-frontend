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

import { GridColDef } from '@mui/x-data-grid'
import {
  StatusTag,
  Tooltips,
  Typography,
} from '@catena-x/portal-shared-components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
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
      flex: 1.3,
      disableColumnMenu: true,
      sortable: false,
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
      field: 'location',
      headerName: t('content.edcconnector.columns.location'),
      flex: 0.8,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <Typography variant="body2">{row.location}</Typography>
      ),
    },
    {
      field: 'selfDescriptionDocumentId',
      headerName: t('content.edcconnector.columns.sdDescription'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <>
          {row.selfDescriptionDocumentId ? (
            <Box>
              <CheckBoxIcon
                sx={{
                  color: 'green',
                  cursor: 'pointer',
                }}
              />
            </Box>
          ) : (
            <Tooltips
              additionalStyles={{
                cursor: 'pointer',
                marginTop: '30px !important',
              }}
              tooltipPlacement="bottom"
              tooltipText={t(
                'content.edcconnector.columns.sdRegistrationToolTip'
              )}
              children={
                <span>
                  <Box>
                    <CheckBoxIcon
                      sx={{
                        color: '#b6b6b6',
                        cursor: 'pointer',
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
    {
      field: 'details',
      headerName: t('content.edcconnector.columns.details'),
      flex: 1.2,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: any }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              marginRight: '20px',
              marginTop: '5px',
            }}
          >
            <DeleteOutlineIcon
              sx={{
                color: '#adadad',
                ':hover': {
                  color: 'blue',
                  cursor: 'pointer',
                },
              }}
              onClick={() => onDelete(row)}
            />
          </Box>
          <Box>
            <StatusTag
              sx={{
                minWidth: '100px',
              }}
              color={row.status === 'PENDING' ? 'pending' : 'confirmed'}
              label={row.status}
            />
          </Box>
        </Box>
      ),
    },
  ]
}
