/********************************************************************************
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
import './SlidingMainHeader.scss'
import { Button, Typography } from 'cx-portal-shared-components'

export interface HeaderProps {
  title?: string
  subTitle?: string
  subTitleWidth?: number
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
  buttonText?: string
  handleClick?: () => void
}

//TO-DO - Move this component to cx-shared repo after the yarn upgrade
export const Header = ({
  title,
  subTitle,
  subTitleWidth,
  headerHeight = 645,
  background = 'LinearGradient1',
  imagePath,
  titleTextVariant = 'h1',
  subTitleTextVariant = 'h2',
  buttonText,
  handleClick,
}: HeaderProps) => {
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
        marginTop: `-85px`,
        position: 'relative',
        background: `linear-gradient(${backgroundstyle().direction}deg, ${
          backgroundstyle().colorFrom
        }, ${backgroundstyle().colorTo})`,
      }}
    >
      {imagePath && (
        <Box
          className="headerImage"
          sx={{
            backgroundImage: `url(${imagePath})`,
          }}
        >
          <Box className="headerTitle">
            {title && (
              <Typography variant={titleTextVariant}>{title}</Typography>
            )}
            <div
              style={{
                borderBottom: '3px solid',
                margin: '-10px auto 30px auto',
                width: '50px',
              }}
            ></div>
            {subTitle && (
              <Typography
                className="subtitle"
                sx={{
                  fontFamily: 'LibreFranklin-Light',
                  width: `${subTitleWidth}px`,
                }}
                variant={subTitleTextVariant}
              >
                {subTitle}
              </Typography>
            )}
            {buttonText && (
              <Button onClick={() => handleClick && handleClick()}>
                {buttonText}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
