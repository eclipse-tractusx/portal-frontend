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
import { Table } from '@catena-x/portal-shared-components'
import { type technicalUserProfiles } from 'features/appManagement/apiSlice'

interface TechUserTableProps {
  userProfiles: technicalUserProfiles[]
  handleAddTechUser: () => void
}

interface UserRoleType {
  roleId: string
  roleName: string
  type: string
}

export const TechUserTable = ({
  userProfiles,
  handleAddTechUser,
}: TechUserTableProps) => {
  const profiles = userProfiles?.[0]?.userRoles
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
      noRowsMsg={'No tech user added'}
      title={t('content.apprelease.technicalIntegration.table.title')}
      getRowId={(row: { [key: string]: string }) => row.roleId}
      rows={profiles ?? []}
      rowsCount={profiles?.length ?? 0}
      onCellClick={() => {}}
      columns={[
        {
          field: 'type',
          headerAlign: 'left',
          align: 'left',
          headerName: t('content.apprelease.technicalIntegration.table.type'),
          flex: 1.5,
          valueGetter: ({ row }: { row: UserRoleType }) => row.type,
        },
        {
          field: 'roleName',
          headerAlign: 'left',
          align: 'left',
          headerName: t('content.apprelease.technicalIntegration.table.role'),
          flex: 2,
          valueGetter: ({ row }: { row: UserRoleType }) => row.roleName,
        },
      ]}
      disableColumnMenu
    />
  )
}
