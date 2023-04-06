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
import { Button, Typography, Tooltips } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppDetails } from 'features/apps/details/types'
import { userSelector } from 'features/user/slice'
import './AppDetailHeader.scss'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import { UseCaseType } from 'features/appManagement/types'

export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function AppDetailHeader({ item }: AppDetailHeaderProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const user = useSelector(userSelector)
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

  const getSubscribeBtn = () => {
    const subscribeStatus = item.isSubscribed
    if (subscribeStatus === 'PENDING') {
      return (
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="bottom-start"
          tooltipText={t('content.appdetail.pendingTooltip')}
          children={
            <span>
              <Button color="secondary">
                {t('content.appdetail.pending')}
              </Button>
            </span>
          }
        />
      )
    } else if (subscribeStatus === 'ACTIVE') {
      return (
        <Tooltips
          additionalStyles={{
            cursor: 'pointer',
            marginTop: '30px !important',
          }}
          tooltipPlacement="bottom-start"
          tooltipText={t('content.appdetail.subscribedTooltip')}
          children={
            <span>
              <Button color="success">
                {t('content.appdetail.subscribed')}
              </Button>
            </span>
          }
        />
      )
    } else {
      return (
        <Button
          color={
            user.roles.indexOf('subscribe_apps') !== -1
              ? 'primary'
              : 'secondary'
          }
          onClick={() => dispatch(show(OVERLAYS.APPMARKETPLACE_REQUEST, appId))}
        >
          {t('content.appdetail.subscribe')}
        </Button>
      )
    }
  }

  useEffect(() => {
    if (item?.leadPictureId) {
      const id = CommonService.isValidPictureId(item?.leadPictureId)
      getImage(id)
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
        <Typography variant="body2" className="provider">
          {item.provider}
        </Typography>
        <Typography variant="h4" className="heading">
          {item.title}
        </Typography>
        <div className="rating">
          {/*
          <Rating defaultRating={item.rating} />
          <span className="rating-number">{item.rating}</span>
          */}
        </div>
        <Typography variant="body2" className="price">
          {item.price}
        </Typography>
        <div className="usecase">
          <Typography variant="caption2" className="head">
            {t('content.appdetail.usecase')}:{' '}
          </Typography>
          {item.useCases.map((useCase: UseCaseType) => (
            <span key={useCase.id}> {useCase.label} </span>
          ))}
        </div>
        <div className="language">
          <Typography variant="caption2" className="head">
            {t('content.appdetail.language')}:{' '}
          </Typography>
          {item.languages?.map((lang, index) => (
            <span key={lang}>{(index ? ', ' : '') + lang}</span>
          ))}
        </div>
        {getSubscribeBtn()}
      </div>
    </div>
  )
}
