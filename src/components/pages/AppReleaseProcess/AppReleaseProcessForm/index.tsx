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

import ReleaseProcessWrapper from 'components/shared/basic/ReleaseProcess/components/ReleaseProcessWrapper'
import { setCurrentActiveStep } from 'features/appManagement/slice'
import { ReleaseProcessTypes } from 'features/serviceManagement/apiSlice'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AppReleaseProcessForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onAppsOverviewClick = () => {
    navigate('/appOverview')
    dispatch(setCurrentActiveStep())
  }

  const stepsList = [
    {
      headline: t('content.apprelease.stepper.appMarketCard'),
      step: 1,
    },
    {
      headline: t('content.apprelease.stepper.appPage'),
      step: 2,
    },
    {
      headline: t('content.apprelease.stepper.contractAndConsent'),
      step: 3,
    },
    {
      headline: t('content.apprelease.stepper.technicalIntegration'),
      step: 4,
    },
    {
      headline: t('content.apprelease.stepper.validateAndPublish'),
      step: 5,
    },
  ]

  return (
    <ReleaseProcessWrapper
      processType={ReleaseProcessTypes.APP_RELEASE}
      onAppsOverviewClick={() => {
        onAppsOverviewClick()
      }}
      stepsList={stepsList}
      numberOfSteps={5}
      pageHeaderTitle={t('content.apprelease.headerTitle')}
      headerTitle={t('content.apprelease.submit.headerTitle')}
      headerDescription={t('content.apprelease.submit.headerDescription')}
      headerDescriptionComplete={t(
        'content.apprelease.submit.headerDescriptionComplete'
      )}
      myAppsOverview={t('content.apprelease.submit.overview')}
    />
  )
}
