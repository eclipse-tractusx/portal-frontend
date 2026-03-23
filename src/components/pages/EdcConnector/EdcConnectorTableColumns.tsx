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

import type { GridColDef } from '@mui/x-data-grid'
import {
  IconButton,
  StatusTag,
  Tooltips,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import Box from '@mui/material/Box'
import type { ConnectorContentAPIResponse } from 'features/connector/types'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

// Columns definitions of Connector page Data Grid
export const ConnectorTableColumns = (
  onDelete: (row: ConnectorContentAPIResponse) => void
): Array<GridColDef> => {
  const { t } = useTranslation()

  return [
    {
      field: 'name',
      headerName: t('content.edcconnector.columns.name'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: 'type',
      headerName: t('content.edcconnector.columns.type'),
      flex: 0.7,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: { row: ConnectorContentAPIResponse }) => (
        <Typography variant="body2">
          {row.type === 'COMPANY_CONNECTOR'
            ? t('content.edcconnector.rowValue.owned')
            : t('content.edcconnector.rowValue.managed')}
        </Typography>
      ),
    },
    {
      field: 'selfDescriptionDocumentId',
      headerName: t('content.edcconnector.columns.sdDescription'),
      flex: 0.8,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: ConnectorContentAPIResponse }) => (
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
              }}
              tooltipPlacement="bottom"
              tooltipText={t(
                'content.edcconnector.columns.sdRegistrationToolTip'
              )}
              children={
                <span>
                  <Box>
                    <CheckBoxOutlineBlankIcon
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
      field: 'connectorUrl',
      headerName: t('content.edcconnector.columns.connectorUrl'),
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'details',
      headerName: t('content.edcconnector.columns.details'),
      flex: 0.8,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: () => (
        <IconButton color="secondary">
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
    {
      field: 'status',
      headerName: t('content.edcconnector.columns.status'),
      flex: 0.8,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }: { row: ConnectorContentAPIResponse }) => (
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
              onClick={() => {
                onDelete(row)
              }}
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
