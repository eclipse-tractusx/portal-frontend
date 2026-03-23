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

import {
  Button,
  MainHeader,
  PageHeader,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useCallback, useEffect, useState } from 'react'
import '../ReleaseProcessSteps.scss'
import ReleaseStepper, {
  type StepType,
} from 'components/shared/basic/ReleaseProcess/Stepper'
import AppMarketCard from '../AppMarketCard'
import AppPage from '../AppPage'
import ContractAndConsent from '../ContractAndConsent'
import TechnicalIntegration from '../TechnicalIntegration'
import BetaTest from '../BetaTest'
import ValidateAndPublish from '../ValidateAndPublish'
import OfferCard from '../OfferCard'
import { currentActiveStep } from 'features/appManagement/slice'
import { useSelector } from 'react-redux'
import OfferPage from '../OfferPage'
import OfferContractAndConsent from '../OfferContractAndConsent'
import { serviceReleaseActiveStep } from 'features/serviceManagement/slice'
import { ReleaseProcessTypes } from 'features/serviceManagement/apiSlice'
import OfferValidateAndPublish from '../OfferValidateAndPublish'
// import { getAssetBase } from 'services/EnvironmentService'
import OfferTechnicalIntegration from '../OfferTechnicalIntegration'

interface ReleaseProcessWrapperType {
  headerTitle: string
  processType: string
  stepsList: StepType[]
  // imagePath?: string
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
  stepsList,
  // imagePath = `${getAssetBase()}/images/content/submit-app-background.png`,
  headerDescription,
  headerDescriptionComplete,
  yourCatenaXTeam,
  myAppsOverview,
  numberOfSteps,
  pageHeaderTitle,
  onAppsOverviewClick,
}: ReleaseProcessWrapperType) {
  const [showSubmitPage, setShowSubmitPage] = useState(false)
  const [skipTechnicalIntegrationStep, setSkipTechnicalIntegrationStep] =
    useState(false)
  const activeStep: number = useSelector(currentActiveStep)
  const serviceActiveStep: number = useSelector(serviceReleaseActiveStep)

  const appReleaseSteps = useCallback(() => {
    if (activeStep === 1) return <AppMarketCard />
    else if (activeStep === 2) return <AppPage />
    else if (activeStep === 3) return <ContractAndConsent />
    else if (activeStep === 4) return <TechnicalIntegration />
    else if (activeStep === 5) return <BetaTest />
    else if (activeStep === 6)
      return <ValidateAndPublish showSubmitPage={setShowSubmitPage} />
  }, [activeStep])

  const serviceReleaseSteps = useCallback(() => {
    if (serviceActiveStep === 1) return <OfferCard />
    else if (serviceActiveStep === 2)
      return (
        <OfferPage
          skipTechnicalIntegrationStep={setSkipTechnicalIntegrationStep}
        />
      )
    else if (serviceActiveStep === 3) return <OfferContractAndConsent />
    else if (skipTechnicalIntegrationStep && serviceActiveStep === 4)
      return <OfferValidateAndPublish showSubmitPage={setShowSubmitPage} />
    else if (!skipTechnicalIntegrationStep && serviceActiveStep === 4)
      return <OfferTechnicalIntegration />
    else if (!skipTechnicalIntegrationStep && serviceActiveStep === 5)
      return <OfferValidateAndPublish showSubmitPage={setShowSubmitPage} />
  }, [serviceActiveStep, skipTechnicalIntegrationStep])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [skipTechnicalIntegrationStep, serviceActiveStep, activeStep])

  return (
    <div className="app-release-process-form">
      {showSubmitPage ? (
        <MainHeader
          subTitle={headerTitle}
          headerHeight={731}
          subTitleWidth={500}
          background="LinearGradient1"
          imagePath="/orange-background-full.jpg"
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
                activePage={
                  processType === ReleaseProcessTypes.APP_RELEASE
                    ? activeStep
                    : serviceActiveStep
                }
                stepsList={stepsList}
                numberOfSteps={numberOfSteps}
              />
              {processType === ReleaseProcessTypes.APP_RELEASE
                ? appReleaseSteps()
                : serviceReleaseSteps()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
