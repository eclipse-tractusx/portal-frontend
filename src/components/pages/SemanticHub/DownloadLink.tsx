/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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

import DownloadIcon from '@mui/icons-material/Download'
import {
  Button,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getSemanticApiBase } from 'services/EnvironmentService'
import { getHeaders } from 'services/RequestService'

interface DownloadLinkProps {
  urn: string
  type: string
  title?: string
  fileName?: string
}

const DownloadLink = ({ urn, type, title, fileName }: DownloadLinkProps) => {
  const { t } = useTranslation()
  const [error, setError] = useState<string>('')

  const openFile = async () => {
    try {
      const encodedUrn = encodeURIComponent(urn)
      let url = ''
      switch (type) {
        case 'diagram':
          url = 'diagram'
          break
        case 'ttl':
          url = 'file'
          break
        case 'json':
          url = 'json-schema'
          break
        case 'payload':
          url = 'example-payload'
          break
        case 'docu':
          url = 'documentation'
          break
        case 'aasAasx':
          url = 'aas?aasFormat=FILE'
          break
        case 'aasXml':
          url = 'aas?aasFormat=XML'
          break
        default:
          setError(t('content.semantichub.detail.fileError'))
          return
      }

      const response = await fetch(
        `${getSemanticApiBase()}/hub/api/v1/models/${encodedUrn}/${url}`,
        getHeaders()
      )

      if (!response.ok) {
        setError(t('content.semantichub.detail.fileError'))
        return
      }

      const result = await response.blob()

      const link = document.createElement('a')
      link.href = URL.createObjectURL(result)

      if (fileName) {
        link.setAttribute('download', fileName)
      } else {
        link.target = '_blank'
      }

      link.click()
      URL.revokeObjectURL(link.href)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('content.semantichub.detail.fileError')
      }
    }
  }

  return (
    <>
      <Button
        key={`download_${type}`}
        size="small"
        startIcon={<DownloadIcon />}
        variant="text"
        onClick={openFile}
        title={title}
        sx={{ mb: 1 }}
      >
        {t(`content.semantichub.detail.downloads.${type}`)}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </>
  )
}

export default DownloadLink
