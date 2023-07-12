/********************************************************************************
 * Copyright (c) 2021, 2023 T-Systems International GmbH and BMW Group AG
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

import DownloadIcon from '@mui/icons-material/Download'
import { Button, Typography } from '@catena-x/portal-shared-components'
import { useEffect, useState } from 'react'
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
  const [file, setFile] = useState<string>('')
  const [error, setError] = useState<string>('')

  const openFile = () => {
    if (urn) {
      const encodedUrn = encodeURIComponent(urn)
      let url = ''
      switch (type) {
        case 'diagram': {
          url = 'diagram'
          break
        }
        case 'ttl': {
          url = 'file'
          break
        }
        case 'json': {
          url = 'json-schema'
          break
        }
        case 'payload': {
          url = 'example-payload'
          break
        }
        case 'docu': {
          url = 'documentation'
          break
        }
        case 'aasAasx': {
          url = 'aas?aasFormat=FILE'
          break
        }
        case 'aasXml': {
          url = 'aas?aasFormat=XML'
        }
      }
      fetch(
        `${getSemanticApiBase()}/hub/api/v1/models/${encodedUrn}/${url}`,
        getHeaders()
      )
        .then((response) => {
          if (!response.ok) {
            setError(t('content.semantichub.detail.fileError'))
          } else {
            return response.blob()
          }
        })
        .then((result) => {
          if (result) {
            setFile(URL.createObjectURL(result))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const openFileInNewTab = (f: string) => {
    if (f.length > 0) {
      if (f.includes('documentation')) {
        window.open(f, '_blank')
      } else {
        const link = document.createElement('a')
        if (fileName) link.download = fileName
        link.href = window.encodeURIComponent(f)
        link.target = '_blank'
        link.click()
      }
    }
  }

  useEffect(() => {
    if (file.length > 0) {
      openFileInNewTab(file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

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
