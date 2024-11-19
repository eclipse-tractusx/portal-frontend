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
import { Typography } from '@catena-x/portal-shared-components'
import type { AppDetails } from 'features/apps/types'
import { Grid } from '@mui/material'
import '../style.scss'

export default function AppDetailTechUserSetup({ item }: { item: AppDetails }) {
  const { t } = useTranslation('')

  const getAppDetailTechUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Grid spacing={2} sx={{ margin: '0px' }} key={role} container>
          <Grid item sx={{ p: '10px 22px !important' }} xs={12}>
            <Typography variant="label3">* {role}</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Grid margin={'0px'} container spacing={2}>
        <Typography
          sx={{ textAlign: 'center', width: '100%' }}
          variant="label3"
        >
          {t('global.errors.noTechnicalUserProfilesAvailable')}
        </Typography>
      </Grid>
    )
  }

  return (
    <div id="technical-user-setup">
      <div className="divider-height" />
      <Typography variant="h3">
        {t('content.appdetail.technicalUserSetup.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('content.appdetail.technicalUserSetup.message')}
      </Typography>
      {item.technicalUserProfile &&
        getAppDetailTechUserData(Object.values(item?.technicalUserProfile)[0])}
    </div>
  )
}
