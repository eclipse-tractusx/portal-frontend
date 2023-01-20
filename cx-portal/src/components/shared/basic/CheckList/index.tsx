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

export type ProgressButtonsProps = {
  value: 'IN_PROGRESS' | 'TO_DO' | 'DONE' | 'FAILED'
  type: string
  label?: string
  highlight?: boolean
}

interface CheckListProps extends ChipProps {
  headerText?: string
  progressButtons?: ProgressButtonsProps[]
  showCancel?: boolean
  onCancel?: () => void
  cancelText?: string
  alignRow?: string
  onButtonClick?: (button: ProgressButtonsProps) => void
}

export default function CheckList({
  headerText,
  progressButtons,
  showCancel = false,
  onCancel,
  cancelText,
  alignRow = 'center',
  onButtonClick,
}: CheckListProps) {
  const progressMapper = {
    DONE: 15,
    IN_PROGRESS: 5,
    TO_DO: 0,
    FAILED: 0,
  }

  const getProgressValue = () => {
    let progressValue = 0
    progressButtons?.forEach((button: ProgressButtonsProps) => {
      progressValue += progressMapper[button.value]
    })
    return `${progressValue}%`
  }

  const getButtonLabel = (button: ProgressButtonsProps) => {
    switch (button.type) {
      case 'Registration_Verification':
        return 'Data Validation'
      case 'Business_Partner_Number':
        return 'BPN Creation'
      case 'Identity_Wallet':
        return 'Identity Wallet Creation'
      case 'Clearing_House':
        return 'Clearing House'
      case 'Self_Description_LP':
        return 'Self Description'
    }
  }

  const getButtonProps = (button: ProgressButtonsProps) => {
    switch (button.value) {
      case 'IN_PROGRESS':
        return {
          icon: (
            <LoopIcon
              style={{ color: '#0F71CB', height: '20px', width: '15px' }}
            />
          ),
          border: button.highlight ? '1px solid #0F71CB' : '0px',
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
          border: button.highlight ? '1px solid #0F71CB' : '0px',
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
          border: button.highlight ? '1px solid #00AA55' : '0px',
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
          border: button.highlight ? '1px solid #D91E18' : '0px',
          backgroundColor: '#FFF6FF',
          textColor: '#111111',
        }
    }
  }

  return (
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
        {progressButtons &&
          progressButtons.map((button: ProgressButtonsProps) => {
            const buttonProps = getButtonProps(button)
            const label = getButtonLabel(button)
            return (
              <MuiChip
                key={button.type}
                onClick={() => {
                  onButtonClick && onButtonClick(button)
                }}
                variant="filled"
                icon={buttonProps.icon}
                sx={{
                  width: '120px',
                  height: button.highlight ? '56px' : '40px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  margin: '0px 3px',
                  backgroundColor: buttonProps.backgroundColor || '#fff',
                  color: buttonProps.textColor || '#111',
                  border: buttonProps.border,
                  fontSize: '10px',
                }}
                label={label}
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
  )
}
