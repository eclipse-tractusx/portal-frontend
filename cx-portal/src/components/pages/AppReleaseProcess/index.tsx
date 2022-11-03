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

import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  PageHeader,
  Typography,
  Button,
  ProcessList,
} from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import { Box } from '@mui/material'
import './AppReleaseProcess.scss'

export default function AppReleaseProcess() {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

  return (
    <div className="appoverview-main">
      <PageHeader
        title={t('content.apprelease.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <div className="desc-section">
        <div className="container">
          <Typography variant="h3" className="desc-heading">
            {t('content.apprelease.descHeading')}
          </Typography>
          <Typography variant="body2" className="desc-message">
            {t('content.apprelease.descMessage')}
          </Typography>
          <div>
            <Button
              key="create"
              color="primary"
              size="small"
              className="create-btn"
              onClick={() => navigate(`/${PAGES.APPRELEASEPROCESS}/form`)}
            >
              {t('content.apprelease.startCreatingButton')}
            </Button>
            <Button
              key="overview"
              color="secondary"
              size="small"
              className="overview-btn"
            >
              {t('content.apprelease.appOverviewButton')}
            </Button>
          </div>
        </div>
      </div>
      <div className="process-steps">
        <div className="container">
          <div className="steps-main">
            <Typography variant="h3" className="step-heading">
              {t('content.apprelease.stepHeading')}
            </Typography>
            <ProcessList
              elementNumbers={6}
              list={stepsLists}
              stepsColor="#FFA600"
              stepsFontColor="#fff"
            />
            <div className="lr-text-divider">
              <Typography variant="body2" className="marketplace-title1">
                {t('content.apprelease.dividerText')}
              </Typography>
            </div>
            <Box textAlign="center">
              <Button
                color="primary"
                size="small"
                className="create-btn"
                onClick={() => navigate(`/${PAGES.APPRELEASEPROCESS}/form`)}
              >
                {t('content.apprelease.startCreatingButton')}
              </Button>
              <Typography variant="h3" className="marketplace-heading">
                {t('content.apprelease.marketplaceHeading')}
              </Typography>
            </Box>
            <div className="marketplace-requirements">
              <ul>
                <li>
                  <Button color="secondary" size="small" className="neu-btn">
                    {t('content.apprelease.neuButton')}
                  </Button>
                  <span>
                    <Typography variant="body2" className="marketplace-title1">
                      {t('content.apprelease.marketplaceTitle')}
                    </Typography>
                    <Typography variant="body2" className="marketplace-title1">
                      {t('content.apprelease.marketplaceExplanation')}
                    </Typography>
                  </span>
                </li>
                <li>
                  <Button color="secondary" size="small" className="neu-btn">
                    {t('content.apprelease.neuButton')}
                  </Button>
                  <span>
                    <Typography variant="body2" className="marketplace-title1">
                      {t('content.apprelease.marketplaceTitle')}
                    </Typography>
                    <Typography variant="body2" className="marketplace-title1">
                      {t('content.apprelease.marketplaceExplanation')}
                    </Typography>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
