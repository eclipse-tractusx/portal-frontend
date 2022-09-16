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

import { useTranslation } from 'react-i18next'
import { Cards, Button, Typography } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import { useFetchLatestAppsQuery } from 'features/apps/apiSliceTest'
import { appToCard } from 'features/apps/mapper'
import './app-store-section.scss'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchLatestAppsQuery()
  const items = data?.map((app) => appToCard(app)) || []

  return (
    <section className="app-store-section">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h3"
        className="section-title"
      >
        {t('content.home.appStoreSection.title')}
      </Typography>
      <Cards
        items={items} // TODO: Replace from api
        columns={4}
        buttonText="Details"
        imageSize="small"
        imageShape="round"
        variant="compact"
        expandOnHover={false}
        filledBackground={true}
      />
      <Button
        sx={{ margin: '100px auto 60px', display: 'block' }}
        onClick={() => navigate('/appmarketplace')}
      >
        {t('pages.appmarketplace')}
      </Button>
    </section>
  )
}
