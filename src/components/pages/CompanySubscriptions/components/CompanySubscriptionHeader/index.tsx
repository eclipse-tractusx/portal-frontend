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

import {
  Button,
  Image,
  LogoGrayData,
  Typography,
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UnpublishedIcon from '@mui/icons-material/Unpublished'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { type AppDetails, SubscriptionStatus } from 'features/apps/types'
import CommonService from 'services/CommonService'
import { fetchImageWithToken } from 'services/ImageService'
import { getApiBase } from 'services/EnvironmentService'

export default function CompanySubscriptionHeader({
  detail,
}: {
  detail: AppDetails
}) {
  const { t } = useTranslation()
  const [docId, setDocId] = useState('')

  useEffect(() => {
    if (detail.leadPictureId) {
      const id = CommonService.isValidPictureId(detail.leadPictureId)
      setDocId(id)
    }
  }, [detail])

  const renderStatusButton = (status: string) => {
    if (status === SubscriptionStatus.ACTIVE)
      return (
        <Button
          startIcon={<CheckCircleOutlineIcon />}
          size="small"
          sx={{
            backgroundColor: '#B3CB2D',
            pointerEvents: 'none',
            float: 'right',
            textTransform: 'none',
          }}
        >
          {t('content.companySubscriptionsDetail.subscribed')}
        </Button>
      )
    else if (status === SubscriptionStatus.PENDING)
      return (
        <Button
          size="small"
          sx={{
            backgroundColor: '#FFA600',
            pointerEvents: 'none',
            float: 'right',
            borderColor: '#FFA600',
            textTransform: 'none',
          }}
          startIcon={<HourglassEmptyIcon />}
        >
          {t('content.companySubscriptionsDetail.requested')}
        </Button>
      )
    else
      return (
        <Button
          startIcon={<UnpublishedIcon />}
          size="small"
          sx={{
            backgroundColor: '#D91E18',
            pointerEvents: 'none',
            float: 'right',
            textTransform: 'none',
          }}
        >
          {t('content.companySubscriptionsDetail.declined')}
        </Button>
      )
  }

  return (
    <Box className="company-subscription-header">
      <div className="lead-image">
        <Image
          src={
            detail?.id && docId
              ? `${getApiBase()}/api/apps/${detail.id}/appDocuments/${docId}`
              : LogoGrayData
          }
          alt={detail.title}
          loader={fetchImageWithToken}
        />
      </div>
      <Box className="content">
        <div>
          <Typography variant="h5">{detail.provider}</Typography>
          <Typography variant="h4">{detail.title}</Typography>
        </div>
        <Typography variant="label2">
          {t('content.companySubscriptionsDetail.language')}:
          <Typography variant="caption2" sx={{ pb: 2, ml: 1 }}>
            {!!detail.languages.length
              ? detail.languages.map((lang, index) => (
                  <span key={lang}>
                    {` ${index ? ', ' : ''}${lang.toUpperCase()} `}
                  </span>
                ))
              : ''}
          </Typography>
        </Typography>
      </Box>
      <Box>{renderStatusButton(detail.isSubscribed)}</Box>
    </Box>
  )
}
