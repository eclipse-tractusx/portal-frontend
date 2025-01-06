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
import { PageSnackbar } from '@catena-x/portal-shared-components'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box } from '@mui/material'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { useState } from 'react'

interface CopyToClipboardProps {
  text?: string
}

export const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(true)
        setSnackbarOpen(true)
      },
      () => {
        setCopySuccess(false)
        setSnackbarOpen(true)
      }
    )
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
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
          <ContentCopyIcon
            onClick={() => {
              handleCopy(text)
            }}
            sx={{
              cursor: 'pointer',
              fontSize: '16px',
            }}
          />
        </Box>
      )}

      {/* Snackbar for feedback */}
      <PageSnackbar
        open={snackbarOpen}
        onCloseNotification={handleCloseSnackbar}
        severity={
          copySuccess ? SuccessErrorType.SUCCESS : SuccessErrorType.ERROR
        }
        description={
          copySuccess
            ? 'Text copied to clipboard!'
            : 'Failed to copy text to clipboard.'
        }
        showIcon={true}
        autoClose={true}
      />
    </>
  )
}
