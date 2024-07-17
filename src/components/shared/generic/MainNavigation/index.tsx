/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { Children } from 'react'
import { Box } from '@mui/material'
import { type MenuProps } from '../Menu'
import { Navigation } from '../Navigation'

export interface MainNavigationProps extends MenuProps {
  children?: React.ReactNode
  activeMenu?: string
}

export const mainNavigationHeight = 85

export const MainNavigation = ({
  children,
  items,
  component,
  activeMenu,
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
      className="mainNavigation"
    >
      {arrayChildren.length > 0 && (
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
        <Navigation
          items={items}
          component={component}
          unstyled={true}
          active={activeMenu}
        />
      </Box>

      {arrayChildren.length > 0 && (
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
