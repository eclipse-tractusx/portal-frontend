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
import type { AppDetails } from 'features/apps/apiSlice'

export default function BoardTechnicalUserSetup({
  item,
}: {
  item: AppDetails
}) {
  const { t } = useTranslation()

  const getTechnicalUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Grid container spacing={2} sx={{ margin: '0px' }} key={role}>
          <Grid item xs={12} className="tech-user-data">
            <Typography variant="body2">* {role}</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Grid container spacing={2} margin={'0px'}>
        <Typography variant="body2" sx={{ textAlign: 'center', width: '100%' }}>
          {t('global.errors.noTechnicalUserProfilesAvailable')}
        </Typography>
      </Grid>
    )
  }

  return (
    <>
      <Typography variant="h3">
        {t('content.adminboardDetail.technicalUserSetup.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        {t('content.adminboardDetail.technicalUserSetup.message')}
      </Typography>
      {item.technicalUserProfile &&
        getTechnicalUserData(Object.values(item?.technicalUserProfile)[0])}
    </>
  )
}
