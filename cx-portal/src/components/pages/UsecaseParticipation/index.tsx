/********************************************************************************
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

import { useDispatch } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import { Chip, PageHeader, Typography } from 'cx-portal-shared-components'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import './UsecaseParticipation.scss'

export default function UsecaseParticipation() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <main className="usecase-participation">
      <PageHeader
        title={t('content.usecaseParticipation.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <div className="usecase-main">
        <div className="container">
          <Typography variant="h2" className="heading">
            {t('content.usecaseParticipation.heading')}
          </Typography>
          <Trans>
            <Typography variant="body1" className="description">
              {t('content.usecaseParticipation.description')}
            </Typography>
          </Trans>
          <div>
            <div className="step1">
              <Typography variant="label4" className="number">
                1
              </Typography>
              <Typography variant="label2" className="detail">
                {t('content.usecaseParticipation.step1')}
              </Typography>
            </div>
          </div>
          <div className="step1">
            <Typography variant="label4" className="number">
              2
            </Typography>
            <Typography variant="label2" className="detail">
              {t('content.usecaseParticipation.step2')}
            </Typography>
          </div>
          <div className="notes">
            <Typography variant="label2">
              {t('content.usecaseParticipation.note')}
            </Typography>
            <Typography variant="caption2">
              {t('content.usecaseParticipation.noteDetail')}
            </Typography>
          </div>
          <div className="usecase-list">
            <ul>
              <li>
                <div className="usecase-detail">
                  <Typography variant="body2">'Ise Case Title'</Typography>
                  <Typography variant="caption3">
                    'Use case desctption'
                  </Typography>
                </div>
                <Typography variant="caption3">'Status'</Typography>
              </li>
              <hr className="seperation" />
              <li>
                <div className="usecase-detail">
                  <Typography variant="body2">'Ise Case Title'</Typography>
                  <Typography variant="caption3">
                    'Use case desctption'
                  </Typography>
                </div>
                <Chip
                  color="secondary"
                  label="Edit"
                  onClick={() =>
                    dispatch(show(OVERLAYS.EDIT_USECASE, 'userId'))
                  }
                  withIcon={false}
                  type="plain"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
