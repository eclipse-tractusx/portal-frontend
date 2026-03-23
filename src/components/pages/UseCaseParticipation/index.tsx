/********************************************************************************
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

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next'
import { useTheme } from '@mui/material'
import dayjs from 'dayjs'
import {
  Chip,
  CircleProgress,
  CustomAccordion,
  StatusTag,
  Tooltips,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import PixIcon from '@mui/icons-material/Pix'
import LaunchIcon from '@mui/icons-material/Launch'
import uniqueId from 'lodash/uniqueId'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import {
  useFetchUsecaseQuery,
  type UsecaseResponse,
  type VerifiedCredentialsData,
} from 'features/usecase/usecaseApiSlice'
import './style.scss'
import {
  type SSIDetailData,
  StatusEnum,
} from 'features/certification/certificationApiSlice'

export default function UseCaseParticipation() {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()

  const { data, refetch, isLoading } = useFetchUsecaseQuery()
  const useCaseList =
    data?.filter((usecase) => usecase.verifiedCredentials.length) ?? []

  useEffect(() => {
    refetch()
  }, [refetch])

  const renderCredentialData = (
    item: UsecaseResponse,
    credential: VerifiedCredentialsData
  ) => {
    const todayDate = dayjs(dayjs().format('YYYY-MM-DD'))
    const expiryDate = dayjs(
      dayjs(credential.externalDetailData.expiry).format('YYYY-MM-DD')
    )
    return (
      <div className="credential-list-item">
        <Typography variant="body3" className="firstSection">
          {credential.externalDetailData.verifiedCredentialExternalTypeId}
        </Typography>
        <Trans
          values={{
            version: credential.externalDetailData.version,
          }}
        >
          <Typography variant="body3" className="secondSection">
            {t('content.usecaseParticipation.version')}
          </Typography>
        </Trans>
        <Tooltips
          tooltipPlacement="top-start"
          tooltipText={
            !credential.externalDetailData.template
              ? t('content.usecaseParticipation.nodocument')
              : ''
          }
          children={
            <Link
              to={credential.externalDetailData.template}
              target={credential.externalDetailData.template && '_blank'}
              className={`thirdSection ${
                !credential.externalDetailData.template && 'documentDisabled'
              }`}
            >
              <Typography variant="body3" className="framework">
                <LaunchIcon />
                {t('content.usecaseParticipation.framework')}
              </Typography>
            </Link>
          }
        />
        <Trans
          values={{
            expiry: credential.externalDetailData.expiry
              ? credential.externalDetailData.expiry.split('T')[0]
              : '',
          }}
        >
          <Typography variant="body3" className="forthSection">
            {credential.externalDetailData.expiry
              ? t('content.usecaseParticipation.expiry')
              : 'N/A'}
          </Typography>
        </Trans>
        {expiryDate.diff(todayDate, 'day') > 0 ? (
          <Typography variant="body3" className="fifthSection">
            <Chip
              color="secondary"
              label={t('content.usecaseParticipation.request')}
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
          </Typography>
        ) : (
          <div className="fifthSection" />
        )}
      </div>
    )
  }

  return (
    <main className="useCaseParticipation">
      <div className="useCase-main">
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
          <div className="useCase-list-main">
            <ul>
              {isLoading ? (
                <div className="progress-main">
                  <CircleProgress
                    variant="indeterminate"
                    colorVariant="primary"
                    size={35}
                    sx={{
                      color: theme.palette.primary.main,
                      zIndex: 1,
                      position: 'absolute',
                    }}
                  />
                </div>
              ) : (
                useCaseList.map((item) => {
                  return (
                    <div className="useCase-list" key={uniqueId(item.useCase)}>
                      <li className="useCase-list-item">
                        <div className="useCase-detail">
                          <PixIcon />
                          <div>
                            <Typography
                              variant="body1"
                              className="useCase-title"
                            >
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
                            <div key={credential.externalDetailData.id}>
                              <hr className="seperation" />
                              {credential.ssiDetailData?.length ? (
                                <div style={{ width: '105%' }}>
                                  <CustomAccordion
                                    items={[
                                      {
                                        expanded: false,
                                        id: credential.externalDetailData.id,
                                        title: '',
                                        titleElement: renderCredentialData(
                                          item,
                                          credential
                                        ),
                                        color: 'white',
                                        children: (
                                          <>
                                            {credential.ssiDetailData.map(
                                              (ssidata: SSIDetailData) => (
                                                <div
                                                  className="credential-list-item"
                                                  style={{
                                                    width: '80%',
                                                    textAlign: 'center',
                                                    margin: '0 0 10px',
                                                  }}
                                                  key={ssidata.credentialId}
                                                >
                                                  <Typography
                                                    variant="caption3"
                                                    className="firstSection font-12"
                                                  >
                                                    {
                                                      credential
                                                        .externalDetailData
                                                        .verifiedCredentialExternalTypeId
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    variant="caption3"
                                                    className="secondSection font-12"
                                                  >
                                                    {
                                                      credential
                                                        .externalDetailData
                                                        .version
                                                    }
                                                  </Typography>
                                                  <Typography
                                                    variant="caption3"
                                                    className="thirdSection statustag font-12"
                                                  >
                                                    <StatusTag
                                                      color={
                                                        ssidata.participationStatus ===
                                                        StatusEnum.PENDING
                                                          ? 'pending'
                                                          : 'label'
                                                      }
                                                      label={
                                                        ssidata.participationStatus
                                                      }
                                                      variant="filled"
                                                      sx={{
                                                        height: '22px',
                                                      }}
                                                      size="small"
                                                    />
                                                  </Typography>
                                                  <Typography
                                                    variant="caption3"
                                                    className="forthSection font-12"
                                                  >
                                                    {ssidata.expiryDate
                                                      ? ssidata.expiryDate.split(
                                                          'T'
                                                        )[0]
                                                      : ''}
                                                  </Typography>
                                                </div>
                                              )
                                            )}
                                          </>
                                        ),
                                      },
                                    ]}
                                  />
                                </div>
                              ) : (
                                renderCredentialData(item, credential)
                              )}
                            </div>
                          )
                        })}
                      </ul>
                    </div>
                  )
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
