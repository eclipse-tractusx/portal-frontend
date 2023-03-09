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

import { Box } from '@mui/material'
import { Typography } from '../Typography'
import { theme } from '../../../theme'
import { useEffect, useState } from 'react'

interface StepperItemProps {
  step: number
  headline: string
  activeStep: number
  index: number
  totalSteps?: number
}

export const StepperItem = ({
  step,
  headline,
  activeStep,
  index,
  totalSteps = 6,
}: StepperItemProps) => {
  const [backgroundColor, setBackgroundColor] = useState(
    theme.palette.stepper.stepUpcoming
  )
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (index === activeStep) {
      setBackgroundColor(theme.palette.stepper.stepCurrent)
      setDone(false)
    } else if (index < activeStep) {
      setBackgroundColor(theme.palette.stepper.stepDone)
      setDone(true)
    } else {
      setBackgroundColor(theme.palette.stepper.stepUpcoming)
      setDone(false)
    }
  }, [index, activeStep])
  const width = 100 / totalSteps
  return (
    <Box
      sx={{
        width: `${width}%`,
        margin: '0px',
        borderBottom: `2px solid ${backgroundColor}`,
      }}
    >
      <Box
        sx={{
          backgroundColor: `${backgroundColor}`,
          borderRadius: '50%',
          margin: '12px auto 16px auto',
          width: '28px',
          height: '28px',
          top: '15px',
          left: '15px',
          color: '#fff',
        }}
      >
        <Typography
          variant="body1"
          fontSize="14px"
          color="#fff"
          sx={{
            margin: 'auto',
            paddingTop: '4px',
            width: 'fit-content',
          }}
        >
          {done && (
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8078 1.24939L5.09535 12.1399L0.305542 7.15056L1.74832 5.7655L4.95851 9.10944L12.2461 0L13.8078 1.24939Z"
                fill="white"
              />
            </svg>
          )}
          {!done && step}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '95px',
          margin: '0px auto 24px auto',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="label3"
          fontSize="14px"
          fontWeight="500"
          sx={{
            margin: 'auto',
            height: 'fit-contetn',
          }}
        >
          {headline}
        </Typography>
      </Box>
    </Box>
  )
}
