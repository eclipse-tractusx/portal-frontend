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
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFetchServicesQuery } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'

export default function ServicesElements() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data } = useFetchServicesQuery(0)
  const services = data && data.content

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  return (
    <div className="marketplace-section">
      {services && services.length ? (
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {services.map((service: any) => (
              <Grid item xs={4} key={service.id}>
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
        </Box>
      ) : (
        <PageNotifications
          description={t('content.serviceMarketplace.noDataMessage')}
          onCloseNotification={function noRefCheck() {}}
          open
          severity="error"
          showIcon
          title="Error"
        />
      )}
    </div>
  )
}
