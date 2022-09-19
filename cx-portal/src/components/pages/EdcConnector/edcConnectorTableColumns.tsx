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

import { GridColDef } from '@mui/x-data-grid'
import { IconButton } from 'cx-portal-shared-components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Grid, Container } from '@mui/material'

// Columns definitions of Connector page Data Grid
export const ConnectorTableColumns = (
  translationHook: any
): Array<GridColDef> => {
  const { t } = translationHook()

  return [
    {
      field: 'name',
      headerName: t('content.edcconnector.columns.name'),
      flex: 2,
      sortable: false,
    },
    {
      field: 'id',
      headerName: t('content.edcconnector.columns.id'),
      flex: 2,
      sortable: false,
    },
    {
      field: 'type',
      headerName: t('content.edcconnector.columns.type'),
      flex: 2.5,
      sortable: false,
    },
    {
      field: 'detail',
      headerName: t('content.edcconnector.columns.details'),
      flex: 1.5,
      align: 'center',
      sortable: false,
      renderCell: () => (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <IconButton
                color="secondary"
                disabled
                size="small"
                style={{ alignSelf: 'center' }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
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
          </Grid>
        </Container>
      ),
    },
  ]
}
