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
import { Cards, Button, Typography } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import './app-store-section.scss'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import { useState, useEffect } from 'react'
import CommonService from 'services/CommonService'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const [cardsData, setCardsData] = useState<any>([])

  useEffect(() => {
    if (data) {
      const items = data?.filter((app, index) => index < 4)
      const newPromies = CommonService.fetchLeadPictureImage(items)
      Promise.all(newPromies).then((result) => {
        setCardsData(result.flat())
      })
    }
    // eslint-disable-next-line
  }, [data])

  return (
    <section className="app-store-section">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h3"
        className="section-title"
      >
        {t('content.home.appStoreSection.title')}
      </Typography>
      {cardsData && cardsData.length > 0 && (
        <Cards
          items={cardsData}
          columns={4}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
        />
      )}
      <Button
        sx={{ margin: '100px auto 60px', display: 'block' }}
        onClick={() => navigate('/appmarketplace')}
      >
        {t('pages.appmarketplace')}
      </Button>
    </section>
  )
}
