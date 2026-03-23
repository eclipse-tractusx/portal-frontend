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
import {
  Cards,
  Button,
  Typography,
  type CardItems,
} from '@arena2036/portal-shared-components-construct-x'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import { fetchImageWithToken } from 'services/ImageService'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()

  return (
    <section className="app-store-section">
      <Typography
        sx={{ fontFamily: 'Montserrat-Light' }}
        variant="h2"
        className="section-title"
      >
        {t('content.home.appStoreSection.title')}
      </Typography>
      {data && data.length > 0 && (
        <Cards
          items={data?.slice(0, 4).map(CommonService.appToCard)}
          columns={4}
          buttonText="Details"
          imageSize="small"
          imageShape="round"
          variant="compact"
          expandOnHover={false}
          filledBackground={true}
          imageLoader={fetchImageWithToken}
          onCardClick={(item: CardItems) => {
            navigate(`/appdetail/${item.id}`)
          }}
        />
      )}
      <Button
        sx={{ margin: '100px auto 60px', display: 'block' }}
        onClick={() => {
          navigate('/appMarketplace')
        }}
      >
        {t('pages.appMarketplace')}
      </Button>
    </section>
  )
}
