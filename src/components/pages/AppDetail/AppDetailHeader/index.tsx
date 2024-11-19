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

import { useDispatch, useSelector } from 'react-redux'
import {
  Typography,
  OrderStatusButton,
  paletteDefinitions,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import type { AppDetails } from 'features/apps/details/types'
import './style.scss'
import { OVERLAYS, ROLES } from 'types/Constants'
import { show } from 'features/control/overlay'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SubscriptionStatus } from 'features/apps/types'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import type { UseCaseType } from 'features/appManagement/types'
import { userHasPortalRole } from 'services/AccessService'
import type { RootState } from 'features/store'
import { resetDialog } from 'features/overlay/slice'
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
  const isDialogConfirmed = useSelector(
    (state: RootState) => state?.dialog?.isConfirmed
  )

  const { appId } = useParams()
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()
  const [buttonLabel, setButtonLabel] = useState(
    t('content.appdetail.subscribe')
  )

  const getStatusLabel = (subscribeStatus: string) => {
    if (subscribeStatus === SubscriptionStatus.PENDING) {
      setButtonLabel(t('content.appdetail.requested'))
    } else if (subscribeStatus === SubscriptionStatus.ACTIVE) {
      setButtonLabel(t('content.appdetail.subscribed'))
    } else {
      setButtonLabel(t('content.appdetail.subscribe'))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetDialog())
    }
  }, [dispatch])

  useEffect(() => {
    if (isDialogConfirmed) {
      setButtonLabel(t('content.appdetail.requested'))
    }
  }, [isDialogConfirmed])

  useEffect(() => {
    getStatusLabel(item.isSubscribed ?? SubscriptionStatus.INACTIVE)
  }, [])

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
          color: userHasPortalRole(ROLES.SUBSCRIBE_APP_MARKETPLACE)
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
        label={buttonLabel}
        color={btnColor.color}
        buttonData={OrderStatusButtonItems}
        selectable={
          subscribeStatus === SubscriptionStatus.INACTIVE &&
          userHasPortalRole(ROLES.SUBSCRIBE_APP_MARKETPLACE)
        }
        onButtonClick={() => {
          if (buttonLabel === t('content.appdetail.requested')) {
            return
          }
          return (
            subscribeStatus === SubscriptionStatus.INACTIVE &&
            userHasPortalRole(ROLES.SUBSCRIBE_APP_MARKETPLACE) &&
            dispatch(show(OVERLAYS.APPMARKETPLACE_REQUEST, appId))
          )
        }}
      />
    )
  }

  useEffect(() => {
    if (item?.leadPictureId) {
      const id = CommonService.isValidPictureId(item?.leadPictureId)
      void getImage(id)
    }
  }, [])

  const getImage = async (documentId: string) => {
    try {
      const response = await fetchDocumentById({
        appId: item.id,
        documentId,
      }).unwrap()
      const file = response.data
      setImage(URL.createObjectURL(file))
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
        <Typography variant="caption2" sx={{ pb: '6px' }}>
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
        <Typography variant="caption1" sx={{ mb: 1, display: 'inherit' }}>
          {item.price}
        </Typography>
        <div className="useCase">
          <Typography variant="label2" sx={{ pb: 1 }}>
            {t('content.appdetail.useCase')}:
          </Typography>
          <Typography variant="caption2" sx={{ pb: 1, ml: 1 }}>
            {item.useCases.map((useCase: UseCaseType) => (
              <span key={useCase.id}> {useCase.label} </span>
            ))}
          </Typography>
        </div>
        <div className="useCase">
          <Typography variant="label2">
            {t('content.appdetail.language')}:
          </Typography>
          <Typography variant="caption2" sx={{ pb: 2, ml: 1 }}>
            {item.languages?.map((lang, index) => (
              <span key={lang}>
                {` ${index ? ', ' : ''}${lang.toUpperCase()} `}
              </span>
            ))}
          </Typography>
        </div>
        {getSubscribeBtn()}
      </div>
    </div>
  )
}
