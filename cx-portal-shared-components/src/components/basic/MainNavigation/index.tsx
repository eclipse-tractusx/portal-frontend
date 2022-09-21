/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { Children } from 'react'
import { Box } from '@mui/material'
import { MenuProps } from '../../basic/Menu'
import { Navigation } from '../../content/Navigation'

export interface MainNavigationProps extends MenuProps {
  children?: React.ReactNode
}

export const mainNavigationHeight = 85

export const MainNavigation = ({
  children,
  items,
  component,
}: MainNavigationProps) => {
  const arrayChildren = Children.toArray(children)

  return (
    <Box
      sx={{
        height: `${mainNavigationHeight}px`,
        display: 'flex',
        padding: '0px 30px',
        backgroundImage:
          'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXc3NyBAeViAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==)',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 bottom',
      }}
    >
      {arrayChildren.length && (
        <Box
          sx={{
            width: '170px',
            paddingTop: '22px',
            paddingBottom: '22px',
          }}
        >
          {arrayChildren[0]}
        </Box>
      )}

      <Box
        sx={{
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingTop: '22px',
          paddingBottom: '22px',
        }}
      >
        <Navigation items={items} component={component} />
      </Box>

      {arrayChildren.length && (
        <Box
          sx={{
            width: '122px',
            paddingTop: '22px',
            paddingBottom: '22px',
          }}
        >
          {arrayChildren[1]}
        </Box>
      )}
    </Box>
  )
}
