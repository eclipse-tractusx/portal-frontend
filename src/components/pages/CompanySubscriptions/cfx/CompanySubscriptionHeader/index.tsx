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
import { type AppDetails, SubscriptionStatus } from 'features/apps/types'
import { fetchImageWithToken } from 'services/ImageService'
import { type ServiceDetailsResponse } from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import './style.scss'
import { useSearchParams } from 'react-router-dom'
import { SEARCH_PARAMS } from 'types/cfx/Constants'
import { ServiceTypeIdsEnum } from 'features/serviceManagement/apiSlice'

export default function CompanySubscriptionHeader({
  detail,
  src,
  status,
}: Readonly<{
  detail: AppDetails | ServiceDetailsResponse
  src: string
  status: string
}>) {
  const { t } = useTranslation()
  const st = useTranslation('servicerelease').t
  const [searchParams] = useSearchParams()

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

  const getAllServices = (serviceTypes: string[]) => {
    const newArr: string[] = []
    serviceTypes?.forEach((serviceType: string) => {
      if (serviceType === ServiceTypeIdsEnum.CONSULTANCY_SERVICE)
        newArr.push(st('consultancyService'))
      if (serviceType === ServiceTypeIdsEnum.DATASPACE_SERVICE)
        newArr.push(st('dataspaceService'))
    })
    return newArr.join(', ')
  }

  return (
    <Box className="company-subscription-header">
      <div className="lead-image">
        <Image
          src={src ?? LogoGrayData}
          alt={detail.title}
          loader={fetchImageWithToken}
        />
      </div>
      <Box className="content">
        <Typography variant="caption2" sx={{ pb: '6px' }}>
          {detail.provider}
        </Typography>
        <Typography variant="h2" sx={{ pb: '8px', lineHeight: '48px' }}>
          {detail.title}
        </Typography>

        {searchParams.get(SEARCH_PARAMS.IS_APP) === 'true' ? (
          <div className="useCase">
            <Typography variant="label2">
              {t('content.companySubscriptionsDetail.language')}:
              <Typography variant="caption2" sx={{ pb: 2, ml: 1 }}>
                {detail?.languages?.length
                  ? detail.languages.map((lang, index) => (
                      <span key={lang}>
                        {` ${index ? ', ' : ''}${lang.toUpperCase()} `}
                      </span>
                    ))
                  : ''}
              </Typography>
            </Typography>
          </div>
        ) : (
          <Typography variant="body2">
            {getAllServices((detail as ServiceDetailsResponse)?.serviceTypes)}
          </Typography>
        )}
        <Box display={'flex'} mt={2}>
          {renderStatusButton(status)}
        </Box>
      </Box>
    </Box>
  )
}
