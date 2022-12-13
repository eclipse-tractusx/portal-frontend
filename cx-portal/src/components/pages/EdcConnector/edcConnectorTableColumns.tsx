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

import { useState } from 'react'
import Box from '@mui/material/Box'
import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Grid, Container } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

// Columns definitions of Connector page Data Grid
export const ConnectorTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()
  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return [
    {
      field: 'name',
      headerName: t('content.edcconnector.columns.name'),
      flex: 1,
      sortable: false,
    },
    {
      field: 'location',
      headerName: t('content.edcconnector.columns.location'),
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'type',
      headerName: t('content.edcconnector.columns.type'),
      flex: 1,
      sortable: false,
    },
    {
      field: 'DapsRegistrationSuccessful',
      headerName: t('content.edcconnector.columns.status'),
      flex: 1,
      sortable: false,
      renderCell: ({ row }: { row: any }) => (
        <Box onClick={() => {}}>
          <IconButton
            color="secondary"
            disabled
            size="small"
            style={{
              alignSelf: 'center',
            }}
          >
            {row.DapsRegistrationSuccessful ? (
              <LockIcon sx={{ color: 'green' }} />
            ) : (
              <LockIcon sx={{ color: '#b6b6b6' }} />
            )}
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'detail',
      headerName: '',
      flex: 1,
      sortable: false,
      renderCell: ({ row }: { row: any }) => (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <IconButton
                color="secondary"
                disabled
                size="small"
                style={{
                  alignSelf: 'center',
                  color: isHover ? 'blue' : '#ADADAD',
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
            {row.status === 'PENDING' && (
              <Grid item xs={6}>
                <IconButton
                  color="secondary"
                  disabled
                  size="small"
                  style={{ alignSelf: 'center' }}
                >
                  <AccessTimeIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Container>
      ),
    },
  ]
}
