/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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
import { Box, useMediaQuery, useTheme } from '@mui/material'
import {
  ImageGallery,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { type AppDetails } from 'features/apps/types'
import CommonService from 'services/CommonService'
import { type ServiceDetailsResponse } from 'features/serviceSubscription/serviceSubscriptionApiSlice'

export default function CompanySubscriptionContent({
  detail,
}: Readonly<{
  detail: AppDetails | ServiceDetailsResponse
}>) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  })
  return (
    <>
      <Box className="company-subscription-content-section" id="description">
        <Typography variant="h3" sx={{ whiteSpace: 'pre-line' }}>
          {t('content.companySubscriptionsDetail.description')}
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {detail.longDescription}
        </Typography>
      </Box>
      <Box className="company-subscription-content-section" id="image-gallery">
        {detail?.images && (
          <ImageGallery
            gallery={CommonService.imagesAndAppidToImageType(
              detail.images,
              detail.id
            )}
            maxWidth={isMobile ? 150 : undefined}
            modalWidth={isMobile ? '300' : '600'}
          />
        )}
      </Box>
    </>
  )
}
