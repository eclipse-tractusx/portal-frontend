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

import {
  currentActiveStep,
  setCurrentActiveStep,
} from 'features/appManagement/slice'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReleaseProcessWrapper from 'components/shared/basic/ReleaseProcess/ReleaseProcessWrapper'

export default function ServiceReleaseProcessForm() {
  const navigate = useNavigate()
  const { t } = useTranslation('servicerelease')
  let activePage = useSelector(currentActiveStep)
  const dispatch = useDispatch()

  const onAppsOverviewClick = () => {
    navigate(`/appoverview`)
    dispatch(setCurrentActiveStep())
  }

  const stepsList = [
    {
      headline: t('stepper.marketCard'),
      step: 1,
    },
    {
      headline: t('stepper.servicePage'),
      step: 2,
    },
    {
      headline: t('stepper.contractAndConsent'),
      step: 3,
    },
    {
      headline: t('stepper.validateAndPublish'),
      step: 4,
    },
  ]

  return (
    <ReleaseProcessWrapper
      processType="servicerelease"
      onAppsOverviewClick={() => onAppsOverviewClick()}
      activePage={activePage}
      stepsList={stepsList}
      numberOfSteps={4}
      pageHeaderTitle={t('content.apprelease.headerTitle')}
      headerTitle={t('content.apprelease.submitApp.headerTitle')}
      headerDescription={t('content.apprelease.submitApp.headerDescription')}
      headerDescriptionComplete={t(
        'content.apprelease.submitApp.headerDescriptionComplete'
      )}
      yourCatenaXTeam={t('content.apprelease.submitApp.yourCatenaXTeam')}
      myAppsOverview={t('content.apprelease.submitApp.myAppsOverview')}
    />
  )
}
