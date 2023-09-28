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

import { useSelector, useDispatch } from 'react-redux'
import {
  Typography,
  OrderStatusButton,
  paletteDefinitions,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import type { AppDetails } from 'features/apps/details/types'
import { userSelector } from 'features/user/slice'
import './AppDetailHeader.scss'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  SubscriptionStatus,
  useFetchDocumentByIdMutation,
} from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import type { UseCaseType } from 'features/appManagement/types'

enum Roles {
  SUBSCRIBE_APPS = 'subscribe_apps',
  SUBSCRIBE_SERVICE = 'subscribe_service',
}

export interface AppDetailHeaderProps {
  item: AppDetails
}

export interface ButtonColorType {
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning'
  background1: string
  background2: string
  background3: string
}

export default function AppDetailHeader({ item }: AppDetailHeaderProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const user = useSelector(userSelector)
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

  const getStatusLabel = (subscribeStatus: string) => {
    if (subscribeStatus === SubscriptionStatus.PENDING) {
      return t('content.appdetail.requested')
    } else if (subscribeStatus === SubscriptionStatus.ACTIVE) {
      return t('content.appdetail.subscribed')
    } else {
      return t('content.appdetail.subscribe')
    }
  }

  const getBtnColor = (subscribeStatus: string) => {
    let btnColor: ButtonColorType
    switch (subscribeStatus) {
      case SubscriptionStatus.ACTIVE:
        btnColor = {
          color: 'success',
          background1: paletteDefinitions.buttons.yellow ?? '',
          background2: paletteDefinitions.buttons.yellow ?? '',
          background3: paletteDefinitions.buttons.yellow ?? '',
        }
        break
      case SubscriptionStatus.PENDING:
        btnColor = {
          color: 'warning',
          background1: paletteDefinitions.buttons.yellow ?? '',
          background2: paletteDefinitions.buttons.lightGrey ?? '',
          background3: paletteDefinitions.buttons.white ?? '',
        }
        break
      default:
        btnColor = {
          color:
            user.roles.indexOf(Roles.SUBSCRIBE_APPS) !== -1 &&
            user.roles.indexOf(Roles.SUBSCRIBE_SERVICE) !== -1
              ? 'primary'
              : 'secondary',
          background1: paletteDefinitions.buttons.darkGrey ?? '',
          background2: paletteDefinitions.buttons.lightGrey ?? '',
          background3: paletteDefinitions.buttons.white ?? '',
        }
    }
    return btnColor
  }

  const getSubscribeBtn = () => {
    const subscribeStatus = item.isSubscribed ?? SubscriptionStatus.INACTIVE
    const btnColor = getBtnColor(subscribeStatus)
    const OrderStatusButtonItems = [
      {
        isIcon: subscribeStatus === SubscriptionStatus.INACTIVE ? false : true,
        buttonLabel: t('content.appdetail.buttons.subscribtionInit'),
        zIndex: 4,
        backgroundColor: btnColor.background1,
      },
      {
        isIcon: subscribeStatus !== SubscriptionStatus.ACTIVE ? false : true,
        buttonLabel: t('content.appdetail.buttons.appDeployed'),
        zIndex: 3,
        backgroundColor: btnColor.background2,
      },
      {
        isIcon: subscribeStatus !== SubscriptionStatus.ACTIVE ? false : true,
        buttonLabel: t('content.appdetail.buttons.activation'),
        zIndex: 2,
        backgroundColor: btnColor.background3,
      },
    ]

    return (
      <OrderStatusButton
        label={getStatusLabel(subscribeStatus)}
        color={btnColor.color}
        buttonData={OrderStatusButtonItems}
        selectable={
          subscribeStatus === SubscriptionStatus.INACTIVE &&
          user.roles.indexOf(Roles.SUBSCRIBE_APPS) !== -1 &&
          user.roles.indexOf(Roles.SUBSCRIBE_SERVICE) !== -1
            ? true
            : false
        }
        onButtonClick={() =>
          subscribeStatus === SubscriptionStatus.INACTIVE &&
          user.roles.indexOf(Roles.SUBSCRIBE_APPS) !== -1 &&
          user.roles.indexOf(Roles.SUBSCRIBE_SERVICE) !== -1 &&
          dispatch(show(OVERLAYS.APPMARKETPLACE_REQUEST, appId))
        }
      />
    )
  }

  useEffect(() => {
    if (item?.leadPictureId) {
      const id = CommonService.isValidPictureId(item?.leadPictureId)
      void getImage(id)
    }
    // eslint-disable-next-line
  }, [])

  const getImage = async (documentId: string) => {
    try {
      const response = await fetchDocumentById({
        appId: item.id,
        documentId,
      }).unwrap()
      const file = response.data
      return setImage(URL.createObjectURL(file))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="appdetail-header">
      <div className="lead-image">
        <img src={image} alt={item.title} />
      </div>
      <div className="content">
        <Typography variant="h5" sx={{ pb: '6px', color: '#888888' }}>
          {item.provider}
        </Typography>
        <Typography variant="h2" sx={{ pb: '8px', lineHeight: '48px' }}>
          {item.title}
        </Typography>
        <div className="rating">
          {/*
          <Rating defaultRating={item.rating} />
          <span className="rating-number">{item.rating}</span>
          */}
        </div>
        <Typography variant="body2" sx={{ pb: 1 }}>
          {item.price}
        </Typography>
        <Typography variant="body2" sx={{ pb: 1 }}>
          {t('content.appdetail.usecase')}:
          {item.useCases.map((useCase: UseCaseType) => (
            <span key={useCase.id}> {useCase.label} </span>
          ))}
        </Typography>
        <Typography variant="body2" sx={{ pb: '18px' }}>
          {t('content.appdetail.language')}:
          {item.languages?.map((lang, index) => (
            <span key={lang}> {(index ? ', ' : '') + lang} </span>
          ))}
        </Typography>
        {getSubscribeBtn()}
      </div>
    </div>
  )
}
