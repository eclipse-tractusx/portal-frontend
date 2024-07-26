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
import { Cards, Button, Typography } from '@catena-x/portal-shared-components'
import { useNavigate } from 'react-router-dom'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import { fetchImageWithToken } from 'services/ImageService'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import type { RootState } from 'features/store'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const isHeaderNote = useSelector((state: RootState) => state.home.headerNote)

  return (
    <section className="app-store-section">
      <Typography variant="h2" className="section-title">
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
        />
      )}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
      >
        <div>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            size="small"
            disabled={isHeaderNote}
            onClick={() => {
              navigate('/appmarketplace')
            }}
          >
            {t('pages.appmarketplace')}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            size="small"
            disabled={isHeaderNote}
            onClick={() => {
              navigate('/servicemarketplace')
            }}
          >
            {t('pages.servicemarketplace')}
          </Button>
        </div>
      </Stack>
    </section>
  )
}
