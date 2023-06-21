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

import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Image } from '../../Image'
import { mainNavigationHeight } from '../../MainNavigation'
import { MainHeaderTitle } from './Components/MainHeaderTitle'

export interface MainHeaderProps {
  children?: React.ReactNode
  title?: string
  subTitle?: string
  subTitleWidth?: number | string
  headerHeight?: number
  background?:
    | 'LinearGradient1'
    | 'LinearGradient2'
    | 'LinearGradient3'
    | 'LinearGradient4'
  imagePath?: string
  titleTextVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'overline'
    | 'inherit'
    | 'body3'
    | 'caption1'
    | 'caption2'
    | 'caption3'
    | 'label1'
  subTitleTextVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'overline'
    | 'inherit'
    | 'body3'
    | 'caption1'
    | 'caption2'
    | 'caption3'
    | 'label1'
}

export const MainHeader = ({
  children,
  title,
  subTitle,
  subTitleWidth,
  headerHeight = 645,
  background = 'LinearGradient1',
  imagePath,
  titleTextVariant,
  subTitleTextVariant,
}: MainHeaderProps) => {
  //TO-DO - Use external scss file to handle mobile specifc css after the yarn upgrade
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })
  const styles = isMobile
    ? { padding: '0px 20px', paddingTop: '200px', textAlign: 'center' }
    : { padding: '0px 180px', paddingTop: '150px' }
  const backgroundstyle = () => {
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
        height: `${headerHeight}px`,
        marginTop: `${-mainNavigationHeight}px`,
        position: 'relative',
        background: `linear-gradient(${backgroundstyle().direction}deg, ${
          backgroundstyle().colorFrom
        }, ${backgroundstyle().colorTo})`,
      }}
    >
      {imagePath && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={imagePath}
            alt="home stage"
            style={{
              bottom: 0,
              height: '100%',
              left: 0,
              objectFit: 'cover',
              right: 0,
              top: 0,
              visibility: 'visible',
              width: '100%',
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          width: '100%',
          margin: '0px',
          zIndex: 1,
          position: 'absolute',
          top: '0px',
          ...styles,
        }}
      >
        <MainHeaderTitle
          title={title}
          subTitle={subTitle}
          subTitleWidth={subTitleWidth}
          titleTextVariant={titleTextVariant}
          subTitleTextVariant={subTitleTextVariant}
        />

        <div className="children-header">{children}</div>
      </Box>
    </Box>
  )
}
