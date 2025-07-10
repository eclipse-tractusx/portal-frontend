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

import { Typography, Button, ProcessList } from '@cofinity-x/shared-components'
import { Box } from '@mui/material'
import './style.scss'
import { MainHeader } from 'components/shared/cfx/MainHeader'

type RequerementStepType = {
  neuButton: string
  marketplaceTitle: string
  marketplaceExplanation: string
  index: number
}

type StepListType = {
  description: string
  headline: string
  step: number
}

export enum ButtonLabelTypes {
  SAVE = 'save',
  SAVE_AND_PROCEED = 'saveAndProceed',
}

type ReleaseProcessProps = {
  onStartClick: () => void
  onOverviewButton: () => void
  stepsLists: StepListType[]
  headerTitle?: string
  headerDescription?: string
  descHeading?: string
  descMessage?: string
  startCreatingButton?: string
  overviewButton?: string
  stepHeading?: string
  dividerText?: string
  marketplaceHeading?: string
  requirements?: RequerementStepType[]
  elementNumbers: number
  registerButton?: string
}

export const ReleaseProcess = ({
  onStartClick,
  onOverviewButton,
  stepsLists,
  headerTitle,
  headerDescription,
  descMessage,
  overviewButton,
  stepHeading,
  dividerText,
  startCreatingButton,
  elementNumbers,
  registerButton,
}: ReleaseProcessProps) => {
  return (
    <div className="appOverview-main">
      <MainHeader
        title={headerTitle}
        subTitle={headerDescription}
        headerHeight={250}
        subTitleWidth={750}
      />
      <div className="desc-section">
        <div className="container">
          <Typography variant="body2" className="desc-message">
            {descMessage}
          </Typography>
          <div>
            <Button
              data-testid="release-process-create-button"
              key="create"
              color="primary"
              size="small"
              className="create-btn"
              onClick={() => {
                onStartClick()
              }}
            >
              {registerButton}
            </Button>
            <Button
              data-testid="view-all-apps-button"
              key="overview"
              color="secondary"
              size="small"
              className="overview-btn"
              onClick={() => {
                onOverviewButton()
              }}
            >
              {overviewButton}
            </Button>
          </div>
        </div>
      </div>
      <div className="process-steps">
        <div className="container">
          <div className="steps-main">
            <Typography variant="h3" className="step-heading">
              {stepHeading}
            </Typography>
            <ProcessList
              elementNumbers={elementNumbers}
              list={stepsLists}
              stepsColor="#FFA600"
              stepsFontColor="#fff"
            />
            <div className="lr-text-divider">
              <Typography variant="body2" className="marketplace-title1">
                {dividerText}
              </Typography>
            </div>
            <Box textAlign="center">
              <Button
                data-testid="release-process-create-button"
                color="primary"
                size="small"
                className="create-btn"
                onClick={() => {
                  onStartClick()
                }}
              >
                {startCreatingButton}
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}
