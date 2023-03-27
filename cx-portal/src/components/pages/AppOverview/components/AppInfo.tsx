/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
import AppProviderInfo from './AppProviderInfo'
import AppDetailImageGallery from 'components/pages/AppDetail/components/AppDetailImageGallery'
import { getAppImage } from 'features/apps/mapper'
import { AppStatusDataState } from 'features/appManagement/types'

export default function AppInfo({
  item,
  id,
}: {
  item: AppStatusDataState
  id: string
}) {
  const { t } = useTranslation()
  return (
    <div>
      {item.descriptions &&
        item.descriptions.map((desc: any) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5">
                [{t('content.appoverview.details.longDescription')} -{' '}
                {desc.languageCode}]
              </Typography>
              <Typography
                sx={{
                  padding: '0px 10px',
                  color: 'text.primary',
                }}
                variant="caption1"
              >
                {desc.longDescription}
              </Typography>
            </div>
          )
        })}
      <div style={{ marginTop: '50px' }}></div>
      <AppProviderInfo item={item} />
      <div style={{ marginTop: '50px' }}></div>
      <AppDetailImageGallery
        images={item.images?.map((image) => getAppImage(id, image)) || []}
      />
    </div>
  )
}
