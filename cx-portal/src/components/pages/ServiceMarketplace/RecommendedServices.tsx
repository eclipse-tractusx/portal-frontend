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

import { CardHorizontal } from 'cx-portal-shared-components'
import { Grid, useTheme, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import './ServiceMarketplace.scss'

export default function RecommendedServices({
  services,
}: {
  services: ServiceRequest[]
}) {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  return (
    <div>
      {services && services.length ? (
        <Grid className="recommended-section">
          {services.map((service: any) => (
            <Grid className="recommended-card">
              <CardHorizontal
                borderRadius={6}
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
