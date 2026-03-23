/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { Grid } from '@mui/material'
import { uniqueId } from 'lodash'
import type { AppDetails } from 'features/apps/types'

export default function BoardRoles({ item }: Readonly<{ item: AppDetails }>) {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h3">
        {t('content.adminboardDetail.roles.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {t('content.adminboardDetail.roles.message')}
      </Typography>
      {item.roles && item.roles.length > 0 ? (
        <Grid container spacing={2} sx={{ margin: '0px' }}>
          {item.roles?.map((role) => (
            <Grid
              item
              xs={6}
              key={uniqueId(role)}
              sx={{ p: '20px !important', pb: '0 !important' }}
            >
              <Typography variant="label2">{role}</Typography>
              <Typography variant="body3">
                {t('content.adminboardDetail.roles.roleDescription')}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4 }}>
          {t('global.errors.noRolesAvailable')}
        </Typography>
      )}
    </>
  )
}
