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

import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { TechnicalUserDetailsGrid } from './TechnicalUserDetailsGrid'
import { Box } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { ServiceAccountDetail } from 'features/admin/serviceApiSlice'
import { OVERLAYS } from 'types/Constants'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay/actions'
import { KeyValueView } from '../../shared/basic/KeyValueView'

export default function TechnicalUserDetailsContent({
  data,
}: {
  data: ServiceAccountDetail
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  return data ? (
    <>
      <section>
        <Button
          size="small"
          variant="outlined"
          startIcon={<HighlightOffIcon />}
          onClick={() =>
            dispatch(show(OVERLAYS.DELETE_TECHUSER, data.serviceAccountId))
          }
        >
          {t('content.usermanagement.technicalUser.delete')}
        </Button>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '130px',
            marginBottom: '92px',
            width: '100%',
          }}
        >
          <KeyValueView
            cols={2}
            title={t(
              'content.usermanagement.technicalUser.detailsPage.userDetails'
            )}
            items={[
              {
                key: t('ID'),
                value: data.serviceAccountId,
                copy: true,
              },
              {
                key: t('Service Account Name'),
                value: data.name,
                copy: true,
              },
              { key: t('Client ID'), value: data.clientId },
              {
                key: t('Auth Type'),
                value: data.authenticationType,
              },
              { key: t('Client Secret'), value: data.secret, copy: true },
            ]}
          />

          <KeyValueView
            cols={1}
            title={t(
              'content.usermanagement.technicalUser.detailsPage.description'
            )}
            items={{ key: t('Description'), value: data.description }}
          />

          <TechnicalUserDetailsGrid
            items={['Organisation name', 'User Name', 'admin@gmail.com']}
            title={t('content.usermanagement.technicalUser.detailsPage.spoc')}
          />

          <TechnicalUserDetailsGrid
            items={['load registry data', 'view registry data', 'access_xy']}
            title={t(
              'content.usermanagement.technicalUser.detailsPage.permission'
            )}
          />
        </Box>
      </section>
    </>
  ) : null
}
