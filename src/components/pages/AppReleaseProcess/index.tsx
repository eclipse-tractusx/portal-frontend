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
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/cfx/Constants'
import { setCurrentActiveStep } from 'features/appManagement/slice'
import { useDispatch } from 'react-redux'
import { setAppId, setAppStatus } from 'features/appManagement/actions'
import { initialState } from 'features/appManagement/types'
import { ReleaseProcess } from 'components/shared/basic/ReleaseProcess'

export default function AppReleaseProcess() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const stepsLists = [
    {
      description: t('content.apprelease.stepperDescription.appMarketCard'),
      headline: t('content.apprelease.stepperHeadline.appMarketCard'),
      step: 1,
    },
    {
      description: t('content.apprelease.stepperDescription.appPage'),
      headline: t('content.apprelease.stepperHeadline.appPage'),
      step: 2,
    },
    {
      description: t(
        'content.apprelease.stepperDescription.contractAndConsent'
      ),
      headline: t('content.apprelease.stepperHeadline.contractAndConsent'),
      step: 3,
    },
    {
      description: t(
        'content.apprelease.stepperDescription.technicalIntegration'
      ),
      headline: t('content.apprelease.stepperHeadline.technicalIntegration'),
      step: 4,
    },
    {
      description: t('content.apprelease.stepperDescription.betaTest'),
      headline: t('content.apprelease.stepperHeadline.betaTest'),
      step: 5,
    },
    {
      description: t(
        'content.apprelease.stepperDescription.validateAndPublish'
      ),
      headline: t('content.apprelease.stepperHeadline.validateAndPublish'),
      step: 6,
    },
  ]

  const onStartClick = () => {
    navigate(`/${PAGES.APP_RELEASE_PROCESS}/form`)
    dispatch(setCurrentActiveStep())
    dispatch(setAppId(''))
    dispatch(setAppStatus(initialState.appStatusData))
  }

  const onOverviewButton = () => {
    navigate(`/${PAGES.APP_OVERVIEW}`)
  }

  const requirements = [
    {
      neuButton: t('content.apprelease.neuButton'),
      marketplaceTitle: t('content.apprelease.marketplaceTitle'),
      marketplaceExplanation: t('content.apprelease.marketplaceExplanation'),
      index: 1,
    },
    {
      neuButton: t('content.apprelease.neuButton'),
      marketplaceTitle: t('content.apprelease.marketplaceTitle'),
      marketplaceExplanation: t('content.apprelease.marketplaceExplanation'),
      index: 2,
    },
  ]

  return (
    <ReleaseProcess
      onStartClick={onStartClick}
      onOverviewButton={onOverviewButton}
      stepsLists={stepsLists}
      headerTitle={t('content.apprelease.headerTitle')}
      headerDescription={t('content.apprelease.headerDescription')}
      descHeading={t('content.apprelease.descHeading')}
      descMessage={t('content.apprelease.descMessage')}
      overviewButton={t('content.apprelease.overviewButton')}
      stepHeading={t('content.apprelease.stepHeading')}
      dividerText={t('content.apprelease.dividerText')}
      startCreatingButton={t('content.apprelease.startCreatingButton')}
      marketplaceHeading={t('content.apprelease.marketplaceHeading')}
      requirements={requirements}
      elementNumbers={6}
      registerButton={t('content.apprelease.registerButton')}
    />
  )
}
