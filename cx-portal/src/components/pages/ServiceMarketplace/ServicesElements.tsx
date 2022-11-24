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

import { CardHorizontal, PageNotifications } from 'cx-portal-shared-components'
import { Grid, useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFetchServicesQuery } from 'features/serviceMarketplace/serviceApiSlice'
import './ServiceMarketplace.scss'

export default function ServicesElements() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  const { data } = useFetchServicesQuery(0)
  const services = data && data.content

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  if (services && services.length === 0) {
    return (
      <div className="marketplace-section">
        <PageNotifications
          description={t('content.serviceMarketplace.noDataMessage')}
          onCloseNotification={function noRefCheck() {}}
          open
          severity="error"
          showIcon
          title="Error"
        />
      </div>
    )
  }

  return (
    <div className="marketplace-section">
      {services && services.length ? (
        <Grid >
          {services.map((service: any) => (
            <Grid >
              <CardHorizontal
                borderRadius={0}
                imageAlt="App Card"
                imagePath={service.leadPictureUri}
                label={service.provider}
                buttonText="Details"
                onBtnClick={() => handleClick(service.id)}
                title={service.title}
                backgroundColor="#f7f7f7"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="service-progress">
          <CircularProgress
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      )}
    </div>
  )
}
