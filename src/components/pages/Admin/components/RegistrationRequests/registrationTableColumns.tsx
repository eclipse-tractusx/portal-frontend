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

import { IconButton, Typography } from '@catena-x/portal-shared-components'
import type { GridColDef } from '@mui/x-data-grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import dayjs from 'dayjs'
import _ from 'lodash'
import {
  ApplicationRequestStatus,
  type ApplicationRequest,
  type ProgressType,
  initialProgressValue,
} from 'features/admin/applicationRequestApiSlice'
import EditIcon from '@mui/icons-material/Edit'
import type i18next from 'i18next'
import { Progress } from 'components/shared/basic/Progress'
import './RegistrationRequests.scss'

interface StatusProgressProps {
  application: ApplicationRequest
  trans: typeof i18next.t
  type?: boolean
  onConfirmationCancel?: (applicationId: string, name: string) => void
}

export const StatusProgress = ({
  application,
  trans,
  type = true,
  onConfirmationCancel,
}: StatusProgressProps) => {
  const t = trans
  const groupedItems = _.chain(application.applicationChecklist)
    .groupBy('statusId')
    .map((value, key) => ({ [key]: value.length }))
    .value()

  const items: ProgressType = {
    ...initialProgressValue,
    ...Object.assign({}, ...groupedItems),
  }

  const getProgressStatus = (
    style: React.CSSProperties,
    row: ApplicationRequest,
    statusText: string
  ) => {
    return (
      <div
        className="progressMain"
        style={{
          border: `2px solid ${style.border}`,
          background: style.background,
          width:
            statusText ===
            t('content.admin.registration-requests.buttonPartiallyCompleted')
              ? 'max-width'
              : '140px',
        }}
      >
        <Progress
          applicationStatus={row.applicationStatus}
          items={items}
          totalItems={row.applicationChecklist.length}
        />
        <Typography
          variant="body3"
          className="statusText"
          sx={{ color: style.color }}
        >
          {statusText}
        </Typography>
      </div>
    )
  }

  if (application.applicationStatus === ApplicationRequestStatus.SUBMITTED) {
    const style = {
      border: items.FAILED ? '#d91e18' : '#EAF1FE',
      color: items.FAILED ? '#d91e18' : '#000',
    }
    return (
      <div className="statusMain">
        {getProgressStatus(
          style,
          application,
          t(
            `content.admin.registration-requests.${items.FAILED ? 'buttonerror' : 'buttonprogress'}`
          )
        )}
        {type && (
          <Typography
            variant="body3"
            className="cancelBtn"
            onClick={(e) => {
              e.stopPropagation()
              onConfirmationCancel?.(
                application.applicationId,
                application.companyName
              )
            }}
          >
            {t('content.admin.registration-requests.cancel')}
          </Typography>
        )}
      </div>
    )
  } else if (
    application.applicationStatus === ApplicationRequestStatus.DECLINED ||
    application.applicationStatus ===
      ApplicationRequestStatus.CANCELLED_BY_CUSTOMER
  ) {
    const style = {
      border: '#d91e18',
      color: '#d91e18',
      background: '#fee7e2',
    }
    return getProgressStatus(
      style,
      application,
      t('content.admin.registration-requests.buttonrejected')
    )
  } else if (
    application.applicationStatus === ApplicationRequestStatus.CONFIRMED &&
    items?.SKIPPED === 1
  ) {
    const style = {
      border: '#0f71cb',
      color: '#0f71cb',
      background: '#eaf1fe',
    }
    return getProgressStatus(
      style,
      application,
      t('content.admin.registration-requests.buttonPartiallyCompleted')
    )
  } else if (
    application.applicationStatus === ApplicationRequestStatus.CONFIRMED
  ) {
    const style = {
      border: '#00AA55',
      color: '#00AA55',
      background: '#e2f6c7',
    }
    return getProgressStatus(
      style,
      application,
      t('content.admin.registration-requests.buttoncompleted')
    )
  }
}

// Columns definitions of Registration Request page Data Grid
export const RegistrationRequestsTableColumns = (
  t: typeof i18next.t,
  showConfirmOverlay?: (applicationId: string) => void,
  onConfirmationCancel?: (applicationId: string, name: string) => void
): Array<GridColDef> => {
  return [
    {
      field: 'companyInfo',
      headerName: t('content.admin.registration-requests.columns.companyinfo'),
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div>
          <p style={{ margin: '3px 0' }}>{row.companyName}</p>
        </div>
      ),
    },
    {
      field: 'email',
      headerName: t('content.admin.registration-requests.columns.contact'),
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <p style={{ margin: '3px 0' }}>{row.email}</p>
      ),
    },
    {
      field: 'bpn',
      headerName: t('content.admin.registration-requests.columns.bpn'),
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div className="bpn-edit-flex">
          <span
            style={{
              marginRight: '30px',
            }}
          >
            {row.bpn}
          </span>
          {row.applicationStatus === ApplicationRequestStatus.SUBMITTED &&
            !row.bpn && (
              <span
                style={{
                  paddingTop: '2px',
                }}
                onClick={() => {
                  if (showConfirmOverlay) {
                    showConfirmOverlay(row.applicationId)
                  }
                }}
                onKeyDown={() => {
                  // do nothing
                }}
              >
                <EditIcon sx={{ color: '#d1d1d1', cursor: 'pointer' }} />
              </span>
            )}
        </div>
      ),
    },
    {
      field: 'dateCreated',
      headerName: t('content.admin.registration-requests.columns.age'),
      flex: 1.1,
      disableColumnMenu: true,
      valueGetter: ({ row }: { row: ApplicationRequest }) => {
        const date1 = dayjs(row.dateCreated).format('YYYY-MM-DD')
        const date2 = dayjs()
        const days = date2.diff(date1, 'days')
        return (
          days + ` ${t('content.admin.registration-requests.columns.days')}`
        )
      },
    },
    {
      field: 'detail',
      headerName: t('content.admin.registration-requests.columns.details'),
      flex: 1.1,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      renderCell: () => (
        <IconButton color="secondary" size="small">
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
    {
      field: 'status',
      headerName: t('content.admin.registration-requests.columns.status'),
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      flex: 2,
      sortable: false,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <StatusProgress
          application={row}
          trans={t}
          onConfirmationCancel={onConfirmationCancel}
        />
      ),
    },
  ]
}
