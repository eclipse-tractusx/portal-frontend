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

import { useDispatch } from 'react-redux'
import { Typography, Button } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import type { AppDetails } from 'features/apps/details/types'
import './style.scss'
import { OVERLAYS, ROLES } from 'types/Constants'
import { show } from 'features/control/overlay'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import type { UseCaseType } from 'features/appManagement/types'
import { userHasPortalRole } from 'services/AccessService'
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

export default function AppDetailHeader({
  item,
}: Readonly<AppDetailHeaderProps>) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

  useEffect(() => {
    return () => {
      dispatch(resetDialog())
    }
  }, [dispatch])

  const getSubscribeBtn = () => (
    <Button
      color="primary"
      className="subscribe-btn"
      disabled={!userHasPortalRole(ROLES.SUBSCRIBE_APP_MARKETPLACE)}
      onClick={() =>
        dispatch(show(OVERLAYS.APPMARKETPLACE_REQUEST, appId ?? item.id))
      }
    >
      {t('content.appdetail.subscribe')}
    </Button>
  )

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
            {item.languages?.map((lang: string, index: number) => (
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
