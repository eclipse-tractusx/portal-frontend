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

import { useEffect, useState } from 'react'
import { Typography } from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppDetails } from 'features/apps/details/types'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import './BoardHeader.scss'
import { Grid } from '@mui/material'

export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function BoardHeader({ item }: AppDetailHeaderProps) {
  const { t } = useTranslation()
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

  useEffect(() => {
    if (item?.leadPictureId) {
      const id = CommonService.isValidPictureId(item?.leadPictureId)
      void getImage(id)
    }
    // eslint-disable-next-line
  }, [item])

  const getImage = async (documentId: string) => {
    try {
      const response = await fetchDocumentById({
        appId: item.id,
        documentId,
      }).unwrap()
      const file = response.data
      return setImage(URL.createObjectURL(file))
    } catch (error) {
      console.log(error)
    }
  }

  const getAppData = (field: string) => {
    if (field === 'language') return item?.languages.join(', ')
    else if (field === 'useCase') return item?.useCases.join(', ')
    else if (field === 'price') return item?.price
  }

  return (
    <div className="adminboard-header">
      <div className="lead-image">
        <img src={image} alt={item.title} />
      </div>
      <div className="content">
        <Typography variant="caption2">{item.provider}</Typography>
        <Typography variant="h4" sx={{ mb: 1.5, mt: 1.5 }}>
          {item.title}
        </Typography>
        <Grid md={8}>
          {['language', 'useCase', 'price'].map((field, index) => (
            <div style={{ display: 'flex', marginBottom: '5px' }} key={index}>
              <Typography variant="body2">
                <b>{t(`content.apprelease.validateAndPublish.${field}`)}</b>
                {getAppData(field)}
              </Typography>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  )
}
