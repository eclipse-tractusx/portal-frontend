/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
  Button,
  MainHeader,
  PageHeader,
  Typography,
} from 'cx-portal-shared-components'
import { useEffect, useState } from 'react'
import '../ReleaseProcessSteps.scss'
import ReleaseStepper, {
  StepType,
} from 'components/shared/basic/ReleaseProcess/stepper'
import AppMarketCard from '../AppMarketCard'
import AppPage from '../AppPage'
import ContractAndConsent from '../ContractAndConsent'
import TechnicalIntegration from '../TechnicalIntegration'
import BetaTest from '../BetaTest'
import ValidateAndPublish from '../ValidateAndPublish'

interface ReleaseProcessWrapperType {
  headerTitle: string
  processType: string
  activePage: number
  stepsList: StepType[]
  imagePath?: string
  headerDescription?: string
  headerDescriptionComplete?: string
  yourCatenaXTeam?: string
  myAppsOverview?: string
  numberOfSteps: number
  onAppsOverviewClick: () => void
  pageHeaderTitle?: string
}

export default function ReleaseProcessWrapper({
  headerTitle,
  processType,
  activePage,
  stepsList,
  imagePath = '../../submit-app-background.png',
  headerDescription,
  headerDescriptionComplete,
  yourCatenaXTeam,
  myAppsOverview,
  numberOfSteps,
  pageHeaderTitle,
  onAppsOverviewClick,
}: ReleaseProcessWrapperType) {
  const [showSubmitPage, setShowSubmitPage] = useState(false)

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

  return (
    <div className="app-release-process-form">
      {showSubmitPage ? (
        <MainHeader
          subTitle={headerTitle}
          headerHeight={731}
          subTitleWidth={500}
          background="LinearGradient1"
          imagePath={imagePath}
        >
          <Typography variant="body1" sx={{ mt: 2 }}>
            {headerDescription}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {headerDescriptionComplete}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {yourCatenaXTeam}
          </Typography>
          <Button onClick={onAppsOverviewClick}>{myAppsOverview}</Button>
        </MainHeader>
      ) : (
        <>
          <PageHeader
            title={pageHeaderTitle}
            topPage={true}
            headerHeight={200}
          />
          <div className="create-app-section">
            <div className="container">
              <ReleaseStepper
                activePage={activePage}
                stepsList={stepsList}
                numberOfSteps={numberOfSteps}
              />
              {activeStep()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
