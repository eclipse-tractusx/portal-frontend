/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
import { IconButton } from '@catena-x/portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import type { BusinessPartner } from 'features/newPartnerNetwork/types'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'
import { useDispatch } from 'react-redux'
import type i18next from 'i18next'

// Columns definitions of Partner Network page Data Grid
export const PartnerNetworksTableColumns = (
  t: typeof i18next.t
): Array<GridColDef> => {
  const dispatch = useDispatch()

  return [
    {
      field: 'legalEntity.names',
      headerName: t('content.partnernetwork.columns.name'),
      flex: 2,
      sortable: false,

      valueGetter: ({ row }: { row: BusinessPartner }) =>
        row?.shortLegalName ?? '',
    },
    {
      field: 'legalEntity.bpn',
      headerName: t('content.partnernetwork.columns.bpn'),
      flex: 2,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) => row?.bpnl ?? '',
    },
    {
      field: 'cxmember', // Temporary field, doesnt exists yet
      headerName: t('content.partnernetwork.columns.cxparticipant'),
      flex: 1.5,
      sortable: false,
      renderCell: (params) =>
        params?.row?.member ? (
          <img
            src="/cx-logo.svg"
            alt="cx logo"
            style={{
              width: 40,
            }}
          />
        ) : (
          ''
        ),
    },
    {
      field: 'country',
      headerName: t('content.partnernetwork.columns.country'),
      flex: 1.5,
      sortable: false,
      valueGetter: ({ row }: { row: BusinessPartner }) =>
        row?.legalAddress?.physicalPostalAddress?.country?.name ??
        row?.legalAddress?.alternativePostalAddress?.country?.name ??
        '',
    },
    {
      field: 'detail',
      headerName: 'Detail',
      headerAlign: 'center',
      flex: 0.8,
      align: 'center',
      renderCell: (params) =>
        params?.row?.bpnl ? (
          <IconButton
            color="secondary"
            size="small"
            style={{ alignSelf: 'center' }}
            onClick={() => dispatch(show(OVERLAYS.PARTNER, params.row.bpnl))}
          >
            <ArrowForwardIcon />
          </IconButton>
        ) : (
          <></>
        ),
    },
  ]
}
