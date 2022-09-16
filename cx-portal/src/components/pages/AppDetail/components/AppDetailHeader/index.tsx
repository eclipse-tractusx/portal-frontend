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

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppDetails } from 'features/apps/details/types'
import { getAppLeadImage } from 'features/apps/mapper'
import { useParams } from 'react-router-dom'
import './AppDetailHeader.scss'
import { fetch } from 'features/apps/details/actions'
import { itemSelector } from 'features/apps/details/slice'
import { userSelector } from 'features/user/slice'

export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function AppDetailHeader({ item }: AppDetailHeaderProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { appId } = useParams()
  const user = useSelector(userSelector)
  const appData = useSelector(itemSelector)

  useEffect(() => {
    dispatch(fetch(appId!))
  }, [dispatch, appId])

  const getSubscribeBtn = () => {
    const subscribeStatus = appData.isSubscribed
    if (subscribeStatus === 'PENDING') {
      return <Button color="secondary">{t('content.appdetail.pending')}</Button>
    } else if (subscribeStatus === 'ACTIVE') {
      return (
        <Button color="success">{t('content.appdetail.subscribed')}</Button>
      )
    } else {
      return (
        <Button
          color={
            user.roles.indexOf('subscribe_apps') !== -1
              ? 'primary'
              : 'secondary'
          }
        >
          {t('content.appdetail.subscribe')}
        </Button>
      )
    }
  }

  return (
    <div className="appdetail-header">
      <div className="lead-image">
        <img src={getAppLeadImage(item)} alt={item.title} />
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
          <Typography variant="caption" className="head">
            {t('content.appdetail.usecase')}:{' '}
          </Typography>
          {item.useCases.map((useCase) => (
            <span key={useCase}> {useCase} </span>
          ))}
        </div>
        <div className="language">
          <Typography variant="caption" className="head">
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
