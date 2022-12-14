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

import { DropPreview } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export const Preview = ({ files }: { files: File[] }) => {
  const { t } = useTranslation()

  const uploadFiles = files.map((file) => {
    console.log(file)
    return {
      fileName: file.name,
      fileSize: file.size,
      status: 'new',
    } as const
  })

  return (
    <DropPreview
      uploadFiles={uploadFiles}
      translations={{
        placeholder: t('shared.dropzone.placeholder'),
        uploadError: t('shared.dropzone.uploadError'),
        uploadSuccess: t('shared.dropzone.uploadSuccess'),
        uploadProgess: t('shared.dropzone.uploadProgess'),
      }}
    />
  )
}
