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
import {
  Typography,
  Button,
} from '@arena2036/portal-shared-components-construct-x'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LoopIcon from '@mui/icons-material/Loop'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import MuiChip, { type ChipProps } from '@mui/material/Chip'
import {
  progressMapper,
  ProgressStatus,
  type ProgressButtonsType,
} from 'features/admin/applicationRequestApiSlice'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CheckListProps extends ChipProps {
  headerText?: string
  progressButtons?: Array<ProgressButtonsType>
  showCancel?: boolean
  onCancel?: () => void
  cancelText?: string
  alignRow?: string
  onButtonClick?: (button: ProgressButtonsType) => void
  selectedButton?: ProgressButtonsType
}

export default function CheckList({
  headerText,
  progressButtons,
  showCancel = false,
  onCancel,
  cancelText,
  alignRow = 'center',
  onButtonClick,
  selectedButton,
}: Readonly<CheckListProps>) {
  const { t } = useTranslation()
  const [checkListButtons, setCheckListButtons] =
    useState<ProgressButtonsType[]>()

  const getProgressValue = () => {
    let progressValue = 0
    checkListButtons?.forEach((button: ProgressButtonsType) => {
      progressValue += progressMapper[button.statusId]
    })
    return progressValue
  }

  const isButtonSelected = useCallback(
    (typeId: string) => {
      return selectedButton ? selectedButton.typeId === typeId : false
    },
    [selectedButton]
  )

  const getButtonProps = useCallback((statusId: string, highlight: boolean) => {
    switch (statusId) {
      case ProgressStatus.IN_PROGRESS:
        return {
          icon: (
            <LoopIcon
              style={{
                color: '#0F71CB',
                height: '20px',
                width: '15px',
              }}
            />
          ),
          border: highlight ? '1px solid #0F71CB' : '0px',
          backgroundColor: '#EAF1FE',
        }
      case ProgressStatus.TO_DO:
        return {
          icon: (
            <PendingActionsIcon
              style={{
                color: '#0F71CB',
                height: '20px',
                width: '15px',
              }}
            />
          ),
          border: highlight ? '1px solid #0F71CB' : '0px',
          backgroundColor: '#EAF1FE',
        }
      case ProgressStatus.DONE:
        return {
          icon: (
            <CheckCircleOutlineIcon
              style={{
                color: '#00AA55',
                height: '20px',
                width: '15px',
              }}
            />
          ),
          border: highlight ? '1px solid #00AA55' : '0px',
          backgroundColor: '#F5F9EE',
        }
      case ProgressStatus.FAILED:
        return {
          icon: (
            <ReportProblemIcon
              style={{
                color: '#D91E18',
                height: '20px',
                width: '15px',
              }}
            />
          ),
          border: highlight ? '1px solid #D91E18' : '0px',
          backgroundColor: '#FFF6FF',
        }
    }
  }, [])

  const updateCheckListStatusButtons = useCallback(
    (progressButtons: ProgressButtonsType[]) => {
      setCheckListButtons(
        progressButtons.map((button: ProgressButtonsType) => ({
          statusId: button.statusId,
          typeId: button.typeId,
          details: button.details,
          retriggerableProcessSteps: button.retriggerableProcessSteps,
          label: t(`content.checklistOverlay.checkList.${button.typeId}`),
          highlight: isButtonSelected(button.typeId),
          ...getButtonProps(button.statusId, isButtonSelected(button.typeId)),
          statusTag: 'label',
        }))
      )
    },
    [isButtonSelected, getButtonProps, t]
  )

  useEffect(() => {
    if (progressButtons) {
      updateCheckListStatusButtons(progressButtons)
    }
  }, [progressButtons, selectedButton, updateCheckListStatusButtons])

  return (
    <>
      {checkListButtons && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: alignRow,
            width: '100%',
          }}
        >
          {headerText && (
            <Box>
              <Typography
                sx={{
                  paddingRight: '10px',
                }}
                variant="subtitle1"
              >
                {headerText}
                {getProgressValue()}%
              </Typography>
            </Box>
          )}
          <Box>
            {checkListButtons.map((button: ProgressButtonsType) => {
              return (
                <MuiChip
                  key={button.typeId}
                  onClick={() => {
                    if (onButtonClick) {
                      onButtonClick(button)
                    }
                  }}
                  variant="filled"
                  icon={button?.icon}
                  sx={{
                    width: '120px',
                    height: button.highlight ? '56px' : '40px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    margin: '0px 3px',
                    backgroundColor: button?.backgroundColor ?? '#fff',
                    color: '#111',
                    border: button?.border,
                    fontSize: '10px',
                    outlined: 'none',
                    '.hover': {
                      background: 'transparent',
                    },
                  }}
                  label={button.label}
                />
              )
            })}
          </Box>
          {showCancel && getProgressValue() < 100 ? (
            <Button
              variant="text"
              size="small"
              sx={{
                fontSize: '12px',
                color: '#D91E18',
                marginLeft: '25px',
                ':hover': {
                  backgroundColor: '#FEE7E2',
                },
              }}
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          ) : (
            <Button
              variant="text"
              size="small"
              sx={{
                fontSize: '12px',
                color: 'transparent',
                marginLeft: '25px',
              }}
            />
          )}
        </Box>
      )}
    </>
  )
}
