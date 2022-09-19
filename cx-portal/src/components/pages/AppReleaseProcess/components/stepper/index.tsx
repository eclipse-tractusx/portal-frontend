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

import { Stepper } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function AppReleaseStepper({
  activePage,
}: {
  activePage: number
}) {
  const { t } = useTranslation()

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
      headline: t('content.apprelease.stepper.betaTest'),
      step: 5,
    },
    {
      headline: t('content.apprelease.stepper.validateAndPublish'),
      step: 6,
    },
  ]

  return <Stepper list={stepsList} showSteps={6} activeStep={activePage} />
}
