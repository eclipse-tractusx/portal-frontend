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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  ServiceAccountListEntry,
  useFetchServiceAccountListQuery,
  useRemoveServiceAccountMutation,
} from 'features/admin/serviceApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay/actions'
import {
  updateData,
  UPDATES,
  updateTechuserSelector,
} from 'features/control/updatesSlice'

export const TechnicalUserTable = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const update = useSelector(updateTechuserSelector)
  const [removeServiceAccount] = useRemoveServiceAccountMutation()

  const handleRemove = async (id: string) => {
    try {
      await removeServiceAccount(id).unwrap()
      dispatch(updateData(UPDATES.TECHUSER_LIST))
    } catch (err) {
      console.log(err)
    }
  }

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
                    dispatch(show(OVERLAYS.TECHUSER, row.serviceAccountId))
                  }
                >
                  <ArrowForwardIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemove(row.serviceAccountId)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
