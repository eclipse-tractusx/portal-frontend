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
import {
  Typography,
  StatusTag,
} from '@arena2036/portal-shared-components-construct-x'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import LoopIcon from '@mui/icons-material/Loop'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import PendingIcon from '@mui/icons-material/Pending'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { type ApplicationChecklist } from 'features/registration/registrationApiSlice'
import uniqueId from 'lodash/uniqueId'
import '../RegistrationReview.scss'
import { ProgressStatus } from 'features/admin/applicationRequestApiSlice'

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
          backgroundColor: '#EAF1FE',
          color: '#0F71CB',
          iconColor: 'label' as StatusTagIcon['type'],
        }
      case ProgressStatus.TO_DO:
        return {
          icon: <PendingActionsIcon />,
          backgroundColor: '#EAF1FE',
          color: '#0F71CB',
          iconColor: 'label' as StatusTagIcon['type'],
        }
      case ProgressStatus.DONE:
        return {
          icon: <CheckCircleOutlineIcon />,
          backgroundColor: '#F5F9EE',
          color: '#00AA55',
          iconColor: 'confirmed' as StatusTagIcon['type'],
        }
      case ProgressStatus.FAILED:
        return {
          icon: <ReportProblemIcon />,
          backgroundColor: '#FFF6FF',
          color: '#D91E18',
          iconColor: 'declined' as StatusTagIcon['type'],
        }
      default:
        return {
          icon: <PendingIcon />,
          backgroundColor: '#FFF6FF',
          color: '#D91E18',
          iconColor: 'label' as StatusTagIcon['type'],
        }
    }
  }

  return (
    <ul className="statusList">
      {checklist.map((checklist: ApplicationChecklist) => (
        <li
          key={uniqueId(checklist.statusId)}
          style={{
            backgroundColor: renderStatus(checklist.statusId).backgroundColor,
            flexDirection: isMobile ? 'column-reverse' : 'unset',
            borderRadius: '6px',
          }}
        >
          {!isMobile && (
            <div
              style={{ color: renderStatus(checklist.statusId).color }}
              className="icon"
            >
              {renderStatus(checklist.statusId).icon}
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
                fontSize: isMobile ? '12px' : '',
              }}
            >
              {t(`content.registrationInreview.steps.${checklist.typeId}`)}
            </Typography>
          </div>
          <StatusTag
            color={renderStatus(checklist.statusId).iconColor}
            label={t(
              `content.registrationInreview.status.${checklist.statusId}`
            )}
            size="small"
            sx={{
              fontSize: isMobile ? '12px' : '',
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export default RegistrationStatusList
