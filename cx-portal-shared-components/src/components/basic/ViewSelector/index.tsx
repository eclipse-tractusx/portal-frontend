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
import { Button } from '../Button'
import React from 'react'

export interface view {
  buttonText: string
  buttonValue: string
  onButtonClick?: React.MouseEventHandler
}

export interface ViewSelectorProps {
  views: view[]
  activeView: string
  align?: string
}

export const ViewSelector = ({
  views,
  activeView,
  align = 'right',
}: ViewSelectorProps) => {
  return (
    <Box sx={{ textAlign: align }}>
      {views?.map(({ buttonText, buttonValue, onButtonClick }) => (
        <Button
          color={'secondary'}
          variant={
            activeView &&
            buttonValue &&
            activeView.toLowerCase() === buttonValue.toLowerCase()
              ? 'contained'
              : 'text'
          }
          value={buttonValue}
          key={buttonText}
          sx={{ marginRight: '16px' }}
          size={'small'}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      ))}
    </Box>
  )
}
