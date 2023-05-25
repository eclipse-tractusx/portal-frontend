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

import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import { AppDetails } from 'features/apps/apiSlice'
import { Grid } from '@mui/material'

export default function AppDetailTechUserSetup({ item }: { item: AppDetails }) {
  const { t } = useTranslation('')

  const getTechUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Grid container spacing={2} sx={{ margin: '30px 0' }} key={role}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">* {role}</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Typography variant="caption2" className="not-available" mt={2}>
        {t('global.errors.noTechnicalUserProfilesAvailable')}
      </Typography>
    )
  }

  return (
    <div style={{ marginBottom: '95px' }}>
      <Typography variant="h4">
        {t('content.appdetail.technicalUserSetup.heading')}
      </Typography>
      <Typography variant="body2">
        {t('content.appdetail.technicalUserSetup.message')}
      </Typography>
      {item.technicalUserProfile &&
        getTechUserData(Object.values(item?.technicalUserProfile)[0])}
    </div>
  )
}
