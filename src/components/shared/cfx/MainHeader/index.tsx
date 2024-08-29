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

import { Box, useMediaQuery, useTheme } from '@mui/material'
import { MainHeaderTitle } from './MainHeaderTitle'
import { BackButton } from '@catena-x/portal-shared-components'
import { useNavigate } from 'react-router-dom'

export interface MainHeaderProps {
  title?: string
  subTitle?: string
  subTitleWidth?: number | string
  headerHeight?: number

  background?:
    | 'LinearGradient1'
    | 'LinearGradient2'
    | 'LinearGradient3'
    | 'LinearGradient4'
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
  backButton?: boolean
}

export const MainHeader = ({
  title,
  subTitle,
  subTitleWidth,
  headerHeight = 645,

  titleTextVariant,
  subTitleTextVariant,
  backButton,
}: MainHeaderProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true,
  })
  const styles = isMobile
    ? { padding: '0px 20px', paddingTop: '200px', textAlign: 'center' }
    : { padding: '0px 180px', paddingTop: '150px' }
  const navigate = useNavigate()

  const previousPage = () => {
    navigate(-1)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: `${headerHeight}px`,
        position: 'relative',
      }}
      className="mainHeaderContainer cx-main-header"
    >
      {backButton === true && (
        <div className="cx-main-header__button">
          <BackButton
            backButtonLabel="Back"
            backButtonVariant="outlined"
            onBackButtonClick={previousPage}
          />
        </div>
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
        className="mainHeaderTitle cx-main-header__headings"
      >
        <MainHeaderTitle
          title={title}
          subTitle={subTitle}
          subTitleWidth={subTitleWidth}
          titleTextVariant={titleTextVariant}
          subTitleTextVariant={subTitleTextVariant}
        />
      </Box>
    </Box>
  )
}
