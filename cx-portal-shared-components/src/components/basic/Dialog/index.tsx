/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { useTheme } from '@mui/material'
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog'

export const CONTENT_SPACING_RIGHT_LEFT = 10
const MODAL_DEFAULT_WIDTH = '800px'

interface AddtionalDialogProps {
  modalBorderRadius?: number
  additionalModalRootStyles?: any
}

export type DialogProps = Pick<
  MuiDialogProps,
  'children' | 'open' | 'scroll' | 'sx' | 'fullWidth' | 'maxWidth'
>

export const Dialog = ({
  scroll = 'body',
  modalBorderRadius,
  additionalModalRootStyles = {},
  fullWidth,
  maxWidth,
  ...props
}: DialogProps & AddtionalDialogProps) => {
  const theme = useTheme()

  const radius =
    modalBorderRadius && modalBorderRadius !== 0 ? modalBorderRadius : 20

  const fullScreenWidth = `calc(100vw - ${theme.spacing(8)})`

  const width = fullWidth
    ? fullScreenWidth
    : maxWidth
    ? 'auto'
    : MODAL_DEFAULT_WIDTH

  return (
    <MuiDialog
      {...props}
      scroll={scroll}
      maxWidth={fullWidth ? 'xl' : maxWidth}
      sx={{
        '.MuiPaper-root': {
          borderRadius: `${radius}px !important`,
          width: width,
          maxWidth: maxWidth ? undefined : fullScreenWidth,
          overflowWrap: 'break-word',
          ...additionalModalRootStyles,
        },
      }}
    />
  )
}
