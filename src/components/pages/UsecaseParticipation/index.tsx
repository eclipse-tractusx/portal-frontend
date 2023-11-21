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
import {
  Chip,
  PageHeader,
  Tooltips,
  Typography,
} from '@catena-x/portal-shared-components'
import PixIcon from '@mui/icons-material/Pix'
import LaunchIcon from '@mui/icons-material/Launch'
import uniqueId from 'lodash/uniqueId'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  type UsecaseResponse,
  type VerifiedCredentialsData,
  useFetchUsecaseQuery,
} from 'features/usecase/usecaseApiSlice'
import './UsecaseParticipation.scss'
import { SubscriptionStatus } from 'features/apps/apiSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function UsecaseParticipation() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data, refetch } = useFetchUsecaseQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  const renderStatus = (
    item: UsecaseResponse,
    credential: VerifiedCredentialsData
  ) => {
    const status = credential.ssiDetailData?.participationStatus
    if (
      status === SubscriptionStatus.PENDING ||
      status === SubscriptionStatus.ACTIVE
    ) {
      return (
        <Typography
          variant="caption3"
          className={status === SubscriptionStatus.PENDING ? 'grey' : 'green'}
        >
          {status}
        </Typography>
      )
    } else {
      return (
        <Chip
          color="secondary"
          label="Edit"
          onClick={() =>
            dispatch(
              show(
                OVERLAYS.EDIT_USECASE,
                credential.externalDetailData.id,
                item.credentialType
              )
            )
          }
          withIcon={false}
          type="plain"
        />
      )
    }
  }

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
          <div className="usecase-list-main">
            <ul>
              {data?.map((item) => {
                return (
                  <div className="usecase-list" key={uniqueId(item.useCase)}>
                    <li className="usecase-list-item">
                      <div className="usecase-detail">
                        <PixIcon />
                        <div>
                          <Typography variant="body1" className="usecase-title">
                            {item.useCase}
                          </Typography>
                          <Typography variant="body2">
                            {item.description}
                          </Typography>
                        </div>
                      </div>
                    </li>
                    <ul className="credential-list">
                      {item.verifiedCredentials.map((credential) => {
                        return (
                          <>
                            <hr className="seperation" />
                            <li className="credential-list-item">
                              <Typography
                                variant="body3"
                                className="firstSection"
                              >
                                {
                                  credential.externalDetailData
                                    .verifiedCredentialExternalTypeId
                                }
                              </Typography>
                              <Trans
                                values={{
                                  version:
                                    credential.externalDetailData.version,
                                }}
                              >
                                <Typography
                                  variant="body3"
                                  className="secondSection"
                                >
                                  {t('content.usecaseParticipation.version')}
                                </Typography>
                              </Trans>
                              <Tooltips
                                tooltipPlacement="top-start"
                                tooltipText={
                                  !credential.externalDetailData.template
                                    ? t(
                                        'content.usecaseParticipation.nodocument'
                                      )
                                    : ''
                                }
                                children={
                                  <Link
                                    to={credential.externalDetailData.template}
                                    target="_blank"
                                    className={`thirdSection ${
                                      !credential.externalDetailData.template &&
                                      'documentDisabled'
                                    }`}
                                  >
                                    <Typography
                                      variant="body3"
                                      className="framework"
                                    >
                                      <LaunchIcon />
                                      {t(
                                        'content.usecaseParticipation.framework'
                                      )}
                                    </Typography>
                                  </Link>
                                }
                              />
                              <Trans
                                values={{
                                  expiry: credential.externalDetailData.expiry
                                    ? credential.externalDetailData.expiry.split(
                                        'T'
                                      )[0]
                                    : '',
                                }}
                              >
                                <Typography
                                  variant="body3"
                                  className="forthSection"
                                >
                                  {credential.externalDetailData.expiry
                                    ? t('content.usecaseParticipation.expiry')
                                    : 'N/A'}
                                </Typography>
                              </Trans>
                              <Typography
                                variant="body3"
                                className="fifthSection"
                              >
                                {renderStatus(item, credential)}
                              </Typography>
                            </li>
                          </>
                        )
                      })}
                    </ul>
                    <hr className="seperation" />
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
