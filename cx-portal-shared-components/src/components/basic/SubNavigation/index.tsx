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
import { theme } from '../../../theme'
import { SubNavigationLink } from './SubNavigationLink'
import { SubNavigationButton } from './SubNavigationButton'

export interface SubNavigationProps {
  buttonLabel?: string
  onButtonClick?: React.MouseEventHandler
  link1Label?: string
  onLink1Click?: React.MouseEventHandler
  link2Label?: string
  onLink2Click?: React.MouseEventHandler
}
export const SubNavigation = ({
  buttonLabel,
  onButtonClick,
  link1Label,
  onLink1Click,
  link2Label,
  onLink2Click,
}: SubNavigationProps) => {
  return (
    <Box
      sx={{
        height: '116px',
        backgroundColor: theme.palette.accent.accent02,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: '1200px',
          marginRight: 'auto',
          marginLeft: 'auto',
          padding: '0px 16px',
        }}
      >
        <SubNavigationLink
          link1Label={link1Label}
          onLink1Click={onLink1Click}
          link2Label={link2Label}
          onLink2Click={onLink2Click}
        />
        <SubNavigationButton
          buttonLabel={buttonLabel}
          onButtonClick={onButtonClick}
        />
      </Box>
    </Box>
  )
}
