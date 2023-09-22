/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useDispatch } from 'react-redux'
import { Button, Typography } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import type { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import { show } from 'features/control/overlay'
import { OVERLAYS, ROLES } from 'types/Constants'
import UserService from 'services/UserService'
import './MarketplaceHeader.scss'
import { setSuccessType } from 'features/serviceMarketplace/slice'
import { getAssetBase } from 'services/EnvironmentService'
import { Box } from '@mui/material'

export default function MarketplaceHeader({
  item,
  success,
}: {
  item: ServiceRequest
  success: boolean
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { serviceId } = useParams()

  const getSubscribeBtn = () => {
    if (success) {
      setTimeout(() => {
        dispatch(setSuccessType(false))
      }, 5000)
      return (
        <Button
          color="success"
          className="subscribe-btn"
          onClick={() => console.log('click function')}
        >
          {t('content.appdetail.subscribed')}
        </Button>
      )
    } else {
      return (
        <Button
          color="primary"
          className="subscribe-btn"
          disabled={
            UserService.hasRole(ROLES.SUBSCRIBE_SERVICE_MARKETPLACE)
              ? false
              : true
          }
          onClick={() => dispatch(show(OVERLAYS.SERVICE_REQUEST, serviceId))}
        >
          {t('content.appdetail.subscribe')}
        </Button>
      )
    }
  }

  const getAllServices = (serviceTypeIds: string[]) => {
    const newArr: string[] = []

    serviceTypeIds?.forEach((serviceType: string) => {
      if (serviceType === 'CONSULTANCE_SERVICE')
        newArr.push('Consultance Service')
      if (serviceType === 'DATASPACE_SERVICE') newArr.push('Dataspace Service')
    })
    return newArr.join(', ')
  }

  return (
    <div className="service-marketplace-header">
      <div className="lead-image">
        <img
          src={`${getAssetBase()}/images/content/ServiceMarketplace.png`}
          alt={item.title}
        />
      </div>
      <Box className="marketplace-app-content">
        <Typography variant="h5" sx={{ pb: '6px', color: '#888888' }}>
          {item.provider}
        </Typography>
        <Typography variant="h2" sx={{ pb: '8px', lineHeight: '48px' }}>
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ pb: '2px' }}>
          {getAllServices(item.serviceTypes)}
        </Typography>
        <Typography variant="body2" sx={{ pb: '18px' }}>
          {item.price}
        </Typography>
        {getSubscribeBtn()}
      </Box>
    </div>
  )
}
