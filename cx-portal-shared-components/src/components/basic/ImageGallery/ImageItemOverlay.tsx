/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import MuiDialog from '@mui/material/Dialog'
import { ImageType } from './types'
import { IconButton } from '../IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material'
import MuiDialogContent from '@mui/material/DialogContent'
import { Typography } from '../Typography'

type ImageItemOverlayProps = {
  onClose: () => void
}

export default function ImageItemOverlay({
  url,
  text,
  borderRadius,
  shadow,
  onClose,
}: ImageType & ImageItemOverlayProps) {
  const { palette } = useTheme()
  return (
    <div>
      <MuiDialog
        sx={{
          '.MuiPaper-root': {
            minWidth: '800px',
            borderRadius: '4px',
          },
        }}
        open={true}
      >
        <MuiDialogContent
          sx={{
            fontFamily: 'fontFamily',
            textAlign: 'center',
            padding: '0px',
          }}
        >
          <div>
            <IconButton
              aria-label="close"
              onClick={() => onClose()}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: palette.action.active,
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={url}
              alt={text}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          <div
            style={{
              background: '#b1b1b1',
              padding: '10px 20px',
              textAlign: 'left',
              marginTop: '-10px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#111',
              }}
            >
              {text}
            </Typography>
          </div>
        </MuiDialogContent>
      </MuiDialog>
    </div>
  )
}
