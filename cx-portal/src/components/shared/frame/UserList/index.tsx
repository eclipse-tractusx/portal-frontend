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

import {
  IconButton,
  StatusTag,
  PageLoadingTable,
  Button,
  PaginFetchArgs,
} from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { TenantUser } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import './style.scss'

export const UserList = ({
  sectionTitle,
  addButtonLabel,
  addButtonClick,
  tableLabel,
  onDetailsClick,
  fetchHook,
  fetchHookArgs,
}: {
  sectionTitle: string
  addButtonLabel: string
  addButtonClick: () => void
  tableLabel: string
  onDetailsClick: (row: TenantUser) => void
  fetchHook: (paginArgs: PaginFetchArgs) => any
  fetchHookArgs?: any
}) => {
  const { t } = useTranslation()

  return (
    <section id="identity-management-id">
      <SubHeaderTitle title={t(sectionTitle)} variant="h3" />
      <Button
        onClick={addButtonClick}
        size="medium"
        sx={{ margin: '0 auto 25px auto', display: 'block' }}
      >
        {t(addButtonLabel)}
      </Button>
      <PageLoadingTable<TenantUser>
        title={t(tableLabel)}
        loadLabel={t('global.actions.more')}
        fetchHook={fetchHook}
        fetchHookArgs={fetchHookArgs}
        getRowId={(row: { [key: string]: string }) => row.companyUserId}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.name'),
            flex: 3,
            valueGetter: ({ row }: { row: TenantUser }) =>
              `${row.firstName} ${row.lastName}`,
          },
          { field: 'email', headerName: t('global.field.email'), flex: 3 },
          {
            field: 'status',
            headerName: t('global.field.status'),
            flex: 2,
            renderCell: ({ value: status }) => {
              const label = status ? 'active' : 'inactive'
              return (
                <StatusTag color="label" label={t(`global.field.${label}`)} />
              )
            },
          },
          {
            field: 'roles',
            headerName: t('global.field.role'),
            flex: 4,
            renderCell: ({ value: roles }) =>
              roles.length
                ? roles.map((role: string) => (
                    <StatusTag
                      key={role}
                      color="label"
                      label={role}
                      className="statusTag"
                    />
                  ))
                : '',
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 2,
            renderCell: ({ row }: { row: TenantUser }) => (
              <IconButton color="secondary" onClick={() => onDetailsClick(row)}>
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
      />
    </section>
  )
}
