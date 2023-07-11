/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useRef } from 'react'
import { Box, Chip } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { LogoGrayData, Typography } from '@catena-x/portal-shared-components'
import {
  CertificateResponse,
  SSIDetailData,
  StatusEnum,
} from 'features/certification/certificationApiSlice'
import './style.scss'
import { useTranslation } from 'react-i18next'

export enum StatusVariants {
  release = 'release',
  active = 'active',
  inactive = 'inactive',
  created = 'created',
  inReview = 'in_review',
  pending = 'pending',
}

export interface CertificateData {
  credentialType: string
  ssiDetailData: SSIDetailData
}

export const CertificateCard = ({
  credentialType,
  ssiDetailData,
}: CertificateResponse) => {
  const { t } = useTranslation()
  const boxRef = useRef<HTMLDivElement>(null)

  const renderStatusIcon = () => {
    if (
      ssiDetailData?.[0].participationStatus.toLowerCase() ===
      StatusVariants.active
    ) {
      return <CheckCircleOutlineIcon className="statusIcon activeIcon" />
    } else if (
      ssiDetailData?.[0].participationStatus.toLowerCase() ===
      StatusVariants.pending
    ) {
      return <AccessTimeIcon className="statusIcon waitingIcon" />
    } else {
      return <CancelOutlinedIcon className="statusIcon cancelIcon" />
    }
  }

  return (
    <Box ref={boxRef} className="card3Main">
      <div className="itemList" key={credentialType}>
        <Box
          className="itemBg"
          sx={{
            backgroundImage: `url(${LogoGrayData})`,
            backgroundColor: '#F2F3FB',
          }}
        />
        <Box className="detailBox">
          <Box className="statusDetail">
            {renderStatusIcon()}
            {ssiDetailData?.[0].participationStatus.toLowerCase() !==
              StatusVariants.active &&
              ssiDetailData?.[0].participationStatus.toLowerCase() !==
                StatusVariants.pending && (
                <DeleteOutlineIcon className="deleteIcon" />
              )}
          </Box>
          <Typography variant="caption3" className="type">
            {t('content.certificates.certificateCard.type')}
          </Typography>
          <Typography variant="h4" className="title">
            {credentialType}
          </Typography>
          {ssiDetailData && (
            <Typography variant="body3" className="expiryDate">
              {t('content.certificates.certificateCard.valid')}
              {ssiDetailData[0].expiryDate.split('T')[0]}
            </Typography>
          )}
          <Typography variant="body3" className="status">
            {t('content.certificates.certificateCard.status')}
            {ssiDetailData?.[0].participationStatus ?? StatusEnum.INACTIVE}
          </Typography>
          {ssiDetailData?.[0].participationStatus.toLowerCase() ===
            StatusVariants.pending && (
            <>
              <Box className="fileUploadMain">
                <CheckCircleOutlineIcon className="checkIcon" />
                <Typography variant="body3" className="title">
                  {'File Upload'}
                </Typography>
                <Chip
                  color="success"
                  variant="filled"
                  label={'Completed'}
                  size="small"
                  className="fileUploadStatus"
                />
              </Box>
              <Box className="verificationMain">
                <PendingOutlinedIcon className="verificationIcon" />
                <Typography variant="body3" className="title">
                  {'Vertification'}
                </Typography>
                <Chip
                  color="warning"
                  variant="filled"
                  label={ssiDetailData?.[0].participationStatus}
                  size="small"
                  className="verificationStatus"
                />
              </Box>
            </>
          )}
          {/* {description && (
            <Typography variant="label4" className="description">
              {description}
            </Typography>
          )} */}
        </Box>
      </div>
    </Box>
  )
}
