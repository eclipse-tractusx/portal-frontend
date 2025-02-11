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
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface CopyToClipboardProps {
  text?: string
}

export const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const { t } = useTranslation()

  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('')

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setTooltipMessage(t('global.tooltips.copy.success'))
        setTooltipOpen(true)
        setTimeout(() => {
          setTooltipOpen(false)
        }, 1000)
      },
      () => {
        setTooltipMessage(t('global.tooltips.copy.fail'))
        setTooltipOpen(true)
        setTimeout(() => {
          setTooltipOpen(false)
        }, 1000)
      }
    )
  }

  return (
    <>
      {text && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              fontSize: '16px',
              marginRight: '5px',
            }}
          >
            {text}
          </Box>
          <Tooltip
            title={tooltipMessage}
            open={tooltipOpen}
            placement="right"
            disableHoverListener
          >
            <ContentCopyIcon
              onClick={() => {
                handleCopy(text)
              }}
              sx={{
                cursor: 'pointer',
                fontSize: '18px',
              }}
            />
          </Tooltip>
        </Box>
      )}
    </>
  )
}
