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

import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function EmptyFavorites() {
  const { t } = useTranslation()

  return (
    <div
      style={{
        width: '712px',
        height: '382px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '20px',
      }}
    >
      <div style={{ width: 'fit-content', margin: 'auto' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.5',
            margin: 'auto',
            width: 'fit-content',
          }}
        >
          {t('content.appstore.favoriteSection.myFavorite')}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: '400',
            fontSize: '24px',
            lineHeight: '1.5',
            margin: '30px auto',
            width: '580px',
          }}
        >
          {t('content.appstore.favoriteSection.noFavoriteDescription')}
        </Typography>
      </div>
    </div>
  )
}
