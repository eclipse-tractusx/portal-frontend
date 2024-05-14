/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
import { PAGES } from 'types/Constants'
import { useDispatch } from 'react-redux'
import { ReleaseProcess } from 'components/shared/basic/ReleaseProcess'
import {
  setServiceId,
  setServiceStatus,
} from 'features/serviceManagement/actions'
import { initialState } from 'features/serviceManagement/types'
import { setServiceReleaseActiveStep } from 'features/serviceManagement/slice'

export default function ServiceReleaseProcess() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const processStepsLists = [
    {
      description:
        'descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      headline: t('stepper.marketCard'),
      step: 1,
    },
    {
      description:
        'App Page descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: t('stepper.servicePage'),
      step: 2,
    },
    {
      description:
        'Contrac & Consent descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: t('stepper.contractAndConsent'),
      step: 3,
    },
    {
      description:
        'Technical Integration descsription consetetur sadipscing elitr Lorem ipsum dolor sit amet, consetetur sadipscing elitr.',
      headline: t('stepper.technicalIntegration'),
      step: 4,
    },
    {
      description:
        'Validate & Publish descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
      headline: t('stepper.validateAndPublish'),
      step: 5,
    },
  ]

  const onStartServiceClick = () => {
    navigate(`/${PAGES.SERVICERELEASEPROCESS}/form`)
    dispatch(setServiceReleaseActiveStep())
    dispatch(setServiceId(''))
    dispatch(setServiceStatus(initialState.serviceStatusData))
  }

  const onOverviewServiceButton = () => {
    navigate('/serviceoverview')
  }

  const requeredButtons = [
    {
      neuButton: t('requiredButton'),
      marketplaceTitle: t('requiredtitle'),
      marketplaceExplanation: t('requiredExplaination'),
      index: 1,
    },
    {
      neuButton: t('requiredButton'),
      marketplaceTitle: t('requiredtitle'),
      marketplaceExplanation: t('requiredExplaination'),
      index: 2,
    },
  ]

  return (
    <ReleaseProcess
      headerTitle={t('headerTitle')}
      descHeading={t('descHeading')}
      descMessage={t('descMessage')}
      overviewButton={t('overviewButton')}
      stepHeading={t('stepHeading')}
      dividerText={t('dividerText')}
      registerButton={t('registerButton')}
      startCreatingButton={t('startCreatingButton')}
      marketplaceHeading={t('marketplaceHeading')}
      requirements={requeredButtons}
      elementNumbers={5}
      onStartClick={onStartServiceClick}
      onOverviewButton={onOverviewServiceButton}
      stepsLists={processStepsLists}
    />
  )
}
