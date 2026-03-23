/********************************************************************************
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

import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { Box } from '@mui/material'

import './style.scss'

export interface Buttons {
  buttonText: string
  buttonValue: string
  buttonDescription: string
  count: string | number
  onButtonClick: (val: string) => void
  countTitle: string
}

export interface FramedSelectorProps {
  views: Buttons[]
  activeView: string
}

export const FramedSelector = ({ views, activeView }: FramedSelectorProps) => {
  return (
    <Box className="frameContainer">
      {views?.map(
        ({
          buttonText,
          buttonValue,
          buttonDescription,
          onButtonClick,
          count,
          countTitle,
        }) => (
          <Box
            sx={{
              border:
                activeView &&
                buttonValue &&
                activeView.toLowerCase() === buttonValue.toLowerCase()
                  ? '2px solid #0f71cb'
                  : '2px solid #ccc',
            }}
            key={buttonText}
            className="frameButton"
            onClick={() => {
              onButtonClick(buttonValue)
            }}
          >
            <Typography className="title" variant="h4">
              {buttonText}:
            </Typography>
            <Box className="textNumber">
              <Typography variant="body2">{buttonDescription}</Typography>
              <Box className="value">
                <Typography variant="h4">{countTitle}</Typography>
                <Typography variant="h2">{count}</Typography>
              </Box>
            </Box>
          </Box>
        )
      )}
    </Box>
  )
}
