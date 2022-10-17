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

import React from 'react'
import { IPreviewProps } from '../DropzoneTypes'
import { Box } from '@mui/material'
import { Typography } from '../../Typography'
import { FileIcon } from '../../CustomIcons/FileIcon'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
class Preview extends React.PureComponent<IPreviewProps> {
  render() {
    const {
      fileWithMeta: { cancel, remove, restart },
      meta,
      errorStatus,
      statusText,
    } = this.props

    const newStatusValue = statusText[meta.status] ?? meta.status

    return (
      <Box
        sx={{
          display: 'flex',
          margin: '32px 0',
          progress: {
            width: ' 100%',
            height: '4px',
            backgroundColor: 'textField.backgroundHover',
            '&::-webkit-progress-bar': {
              borderRadius: '40px',
            },
            '&::-webkit-progress-value': {
              backgroundColor: 'support.success',
              borderRadius: '40px',
            },
            '&.error::-webkit-progress-value': {
              backgroundColor: 'danger.danger',
            },
          },
        }}
        key={meta.id}
      >
        <FileIcon fillColor={'#939393'} size={80} />

        <Box sx={{ width: '100%', margin: '8px 32px' }}>
          <Typography
            variant="caption2"
            sx={{ display: 'block', color: 'common.black' }}
          >
            {meta.name}
          </Typography>
          <Typography
            variant="helper"
            sx={{ display: 'block', '&.error': { color: 'danger.danger' } }}
            className={errorStatus.includes(meta.status) ? 'error' : ''}
          >
            {newStatusValue}
          </Typography>
          <progress
            max={100}
            value={
              meta.status === 'done' || meta.status === 'headers_received'
                ? 100
                : meta.percent
            }
            className={errorStatus.includes(meta.status) ? 'error' : ''}
          />
        </Box>

        {meta.status === 'uploading' && (
          <Box onClick={cancel}>
            <RestartAltOutlinedIcon
              sx={{ color: '#939393' }}
              fontSize="small"
            />
          </Box>
        )}
        {meta.status !== 'preparing' &&
          meta.status !== 'getting_upload_params' &&
          meta.status !== 'uploading' && (
            <Box onClick={remove}>
              <DeleteOutlineIcon sx={{ color: '#939393' }} fontSize="small" />
            </Box>
          )}
        {errorStatus.includes(meta.status) && (
          <Box onClick={restart}>
            <RestartAltOutlinedIcon
              sx={{ color: '#939393' }}
              fontSize="small"
            />
          </Box>
        )}
      </Box>
    )
  }
}
export default Preview
