/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useEffect, useState } from 'react'
import { Typography } from 'cx-portal-shared-components'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailHowToUse from './components/AppDetailHowToUse'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import { AppDetails } from 'features/apps/apiSlice'
import './AppDetail.scss'
import CommonService from 'services/CommonService'

export default function AppDetailContentDetails({
  item,
}: {
  item: AppDetails
}) {
  const [images, setImages] = useState<any>()

  useEffect(() => {
    if (item) {
      const newPromies = CommonService.fetchLeadPictures(item.images)
      Promise.all(newPromies).then((result) => {
        setImages(result.flat())
      })
    }
  }, [item])

  return (
    item && (
      <>
        <AppDetailHeader item={item} />
        <div className="product-description">
          <Typography variant="body2">{item.longDescription}</Typography>
        </div>
        {images && <AppDetailImageGallery images={images} />}
        <AppDetailPrivacy />
        <AppDetailHowToUse item={item} />
        <AppDetailProvider item={item} />
        <AppDetailTags item={item} />
      </>
    )
  )
}
