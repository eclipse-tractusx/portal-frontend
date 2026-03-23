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

import { useTranslation } from 'react-i18next'
import { getAssetBase } from 'services/EnvironmentService'
import { SlidingMainHeader } from 'components/shared/frame/SlidingMainHeader/SlidingMainHeader'
import { useNavigate } from 'react-router-dom'
import { userHasPortalRole } from 'services/AccessService'
import { ROLES } from 'types/Constants'

export default function StageSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="stage-home">
      <SlidingMainHeader
        mainHeaderInfo={[
          {
            title: t('content.home.stage.slider1.title'),
            subTitle: t('content.home.stage.slider1.subtitle'),
            imagePath: `${getAssetBase()}/images/frame/home-stage-desktop.jpg`,
            buttonText: t('content.home.stage.slider1.buttonName'),
            handleClick: () => {
              navigate(t('content.home.stage.slider1.navigation'))
            },
            hasAccess: userHasPortalRole(ROLES.APPMANAGEMENT_VIEW),
          },
          {
            title: t('content.home.stage.slider2.title'),
            subTitle: t('content.home.stage.slider2.subtitle'),
            imagePath: `${getAssetBase()}/images/frame/desktop-bg-frame.jpg`,
            buttonText: t('content.home.stage.slider2.buttonName'),
            handleClick: () => {
              navigate(t('content.home.stage.slider2.navigation'))
            },
          },
          {
            title: t('content.home.stage.slider3.title'),
            subTitle: t('content.home.stage.slider3.subtitle'),
            imagePath: `${getAssetBase()}/images/frame/home-stage-desktop.jpg`,
            buttonText: t('content.home.stage.slider3.buttonName'),
            handleClick: () => {
              navigate(t('content.home.stage.slider3.navigation'))
            },
            hasAccess: userHasPortalRole(ROLES.APPSTORE_VIEW),
          },
          {
            title: t('content.home.stage.slider4.title'),
            subTitle: t('content.home.stage.slider4.subtitle'),
            imagePath: `${getAssetBase()}/images/frame/desktop-bg-frame.jpg`,
            buttonText: t('content.home.stage.slider4.buttonName'),
            handleClick: () => {
              navigate(t('content.home.stage.slider4.navigation'))
            },
            hasAccess: userHasPortalRole(ROLES.USERMANAGEMENT_VIEW),
          },
        ]}
        stageHeaderInfo={[
          {
            title: t('content.home.slider1'),
          },
          {
            title: t('content.home.slider2'),
          },
          {
            title: t('content.home.slider3'),
          },
          {
            title: t('content.home.slider4'),
          },
        ]}
      />
    </div>
  )
}
