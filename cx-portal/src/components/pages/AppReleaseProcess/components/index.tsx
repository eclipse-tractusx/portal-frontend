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

import {
  Button,
  MainHeader,
  PageHeader,
  Typography,
} from 'cx-portal-shared-components'
import {
  currentActiveStep,
  setCurrentActiveStep,
} from 'features/appManagement/slice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AppMarketCard from './AppMarketCard'
import AppPage from './AppPage'
import BetaTest from './BetaTest'
import ContractAndConsent from './ContractAndConsent'
import AppReleaseStepper from './stepper'
import TechnicalIntegration from './TechnicalIntegration'
import ValidateAndPublish from './ValidateAndPublish'
import './ReleaseProcessSteps.scss'
import { useNavigate } from 'react-router-dom'

export default function AppReleaseProcessForm() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  let activePage = useSelector(currentActiveStep)
  const [showSubmitPage, setShowSubmitPage] = useState(false)
  const dispatch = useDispatch()

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
    else if (activePage === 6)
      return <ValidateAndPublish showSubmitPage={setShowSubmitPage} />
  }
  const onAppsOverviewClick = () => {
    navigate(`/appoverview`)
    dispatch(setCurrentActiveStep())
  }

  return (
    <div className="app-release-process-form">
      {showSubmitPage ? (
        <MainHeader
          subTitle={t('content.apprelease.submitApp.headerTitle')}
          headerHeight={731}
          subTitleWidth={500}
          background="LinearGradient1"
          imagePath="../../submit-app-background.png"
        >
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('content.apprelease.submitApp.headerDescription')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t('content.apprelease.submitApp.headerDescriptionComplete')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t('content.apprelease.submitApp.yourCatenaXTeam')}
          </Typography>
          <Button onClick={onAppsOverviewClick}>
            {t('content.apprelease.submitApp.myAppsOverview')}
          </Button>
        </MainHeader>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
