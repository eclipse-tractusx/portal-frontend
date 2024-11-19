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

import Box from '@mui/material/Box'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LoopIcon from '@mui/icons-material/Loop'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import {
  ProgressStatus,
  type ProgressButtonsType,
} from 'features/admin/applicationRequestApiSlice'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ProgressVerificationButton } from 'components/shared/basic/ProgressVerificationButton'

interface CheckListFullButtonsProps {
  progressButtons?: Array<ProgressButtonsType>
  selectedRequestId?: string
}

export default function CheckListFullButtons({
  progressButtons,
  selectedRequestId,
}: CheckListFullButtonsProps) {
  const { t } = useTranslation()
  const [checkListButtons, setCheckListButtons] =
    useState<ProgressButtonsType[]>()

  const getButtonProps = (statusId: string) => {
    switch (statusId) {
      case ProgressStatus.IN_PROGRESS:
        return {
          icon: (
            <LoopIcon
              style={{
                color: '#0F71CB',
                height: '20px',
                width: '20px',
              }}
            />
          ),
          backgroundColor: '#EAF1FE',
        }
      case ProgressStatus.TO_DO:
        return {
          icon: (
            <PendingActionsIcon
              style={{
                color: '#0F71CB',
                height: '30px',
                width: '20px',
              }}
            />
          ),
          backgroundColor: '#EAF1FE',
        }
      case ProgressStatus.DONE:
        return {
          icon: (
            <CheckCircleOutlineIcon
              style={{
                color: '#00AA55',
                height: '30px',
                width: '20px',
              }}
            />
          ),
          backgroundColor: '#F5F9EE',
        }
      case ProgressStatus.FAILED:
        return {
          icon: (
            <ReportProblemIcon
              style={{
                color: '#D91E18',
                height: '30px',
                width: '20px',
              }}
            />
          ),
          backgroundColor: '#FFF6FF',
        }
      case ProgressStatus.SKIPPED:
        return {
          icon: (
            <PendingActionsIcon
              style={{
                color: '#0F71CB',
                height: '30px',
                width: '20px',
              }}
            />
          ),
          backgroundColor: '#ffffff',
        }
    }
  }

  const getButtonStatusTag = (statusId: string) => {
    switch (statusId) {
      case ProgressStatus.IN_PROGRESS:
        return 'label'
      case ProgressStatus.TO_DO:
        return 'label'
      case ProgressStatus.DONE:
        return 'confirmed'
      case ProgressStatus.FAILED:
        return 'declined'
      case ProgressStatus.SKIPPED:
        return 'label'
    }
  }

  const updateCheckListStatusButtons = useCallback(
    (progressButtons: ProgressButtonsType[]) => {
      setCheckListButtons(
        progressButtons.map((button: ProgressButtonsType) => ({
          statusId: button.statusId,
          typeId: button.typeId,
          details: button.details,
          retriggerableProcessSteps: button.retriggerableProcessSteps,
          label: t(`content.checklistOverlay.checkList.${button.typeId}`),
          statusLabel: t(
            `content.checklistOverlay.checkListProgress.${button.statusId}`
          ),
          statusTag: getButtonStatusTag(button.statusId),
          ...getButtonProps(button.statusId),
        }))
      )
    },
    [getButtonProps, t]
  )

  useEffect(() => {
    if (progressButtons) {
      updateCheckListStatusButtons(progressButtons)
    }
  }, [progressButtons, updateCheckListStatusButtons])

  return (
    <>
      {checkListButtons && (
        <Box>
          {checkListButtons.map((button: ProgressButtonsType) => (
            <ProgressVerificationButton
              key={button.typeId}
              {...button}
              selectedRequestId={selectedRequestId}
            />
          ))}
        </Box>
      )}
    </>
  )
}
