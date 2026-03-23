/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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
import { IconButton } from '@arena2036/portal-shared-components-construct-x'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { SemanticModel } from 'features/semanticModels/types'
import type i18next from 'i18next'

// Columns definitions of Digital Twin page Data Grid
export const SemanticModelTableColumns = (
  t: typeof i18next.t,
  onDetailClick: (id: string) => void
): Array<GridColDef> => {
  const columnIds = ['name', 'type', 'version', 'status']
  return [
    ...columnIds.map((item) => ({
      field: item,
      flex: 2,
      headerName: t(`content.semantichub.table.columns.${item}`),
    })),
    {
      field: 'detail',
      headerName: 'Detail',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }: { row: SemanticModel }) => (
        <IconButton
          onClick={() => {
            onDetailClick(row.urn)
          }}
          color="secondary"
          size="small"
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
  ]
}
