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
import { Typography } from '@catena-x/portal-shared-components'
import { Grid } from '@mui/material'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'

export default function MarketplaceTechnicalUserSetup({
  item,
}: {
  item: ServiceRequest
}) {
  const { t } = useTranslation('')

  const getTechUserInfo = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((item: string) => (
        <Grid container spacing={2} sx={{ margin: '0px' }} key={item}>
          <Grid item sx={{ p: '10px 22px !important' }} xs={12}>
            <Typography variant="label3">* {item}</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Grid spacing={2} margin={'0px'} container>
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
    <>
      <Typography variant="h3">
        {t('content.appdetail.technicalUserSetup.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('content.appdetail.technicalUserSetup.message')}
      </Typography>
      {item.technicalUserProfile &&
        getTechUserInfo(Object.values(item?.technicalUserProfile)[0])}
    </>
  )
}
