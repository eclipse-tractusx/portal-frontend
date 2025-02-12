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

import { t } from 'i18next'
import { Table, Tooltips } from '@catena-x/portal-shared-components'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box } from '@mui/material'
import { type TechnicalUserProfiles } from 'features/appManagement/types'
import { findIndex } from 'lodash'

interface TechUserTableProps {
  userProfiles: TechnicalUserProfiles[]
  handleAddTechUser?: () => void
  handleDelete?: (row: TechnicalUserProfiles) => void
  handleEdit?: (row: TechnicalUserProfiles) => void
  disableActions?: boolean
}

export const TechUserTable = ({
  userProfiles,
  handleAddTechUser,
  handleDelete,
  handleEdit,
  disableActions = false,
}: TechUserTableProps) => {
  return (
    <Table
      hideFooterPagination={true}
      autoFocus={false}
      buttonLabel={t(
        'content.apprelease.technicalIntegration.table.addtechUserButton'
      )}
      onButtonClick={handleAddTechUser}
      toolbarVariant="premium"
      searchPlaceholder={''}
      columnHeadersBackgroundColor={'#FFFFFF'}
      searchDebounce={1000}
      noRowsMsg={t('content.apprelease.technicalIntegration.table.noRoles')}
      title={t('content.apprelease.technicalIntegration.table.title')}
      getRowId={(row: { [key: string]: string }) => row.technicalUserProfileId}
      rows={userProfiles ?? []}
      rowsCount={userProfiles?.length ?? 0}
      onCellClick={() => {}}
      columns={[
        {
          field: 'name',
          headerAlign: 'left',
          align: 'left',
          headerName: t('content.apprelease.technicalIntegration.table.name'),
          flex: 2,
          valueGetter: ({ row }: { row: TechnicalUserProfiles }) =>
            t('content.apprelease.technicalIntegration.table.name') +
            ' ' +
            (findIndex(
              userProfiles,
              (e) => {
                return e.technicalUserProfileId == row.technicalUserProfileId
              },
              0
            ) +
              1),
        },
        {
          field: 'type',
          headerAlign: 'left',
          align: 'left',
          headerName: t('content.apprelease.technicalIntegration.table.type'),
          flex: 1,
          valueGetter: ({ row }: { row: TechnicalUserProfiles }) =>
            row.userRoles[0]?.type,
        },
        {
          field: 'roleName',
          headerAlign: 'center',
          align: 'left',
          headerName: t('content.apprelease.technicalIntegration.table.role'),
          flex: disableActions ? 2.5 : 2,
          renderCell: ({ row }: { row: TechnicalUserProfiles }) => {
            const roleNames = row.userRoles.map((role) => role.roleName)
            const roles = roleNames.join(', ')
            const charLimit = 200 / 10
            const maxLength = Math.floor(charLimit)
            let displayedRoles = roles
            let remainingCount = 0
            if (roles.length > maxLength) {
              displayedRoles = roles.slice(0, maxLength) + '...'
              remainingCount =
                roleNames.length - displayedRoles.split(',').length
            }
            return (
              <Tooltips
                additionalStyles={{
                  display: 'block',
                }}
                tooltipPlacement="top-start"
                tooltipText={row.userRoles
                  .map((role) => role.roleName)
                  .join(', ')}
                children={
                  <span>
                    {remainingCount > 0
                      ? displayedRoles + ' +' + remainingCount
                      : displayedRoles}
                  </span>
                }
              />
            )
          },
        },
        {
          field: 'edit',
          headerAlign: 'left',
          align: 'left',
          headerName: disableActions
            ? ''
            : t('content.apprelease.technicalIntegration.table.action'),
          flex: disableActions ? 0 : 1,
          renderCell: ({ row }: { row: TechnicalUserProfiles }) => (
            <>
              {!disableActions && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    placeItems: 'center',
                  }}
                >
                  <EditOutlinedIcon
                    sx={{
                      color: '#adadad',
                      ':hover': {
                        color: 'blue',
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => {
                      handleEdit && handleEdit(row)
                    }}
                  />

                  <DeleteOutlineIcon
                    sx={{
                      color: '#adadad',
                      marginLeft: '10px',
                      ':hover': {
                        color: 'blue',
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => {
                      handleDelete && handleDelete(row)
                    }}
                  />
                </Box>
              )}
            </>
          ),
        },
      ]}
      disableColumnMenu
    />
  )
}
