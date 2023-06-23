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
import { AppDetails } from 'features/apps/apiSlice'

export default function BoardTechnicalUserSetup({
  item,
}: {
  item: AppDetails
}) {
  const { t } = useTranslation()

  const getTechUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Typography variant="subtitle2" key={role}>
          * {role}
        </Typography>
      ))
    ) : (
      <Typography variant="caption2" className="not-available">
        {t('global.errors.noTechnicalUserProfilesAvailable')}
      </Typography>
    )
  }

  return (
    <div style={{ marginBottom: '60px' }}>
      <Typography variant="h4">
        {t('content.adminboardDetail.technicalUserSetup.heading')}
      </Typography>
      <Typography variant="body2">
        {t('content.adminboardDetail.technicalUserSetup.message')}
      </Typography>
      <Grid container spacing={2} sx={{ margin: '30px 0' }}>
        <Grid item xs={12}>
          {item.technicalUserProfile &&
            getTechUserData(Object.values(item?.technicalUserProfile)[0])}
        </Grid>
      </Grid>
    </div>
  )
}
