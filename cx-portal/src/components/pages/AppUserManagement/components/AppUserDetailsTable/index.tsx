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
  Button,
  PageLoadingTable,
} from 'cx-portal-shared-components'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { TenantUser, useFetchUsersQuery } from 'features/admin/userApiSlice'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import './AppUserDetailsTable.scss'

export const AppUserDetailsTable = ({ appId }: { appId: string }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <>
      <section className="management-section">
        <SubHeaderTitle
          title="content.usermanagement.appUserDetails.table.headline"
          variant="h3"
        />
        <Button
          onClick={() => dispatch(show(OVERLAYS.ADD_APP_USER_ROLES, appId))}
          size="medium"
          sx={{ margin: '0 auto 25px auto', display: 'block' }}
        >
          {t('content.usermanagement.appUserDetails.table.add')}
        </Button>
        <PageLoadingTable<TenantUser>
          title={t('content.usermanagement.appUserDetails.table.title')}
          loadLabel={t('global.actions.more')}
          fetch={useFetchUsersQuery}
          getRowId={(row: { [key: string]: string }) => row.companyUserId}
          columns={[
            {
              field: 'firstName',
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
              field: 'details',
              headerName: t('global.field.details'),
              flex: 2,
              renderCell: ({ row }: { row: TenantUser }) => (
                <IconButton
                  color="secondary"
                  onClick={() =>
                    dispatch(
                      show(OVERLAYS.EDIT_APP_USER_ROLES, row.companyUserId)
                    )
                  }
                >
                  <ArrowForwardIcon />
                </IconButton>
              ),
            },
          ]}
        />
      </section>
    </>
  )
}
