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

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
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
      description:
        'descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      headline: 'App Market Card',
      step: 1,
    },
    {
      description:
        'App Page descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: 'App Page',
      step: 2,
    },
    {
      description:
        'Contrac & Consent descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: 'Contract & Consent',
      step: 3,
    },
    {
      description:
        'Technical Integration descsription consetetur sadipscing elitr Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: 'Technical Integration',
      step: 4,
    },
    {
      description:
        'Beta Test descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: 'Beta Test',
      step: 5,
    },
    {
      description:
        'Validate & Publish descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      headline: 'Validate & Publish',
      step: 6,
    },
  ]

  const onStartClick = () => {
    navigate(`/${PAGES.APPRELEASEPROCESS}/form`)
    dispatch(setCurrentActiveStep())
    dispatch(setAppId(''))
    dispatch(setAppStatus(initialState.appStatusData))
  }

  const onOverviewButton = () => {
    // do nothing
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
