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

import { useDispatch } from 'react-redux'
import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ServiceRequest } from 'features/serviceMarketplace/serviceApiSlice'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS, ROLES } from 'types/Constants'
import UserService from 'services/UserService'
import './MarketplaceHeader.scss'
import { setSuccessType } from 'features/serviceMarketplace/slice'

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
          {t('content.appdetail.subscribe')}
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

  return (
    <div className="marketplace-header">
      <div className="content">
        <Typography variant="body2" className="provider">
          {item.provider}
        </Typography>
        <Typography variant="h4" className="heading">
          {item.title}
        </Typography>
        <Typography variant="body2" className="price">
          {item.price}
        </Typography>
        {getSubscribeBtn()}
      </div>
    </div>
  )
}
