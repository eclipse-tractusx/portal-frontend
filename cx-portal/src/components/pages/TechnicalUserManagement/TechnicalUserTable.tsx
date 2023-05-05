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

import { IconButton, PageLoadingTable } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  ServiceAccountListEntry,
  useFetchServiceAccountListQuery,
} from 'features/admin/serviceApiSlice'
import { useSelector } from 'react-redux'
import { PAGES } from 'types/Constants'
import { updateTechuserSelector } from 'features/control/updates'
import { useNavigate } from 'react-router-dom'

export const TechnicalUserTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const update = useSelector(updateTechuserSelector)

  return (
    <div style={{ paddingTop: '30px' }}>
      <PageLoadingTable<ServiceAccountListEntry>
        title={t('content.usermanagement.technicalUser.tableHeader')}
        loadLabel={t('global.actions.more')}
        fetchHook={useFetchServiceAccountListQuery}
        fetchHookRefresh={update}
        getRowId={(row: { [key: string]: string }) => row.serviceAccountId}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.userName'),
            flex: 3,
          },
          {
            field: 'clientId',
            headerName: t('global.field.clientId'),
            flex: 2,
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 1,
            renderCell: ({ row }: { row: ServiceAccountListEntry }) => (
              <>
                <IconButton
                  sx={{ marginRight: '8px' }}
                  color="secondary"
                  onClick={() =>
                    //dispatch(show(OVERLAYS.TECHUSER, row.serviceAccountId))
                    navigate(
                      `/${PAGES.TECHUSER_DETAILS}/${row.serviceAccountId}`
                    )
                  }
                >
                  <ArrowForwardIcon />
                </IconButton>
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
