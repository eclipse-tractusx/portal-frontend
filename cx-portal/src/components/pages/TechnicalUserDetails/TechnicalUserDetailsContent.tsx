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

import { Button } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  ServiceAccountDetail,
  ServiceAccountRole,
} from 'features/admin/serviceApiSlice'
import { OVERLAYS } from 'types/Constants'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import { KeyValueView } from 'components/shared/basic/KeyValueView'

export default function TechnicalUserDetailsContent({
  data,
}: {
  data: ServiceAccountDetail
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const displayData = [
    {
      key: 'ID',
      value: data.serviceAccountId,
      copy: true,
    },
    {
      key: `${t('content.usermanagement.technicalUser.serviceaccount')} ${t(
        'global.field.name'
      )}`,
      value: data.name,
      copy: true,
    },
    {
      key: t('global.field.clientId'),
      value: data.clientId,
      copy: true,
    },
    {
      key: t('global.field.authType'),
      value: data.authenticationType,
    },
    {
      key: t('global.field.secret'),
      value: data.secret,
      copy: true,
    },
  ]

  return (
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
          marginTop: '80px',
          marginBottom: '92px',
          width: '100%',
        }}
      >
        <KeyValueView
          cols={2}
          title={t(
            'content.usermanagement.technicalUser.detailsPage.userDetails'
          )}
          items={displayData}
        />

        <KeyValueView
          cols={1}
          title={t('global.field.description')}
          items={data.roles.map((role: ServiceAccountRole) => ({
            value: data.description,
          }))}
        />

        <KeyValueView
          cols={1}
          title={t('global.field.permission')}
          items={data.roles.map((role: ServiceAccountRole) => ({
            value: role.roleName,
          }))}
        />
      </Box>
    </section>
  )
}
