/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { Typography } from 'cx-portal-shared-components'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LoopIcon from '@mui/icons-material/Loop'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import MuiChip, { ChipProps } from '@mui/material/Chip'
import { ApplicationChecklistType } from 'features/admin/applicationRequestApiSlice'
import { useState, useEffect } from 'react'

export type ProgressButtonsProps = {
  statusId: 'IN_PROGRESS' | 'TO_DO' | 'DONE' | 'FAILED'
  typeId: string
  label?: string
  highlight?: boolean
  backgroundColor?: string
  border?: string
  icon?: JSX.Element
  textColor?: string
}

interface CheckListProps extends ChipProps {
  headerText?: string
  progressButtons?: Array<ApplicationChecklistType>
  showCancel?: boolean
  onCancel?: () => void
  cancelText?: string
  alignRow?: string
  onButtonClick?: (button: ProgressButtonsProps) => void
  selectedButton?: ProgressButtonsProps
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
}: CheckListProps) {
  const [checkListButtons, setCheckListButtons] = useState<any>()
  const progressMapper = {
    DONE: 20,
    IN_PROGRESS: 5,
    TO_DO: 0,
    FAILED: 0,
  }

  const getProgressValue = () => {
    let progressValue = 0
    checkListButtons?.forEach((button: ProgressButtonsProps) => {
      progressValue += progressMapper[button.statusId]
    })
    return `${progressValue}%`
  }

  const getButtonLabel = (typeId: string) => {
    switch (typeId) {
      case 'REGISTRATION_VERIFICATION':
        return 'Data Validation'
      case 'BUSINESS_PARTNER_NUMBER':
        return 'BPN Creation'
      case 'IDENTITY_WALLET':
        return 'Identity Wallet Creation'
      case 'CLEARING_HOUSE':
        return 'Clearing House'
      case 'SELF_DESCRIPTION_LP':
        return 'Self Description'
    }
  }

  const isButtonSelected = (typeId: string) =>
    selectedButton ? selectedButton.typeId === typeId : false

  useEffect(() => {
    if (progressButtons) {
      setCheckListButtons(
        progressButtons.map((button) => ({
          statusId: button.statusId,
          typeId: button.typeId,
          label: getButtonLabel(button.typeId),
          highlight: isButtonSelected(button.typeId),
          ...getButtonProps(button.statusId, isButtonSelected(button.typeId)),
        }))
      )
    }
    // eslint-disable-next-line
  }, [progressButtons, selectedButton])

  const getButtonProps = (statusId: string, highlight: boolean) => {
    switch (statusId) {
      case 'IN_PROGRESS':
        return {
          icon: (
            <LoopIcon
              style={{ color: '#0F71CB', height: '20px', width: '15px' }}
            />
          ),
          border: highlight ? '1px solid #0F71CB' : '0px',
          backgroundColor: '#EAF1FE',
          textColor: '#111111',
        }
      case 'TO_DO':
        return {
          icon: (
            <PendingActionsIcon
              style={{ color: '#0F71CB', height: '20px', width: '15px' }}
            />
          ),
          border: highlight ? '1px solid #0F71CB' : '0px',
          backgroundColor: '#EAF1FE',
          textColor: '#111111',
        }
      case 'DONE':
        return {
          icon: (
            <CheckCircleOutlineIcon
              style={{ color: '#00AA55', height: '20px', width: '15px' }}
            />
          ),
          border: highlight ? '1px solid #00AA55' : '0px',
          backgroundColor: '#F5F9EE',
          textColor: '#111111',
        }
      case 'FAILED':
        return {
          icon: (
            <ReportProblemIcon
              style={{ color: '#D91E18', height: '20px', width: '15px' }}
            />
          ),
          border: highlight ? '1px solid #D91E18' : '0px',
          backgroundColor: '#FFF6FF',
          textColor: '#111111',
        }
    }
  }

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
                {getProgressValue()}
              </Typography>
            </Box>
          )}
          <Box>
            {checkListButtons.map((button: ProgressButtonsProps) => {
              return (
                <MuiChip
                  key={button.typeId}
                  onClick={() => {
                    onButtonClick && onButtonClick(button)
                  }}
                  variant="filled"
                  icon={button?.icon}
                  sx={{
                    width: '120px',
                    height: button.highlight ? '56px' : '40px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    margin: '0px 3px',
                    backgroundColor: button?.backgroundColor || '#fff',
                    color: button?.textColor || '#111',
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
          {showCancel && (
            <Box onClick={() => onCancel}>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#D91E18',
                  cursor: 'pointer',
                  marginLeft: '25px',
                }}
                variant="subtitle2"
              >
                {cancelText}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  )
}
