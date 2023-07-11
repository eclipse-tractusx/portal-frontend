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
import { CertificateResponse } from 'features/certification/certificationApiSlice'
import './style.scss'

export enum StatusVariants {
  release = 'release',
  active = 'active',
  inactive = 'inactive',
  created = 'created',
  inReview = 'in_review',
  pending = 'pending',
}

export const Card3 = ({ item }: any) => {
  const boxRef = useRef<HTMLDivElement>(null)

  const renderStatusIcon = (item: CertificateResponse) => {
    if (
      item.ssiDetailData?.[0].participationStatus.toLowerCase() ===
      StatusVariants.active
    ) {
      return <CheckCircleOutlineIcon className="statusIcon activeIcon" />
    } else if (
      item.ssiDetailData?.[0].participationStatus.toLowerCase() ===
      StatusVariants.pending
    ) {
      return <AccessTimeIcon className="statusIcon waitingIcon" />
    } else {
      return <CancelOutlinedIcon className="statusIcon cancelIcon" />
    }
  }

  return (
    <Box ref={boxRef} className="card3Main">
      <div className="itemList" key={item.credentialType}>
        <Box
          className="itemBg"
          sx={{
            backgroundImage: `url(${LogoGrayData})`,
            backgroundColor: '#F2F3FB',
          }}
        />
        <Box className="detailBox">
          <Box className="statusDetail">
            {renderStatusIcon(item)}
            {item.ssiDetailData?.[0].participationStatus.toLowerCase() !==
              StatusVariants.active &&
              item.ssiDetailData?.[0].participationStatus.toLowerCase() !==
                StatusVariants.pending && (
                <DeleteOutlineIcon className="deleteIcon" />
              )}
          </Box>
          <Typography variant="caption3" className="type">
            {'Type: [ISO 9001]'}
          </Typography>
          <Typography variant="h4" className="title">
            {item.credentialType}
          </Typography>
          {item.ssiDetailData && (
            <Typography variant="body3" className="expiryDate">
              {'Valid until: '}
              {item.ssiDetailData[0].expiryDate.split('T')[0]}
            </Typography>
          )}

          <Typography variant="body3" className="status">
            {'Status: '}
            {item.ssiDetailData?.[0].participationStatus ?? 'Inactive'}
          </Typography>
          {item.ssiDetailData?.[0].participationStatus.toLowerCase() ===
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
                  label={item.ssiDetailData?.[0].participationStatus}
                  size="small"
                  className="verificationStatus"
                />
              </Box>
            </>
          )}
          {item.description && (
            <Typography variant="label4" className="description">
              {item.description}
            </Typography>
          )}
        </Box>
      </div>
    </Box>
  )
}
