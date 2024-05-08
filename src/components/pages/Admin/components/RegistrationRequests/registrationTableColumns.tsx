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

import { IconButton } from '@catena-x/portal-shared-components'
import type { GridColDef } from '@mui/x-data-grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import dayjs from 'dayjs'
import {
  ProgressStatus,
  type ApplicationRequest,
  type ProgressButtonsType,
} from 'features/admin/applicationRequestApiSlice'
import EditIcon from '@mui/icons-material/Edit'
import './RegistrationRequests.scss'
import CheckList from './components/CheckList'
import type i18next from 'i18next'
import { Progress } from 'components/shared/basic/Progress'

// Columns definitions of Registration Request page Data Grid
export const RegistrationRequestsTableColumns = (
  t: typeof i18next.t,
  showConfirmOverlay?: (applicationId: string) => void,
  onConfirmationCancel?: (applicationId: string, name: string) => void,
  onChipButtonSelect?: (button: ProgressButtonsType, id: string) => void
): Array<GridColDef> => {
  const getStatusProgress = (row: ApplicationRequest) => {
    const todoItems = row.applicationChecklist.filter(
      (checklist: ProgressButtonsType) =>
        checklist.statusId === ProgressStatus.TO_DO
    ).length
    const inprogressItems = row.applicationChecklist.filter(
      (checklist: ProgressButtonsType) =>
        checklist.statusId === ProgressStatus.IN_PROGRESS
    ).length
    const doneItems = row.applicationChecklist.filter(
      (checklist: ProgressButtonsType) =>
        checklist.statusId === ProgressStatus.DONE
    ).length
    const failedItems = row.applicationChecklist.filter(
      (checklist: ProgressButtonsType) =>
        checklist.statusId === ProgressStatus.DONE
    ).length

    const items = {
      TO_DO: todoItems,
      IN_PROGRESS: inprogressItems,
      DONE: doneItems,
      FAILED: failedItems,
    }

    return (
      <Progress items={items} totalItems={row.applicationChecklist.length} />
    )
  }

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
          {row.applicationStatus === 'SUBMITTED' && !row.bpn && (
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
      flex: 1,
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
      flex: 1,
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
      flex: 1,
      sortable: false,
      renderCell: ({ row }: { row: ApplicationRequest }) => {
        return getStatusProgress(row)
        // if (row.applicationStatus === 'SUBMITTED')
        //   return (
        //     <div className="state-cell-container">
        //       {row.applicationStatus === 'SUBMITTED' && (
        //         <Chip
        //           {...{
        //             color: 'info',
        //             variant: 'filled',
        //             label: t(
        //               'content.admin.registration-requests.buttonprogress'
        //             ),
        //             type: 'progress',
        //             onClick: () => {
        //               // do nothing
        //             },
        //             withIcon: true,
        //           }}
        //         />
        //       )}
        //     </div>
        //   )
        // else
        //   return (
        //     <div className="state-cell-container">
        //       <StatusTag
        //         color={
        //           row.applicationStatus === 'CONFIRMED'
        //             ? 'confirmed'
        //             : 'declined'
        //         }
        //         label={t(
        //           `content.admin.registration-requests.cell${row.applicationStatus.toLowerCase()}`
        //         )}
        //       />
        //     </div>
        //   )
      },
    },
    {
      field: 'applicationChecklist',
      headerName: '',
      disableColumnMenu: true,
      flex: 0,
      renderCell: ({ row }: { row: ApplicationRequest }) => (
        <div
          style={{
            position: 'absolute',
            left: '-35px',
            marginTop: '90px',
            width: '100%',
          }}
        >
          {row.applicationChecklist &&
          row.applicationChecklist.length > 0 &&
          row.applicationStatus === 'SUBMITTED' ? (
            <CheckList
              headerText={t('content.admin.registration-requests.progress')}
              progressButtons={row.applicationChecklist}
              showCancel={row.applicationStatus === 'SUBMITTED'}
              cancelText={t('content.admin.registration-requests.cancel')}
              alignRow="center"
              onButtonClick={(button) => {
                if (onChipButtonSelect) {
                  onChipButtonSelect(button, row.applicationId)
                }
              }}
              onCancel={() => {
                if (onConfirmationCancel) {
                  onConfirmationCancel(row.applicationId, row.companyName)
                }
              }}
            />
          ) : null}
        </div>
      ),
    },
  ]
}
