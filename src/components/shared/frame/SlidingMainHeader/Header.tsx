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
import { Button, Typography } from '@catena-x/portal-shared-components'

export interface HeaderProps {
  title?: string
  subTitle?: string
  subTitleWidth?: number
  headerHeight?: number
  imagePath?: string
  titleTextVariant?: 'h1' | 'h2' | 'h3'
  subTitleTextVariant?: 'h1' | 'h2' | 'h3'
  buttonText?: string
  handleClick: () => void
}

//TO-DO - Move this component to cx-shared repo after the yarn upgrade
export const Header = ({
  title,
  subTitle,
  subTitleWidth,
  headerHeight = 645,
  imagePath,
  titleTextVariant = 'h1',
  subTitleTextVariant = 'h2',
  buttonText,
  handleClick,
}: HeaderProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: `${headerHeight}px`,
        marginTop: '-85px',
        position: 'relative',
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
              <Button
                onClick={() => {
                  handleClick()
                }}
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
