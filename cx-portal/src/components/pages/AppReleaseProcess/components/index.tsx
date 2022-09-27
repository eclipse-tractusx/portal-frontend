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

import { PageHeader } from 'cx-portal-shared-components'
import { currentActiveStep } from 'features/appManagement/slice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import AppMarketCard from './AppMarketCard'
import AppPage from './AppPage'
import BetaTest from './BetaTest'
import ContractAndConsent from './ContractAndConsent'
import AppReleaseStepper from './stepper'
import TechnicalIntegration from './TechnicalIntegration'
import ValidateAndPublish from './ValidateAndPublish'
import './ReleaseProcessSteps.scss'

export default function AppReleaseProcessForm() {
  const { t } = useTranslation()
  let activePage = useSelector(currentActiveStep)

  useEffect(() => {
    activeStep()
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage])

  const activeStep = () => {
    if (activePage === 1) return <AppMarketCard />
    else if (activePage === 2) return <AppPage />
    else if (activePage === 3) return <ContractAndConsent />
    else if (activePage === 4) return <TechnicalIntegration />
    else if (activePage === 5) return <BetaTest />
    else if (activePage === 6) return <ValidateAndPublish />
  }

  return (
    <div className="app-release-process-form">
      <PageHeader
        title={t('content.apprelease.headerTitle')}
        topPage={true}
        headerHeight={200}
      />
      <div className="create-app-section">
        <div className="container">
          <AppReleaseStepper activePage={activePage} />
          {activeStep()}
        </div>
      </div>
    </div>
  )
}
