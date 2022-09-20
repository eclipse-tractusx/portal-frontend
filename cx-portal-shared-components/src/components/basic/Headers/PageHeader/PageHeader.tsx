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

import { Box, useTheme } from '@mui/material'
import { HeaderTitle } from './Components/HeaderTitle'
import { HeaderSubtractOption1 } from './Components/HeaderSubtractOption1'
import { HeaderSubtractOption2 } from './Components/HeaderSubtractOption2'
import { HeaderSubtractOption3 } from './Components/HeaderSubtractOption3'
import { mainNavigationHeight } from '../../MainNavigation'

export interface PageHeaderProps {
  children?: React.ReactNode
  title?: string
  topPage?: boolean
  headerHeight?: number
  hasSubtract?: boolean
  subtractOption?: 'Option1' | 'Option2' | 'Option3'
  background?:
    | 'LinearGradient1'
    | 'LinearGradient2'
    | 'LinearGradient3'
    | 'LinearGradient4'
}

export const PageHeader = ({
  children,
  title,
  topPage = false,
  headerHeight = 314,
  hasSubtract = true,
  subtractOption = 'Option1',
  background = 'LinearGradient1',
}: PageHeaderProps) => {
  const { palette } = useTheme()
  const hasChildren = !!children
  // TODO: to many magic numbers and the overall composition of this header needs to be thought through again
  // ternary operator hell: topPage/hasChildren : topPage/!hasChildren : !topPage/hasChildren : !topPage/!hasChildren
  const top = topPage ? (hasChildren ? 73 : 153) : hasChildren ? 0 : 68
  const height = topPage ? headerHeight + mainNavigationHeight : headerHeight
  const spacingTop = topPage ? -mainNavigationHeight : hasChildren ? 0 : 12

  const backgroundStyle = () => {
    if (background === 'LinearGradient1') {
      return {
        direction: 152.33,
        colorFrom: '#adb9c7 4.24%',
        colorTo: '#e4ebf3 72.17%',
      }
    } else if (background === 'LinearGradient3') {
      return {
        direction: 292.62,
        colorFrom: '#FF782C -16.38%',
        colorTo: '#FFB326 82.22%',
      }
    } else if (background === 'LinearGradient4') {
      return {
        direction: 111.81,
        colorFrom: '#9EABA9 41.97%',
        colorTo: '#B6A763 72.9%',
      }
    } else {
      return {
        direction: 145.91,
        colorFrom: '#F0F2F5 18.42%',
        colorTo: '#B4BBC3 79.14%',
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: `${height}px`,
        marginTop: `${spacingTop}px`,
        position: 'relative',
        background: `linear-gradient(${backgroundStyle().direction}deg, ${
          backgroundStyle().colorFrom
        }, ${backgroundStyle().colorTo})`,
      }}
    >
      {children && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '80px',
            backgroundColor: palette.background.background13,
            position: 'relative',
            top: topPage ? '85px' : '0',
          }}
        >
          <Box
            sx={{
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto',
              padding: '0 20px',
            }}
          >
            {children}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          maxWidth: '1200px',
          padding: '0px 20px',
          margin: '0px auto',
          paddingTop: `${top}px`,
          marginTop: !topPage ? '-12px' : '0',
        }}
      >
        <HeaderTitle title={title} />
      </Box>
      {subtractOption === 'Option1' && (
        <HeaderSubtractOption1 hasSubtract={hasSubtract} />
      )}
      {subtractOption === 'Option2' && (
        <HeaderSubtractOption2 hasSubtract={hasSubtract} />
      )}
      {subtractOption === 'Option3' && (
        <HeaderSubtractOption3 hasSubtract={hasSubtract} />
      )}
    </Box>
  )
}
