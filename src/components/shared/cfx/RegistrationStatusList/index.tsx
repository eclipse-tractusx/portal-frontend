/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { useTranslation } from 'react-i18next'
import { useMediaQuery, useTheme } from '@mui/material'
import { Typography, StatusTag } from '@catena-x/portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LoopIcon from '@mui/icons-material/Loop'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import PendingIcon from '@mui/icons-material/Pending'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { type ApplicationChecklist } from 'features/registration/registrationApiSlice'
import uniqueId from 'lodash/uniqueId'
import './RegistrationReview.scss'
import { ProgressStatus } from 'features/admin/applicationRequestApiSlice'
import { registrationStatusColors } from 'theme.override'
import { REVIEW_STAGE_ORDERS } from 'types/Constants'

export type StatusTagIcon = {
  type?: 'confirmed' | 'pending' | 'declined' | 'label'
}

const RegistrationStatusList = ({
  checklist,
}: {
  checklist: ApplicationChecklist[]
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })

  const renderStatus = (status: string) => {
    switch (status) {
      case ProgressStatus.IN_PROGRESS:
        return {
          icon: <LoopIcon />,
          iconColor: 'label' as StatusTagIcon['type'],
          ...registrationStatusColors.inProgress,
        }
      case ProgressStatus.TO_DO:
        return {
          icon: <PendingActionsIcon />,
          iconColor: 'label' as StatusTagIcon['type'],
          ...registrationStatusColors.todo,
        }
      case ProgressStatus.DONE:
        return {
          icon: <CheckCircleOutlineIcon />,
          iconColor: 'confirmed' as StatusTagIcon['type'],
          ...registrationStatusColors.done,
        }
      case ProgressStatus.FAILED:
        return {
          icon: <ReportProblemIcon />,
          iconColor: 'declined' as StatusTagIcon['type'],
          ...registrationStatusColors.failed,
        }
      default:
        return {
          icon: <PendingIcon />,
          iconColor: 'label' as StatusTagIcon['type'],
          ...registrationStatusColors.default,
        }
    }
  }

  return (
    <ul className="statusList">
      {REVIEW_STAGE_ORDERS.map((stageName: string) => {
        const currentStage = checklist.find((c) => c.typeId === stageName)

        if (currentStage) {
          const {
            icon,
            iconColor,
            color,
            backgroundColor,
            btnColor,
            textColor,
          } = renderStatus(currentStage.statusId)
          return (
            <li
              key={uniqueId(currentStage.statusId)}
              style={{
                backgroundColor,
                flexDirection: isMobile ? 'column-reverse' : 'unset',
                borderRadius: '6px',
              }}
            >
              {!isMobile && (
                <div style={{ color }} className="icon">
                  {icon}
                </div>
              )}
              <div
                className={`${isMobile ? 'm-0' : 'statusLabel'}`}
                style={{
                  margin: isMobile ? 0 : '',
                }}
              >
                <Typography
                  variant="label3"
                  sx={{
                    fontSize: isMobile ? '12px' : '20px',
                  }}
                >
                  {t(
                    `content.registrationInreview.steps.${currentStage.typeId}`
                  )}
                </Typography>
              </div>
              <StatusTag
                className="statusTag"
                color={iconColor}
                label={t(
                  `content.registrationInreview.status.${currentStage.statusId}`
                )}
                size="small"
                sx={{
                  fontSize: isMobile ? '12px' : '18px',
                  backgroundColor: btnColor,
                  color: textColor,
                }}
              />
            </li>
          )
        }

        return null
      })}
    </ul>
  )
}

export default RegistrationStatusList
