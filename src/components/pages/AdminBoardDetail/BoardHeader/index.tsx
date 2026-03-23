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

import { useEffect, useState } from 'react'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import type { AppDetails } from 'features/apps/details/types'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import './style.scss'
import { Grid } from '@mui/material'

enum CardDetails {
  LANGUAGE = 'language',
  USECASE = 'useCase',
  PRICE = 'price',
}
export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function BoardHeader({ item }: Readonly<AppDetailHeaderProps>) {
  const { t } = useTranslation()
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

  useEffect(() => {
    if (item?.leadPictureId) {
      const id = CommonService.isValidPictureId(item?.leadPictureId)
      void getImage(id)
    }
  }, [item])

  const getImage = async (documentId: string) => {
    try {
      const response = await fetchDocumentById({
        appId: item.id,
        documentId,
      }).unwrap()
      const file = response.data
      setImage(URL.createObjectURL(file))
    } catch (error) {
      console.log(error)
    }
  }

  const getAppData = (field: string) => {
    if (field === CardDetails.LANGUAGE) return item?.languages.join(', ')
    else if (field === CardDetails.USECASE) return item?.useCases.join(', ')
    else if (field === CardDetails.PRICE) return item?.price
  }

  return (
    <div className="adminboard-header">
      <div className="lead-image">
        <img src={image} alt={item.title} />
      </div>
      <div className="content">
        <Typography variant="h5" sx={{ pb: '6px', color: '#888888' }}>
          {item.provider}
        </Typography>
        <Typography variant="h2" sx={{ mb: 1.5, mt: 1.5 }}>
          {item.title}
        </Typography>
        <Grid md={8}>
          {[CardDetails.LANGUAGE, CardDetails.USECASE, CardDetails.PRICE].map(
            (field) => (
              <div style={{ display: 'flex', marginBottom: '5px' }} key={field}>
                <Typography variant="body2">
                  {t(`content.apprelease.validateAndPublish.${field}`)}
                  {getAppData(field)}
                </Typography>
              </div>
            )
          )}
        </Grid>
      </div>
    </div>
  )
}
