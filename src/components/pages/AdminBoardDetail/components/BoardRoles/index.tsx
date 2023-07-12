/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import { Grid } from '@mui/material'
import { uniqueId } from 'lodash'
import { AppDetails } from 'features/apps/apiSlice'

export default function BoardRoles({ item }: { item: AppDetails }) {
  const { t } = useTranslation('', {
    keyPrefix: 'content.adminboardDetail.roles',
  })

  return (
    <div style={{ marginBottom: '60px' }}>
      <Typography variant="h4">{t('heading')}</Typography>
      <Typography variant="body2">{t('message')}</Typography>
      <Grid container spacing={2} sx={{ margin: '30px 0 40px' }}>
        <>
          {item.roles &&
            item.roles.map((role: string) => (
              <Grid item xs={6} key={uniqueId(role)}>
                <Typography variant="h5">{role}</Typography>
                <Typography variant="caption3">
                  {t('roleDescription')}
                </Typography>
              </Grid>
            ))}
        </>
      </Grid>
    </div>
  )
}
