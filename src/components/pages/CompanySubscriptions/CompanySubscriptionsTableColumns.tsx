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

import {
  LogoGrayData,
  Image,
  IconButton,
  Button,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import type { GridColDef } from '@mui/x-data-grid'
import {
  type SubscribedActiveApps,
  SubscriptionStatus,
} from 'features/apps/types'
import { getApiBase } from 'services/EnvironmentService'
import { fetchImageWithToken } from 'services/ImageService'
import { PAGES } from 'types/Constants'
import { useNavigate } from 'react-router'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UnpublishedIcon from '@mui/icons-material/Unpublished'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import type i18next from 'i18next'
import { Box } from '@mui/material'
import './style.scss'

export const CompanySubscriptionsTableColumns = (
  t: typeof i18next.t,
  handleOverlay?: (row: SubscribedActiveApps, enable: boolean) => void,
  currentActive?: number
): Array<GridColDef> => {
  const navigate = useNavigate()

  const renderStatus = (status: string) => {
    if (status === SubscriptionStatus.ACTIVE)
      return (
        <Button
          variant="text"
          startIcon={<CheckCircleOutlineIcon />}
          sx={{ color: '#B3CB2D' }}
          className="statusButton"
          size="small"
        >
          {t('content.companySubscriptions.subscribed')}
        </Button>
      )
    else if (status === SubscriptionStatus.PENDING)
      return (
        <Button
          startIcon={<HourglassEmptyIcon />}
          sx={{ color: '#FFA600' }}
          size="small"
          variant="text"
          className="statusButton"
        >
          {t('content.companySubscriptions.requested')}
        </Button>
      )
    else
      return (
        <Button
          variant="text"
          startIcon={<UnpublishedIcon />}
          sx={{ color: '#D91E18' }}
          size="small"
          className="statusButton"
        >
          {t('content.companySubscriptions.declined')}
        </Button>
      )
  }

  const canShowButton = (row: SubscribedActiveApps) =>
    row.status === SubscriptionStatus.ACTIVE

  const getSource = (row: SubscribedActiveApps) => {
    if (row.image && currentActive === 0)
      return `${getApiBase()}/api/apps/${row.offerId}/appDocuments/${row.image}`
    if (row.image && currentActive === 1)
      return `${getApiBase()}/api/services/${row.offerId}/serviceDocuments/${
        row.image
      }`
    return LogoGrayData
  }

  return [
    {
      field: 'image',
      headerName: t('content.companySubscriptions.table.appIcon'),
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => (
        <Image
          src={getSource(row)}
          loader={fetchImageWithToken}
          style={{
            objectFit: 'cover',
            width: 30,
            height: 30,
            borderRadius: '50%',
            marginRight: '5px',
          }}
        />
      ),
    },
    {
      field: 'name',
      headerName: t('content.companySubscriptions.table.appTitle'),
      flex: 3,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => (
        <Box sx={{ display: 'grid' }}>
          <Typography variant="body3">{row.name}</Typography>
          <Typography variant="body3">{row.provider}</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: t('content.companySubscriptions.table.status'),
      flex: 2,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => {
        return renderStatus(row.status)
      },
    },
    {
      field: 'details',
      headerName: t('content.companySubscriptions.table.details'),
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => {
        return (
          <IconButton
            color="secondary"
            onClick={() => {
              navigate(
                `/${PAGES.COMPANY_SUBSCRIPTIONS_DETAIL}/${row.offerId}`,
                {
                  state: {
                    row,
                    app: currentActive === 0,
                    service: currentActive === 1,
                  },
                }
              )
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        )
      },
    },
    {
      field: 'action',
      headerName: t('content.companySubscriptions.table.action'),
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ row }: { row: SubscribedActiveApps }) => (
        <Button
          variant="contained"
          size="small"
          disabled={!canShowButton(row)}
          sx={{ textTransform: 'none' }}
          onClick={(e) => {
            handleOverlay?.(row, true)
            e.stopPropagation()
          }}
        >
          {t('content.companySubscriptions.unsubscribe')}
        </Button>
      ),
    },
  ]
}
