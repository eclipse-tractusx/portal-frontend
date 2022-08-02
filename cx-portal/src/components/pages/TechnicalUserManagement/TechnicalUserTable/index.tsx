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

import { IconButton, PageLoadingTable } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
//import { useNavigate } from 'react-router-dom'
import {
  ServiceAccountListEntry,
  useFetchServiceAccountListQuery,
} from 'features/admin/service/apiSlice'
import { useDispatch } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay/actions'

export const TechnicalUserTable = () => {
  const { t } = useTranslation()
  //const navigate = useNavigate()
  const dispatch = useDispatch()

  const onDetailsClick = (userId: string, name: string) => {
    //navigate(`/technicaluser/userdetails/${userId}`, { state: { name }, })
    dispatch(show(OVERLAYS.TECHUSER, userId))
  }

  return (
    <div style={{ paddingTop: '30px' }}>
      <PageLoadingTable<ServiceAccountListEntry>
        title={t('content.usermanagement.technicalUser.tableHeader')}
        loadLabel={t('global.more')}
        fetch={useFetchServiceAccountListQuery}
        getRowId={(row: { [key: string]: string }) => row.serviceAccountId}
        columns={[
          {
            field: 'name',
            headerName: t('global.field.userName'),
            flex: 2,
          },
          {
            field: 'clientId',
            headerName: t('global.field.clientId'),
            flex: 1,
          },
          {
            field: 'details',
            headerName: t('global.field.details'),
            flex: 1,
            renderCell: ({ row }: { row: ServiceAccountListEntry }) => (
              <IconButton
                color="secondary"
                onClick={() => onDetailsClick(row.serviceAccountId, row.name)}
              >
                <ArrowForwardIcon />
              </IconButton>
            ),
          },
        ]}
      />
    </div>
  )
}
