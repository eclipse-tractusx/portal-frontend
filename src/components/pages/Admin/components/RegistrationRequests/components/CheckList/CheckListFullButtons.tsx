/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import Box from '@mui/material/Box'
import { Typography, StatusTag } from '@catena-x/portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LoopIcon from '@mui/icons-material/Loop'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import {
  type ProgressButtonsProps,
  ProgressStatus,
} from 'features/admin/applicationRequestApiSlice'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CheckListFullButtonsProps {
  progressButtons?: Array<ProgressButtonsProps>
}

export default function CheckListFullButtons({
  progressButtons,
}: CheckListFullButtonsProps) {
  const { t } = useTranslation()
  const [checkListButtons, setCheckListButtons] = useState<any>()

  const getButtonProps = useCallback((statusId: string) => {
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
          statusTag: 'label',
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
          statusTag: 'label',
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
          statusTag: 'confirmed',
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
          statusTag: 'declined',
        }
    }
  }, [])

  const updateCheckListStatusButtons = useCallback(
    (progressButtons: ProgressButtonsProps[]) => {
      setCheckListButtons(
        progressButtons.map((button: ProgressButtonsProps) => ({
          statusId: button.statusId,
          typeId: button.typeId,
          details: button.details,
          retriggerableProcessSteps: button.retriggerableProcessSteps,
          label: t(`content.checklistOverlay.checkList.${button.typeId}`),
          statusLabel: t(
            `content.checklistOverlay.checkListProgress.${button.statusId}`
          ),
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
          {checkListButtons.map((button: ProgressButtonsProps) => (
            <Box
              key={button.typeId}
              sx={{
                display: 'flex',
                placeItems: 'center',
                flexDirection: 'row',
                margin: '0px 0px 20px 0px',
                width: '100%',
                height: '60px',
                padding: '12px 8px',
                borderRadius: '6px',
                backgroundColor: button?.backgroundColor || '#fff',
                color: '#111',
                fontSize: '14px',
                outlined: 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    paddingLeft: '5px',
                    display: 'flex',
                    placeItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  {button.icon}
                  <Typography
                    sx={{
                      paddingLeft: '15px',
                    }}
                    variant="h4"
                  >
                    {' '}
                    {button.label}
                  </Typography>
                </Box>
                <Box>
                  <StatusTag
                    color={button.statusTag}
                    label={button.statusLabel}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
