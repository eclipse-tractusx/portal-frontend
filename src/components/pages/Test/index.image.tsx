/********************************************************************************
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

import {
  Image,
  LogoGrayData,
  TransparentPixel,
} from '@catena-x/portal-shared-components'
import { useEffect, useState } from 'react'
import { getApiBase, getAssetBase } from 'services/EnvironmentService'
import { fetchImageWithToken } from 'services/ImageService'

export default function ImageTest() {
  const style = { margin: '10px', width: '240px', height: '240px' }

  const [data, setData] = useState<string>(TransparentPixel)

  useEffect(() => {
    fetchImageWithToken(`${getAssetBase()}/images/frame/Home.png`)
      .then((buffer) => {
        setData(URL.createObjectURL(new Blob([buffer], { type: 'image/png' })))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <article>
        <Image src={TransparentPixel} style={style} />
        <Image src={LogoGrayData} style={style} />
        <Image src={'/assets/images/icons/book.svg'} style={style} />
        <Image
          src={`${getAssetBase()}/assets/images/frame/Home.jpg`}
          style={style}
        />
        <Image src={data} style={style} />
        <Image
          src={`${getApiBase()}/api/Apps/5cf74ef8-e0b7-4984-a872-474828beb5d7/appDocuments/35ca3d61-b05b-4a66-9a6b-d02600d2fe45`}
          style={style}
          loader={fetchImageWithToken}
        />
      </article>
      {
        /* error cases */
        <article>
          <Image src={'sdhjfkljsdklfj'} style={style} />
          <Image
            src={
              'data:image/svg+xml;utf8,<html><body><h1>NOT FOUND</h1></body></html>'
            }
            style={style}
          />
          <Image src={'data:image/svg+xml;base64,ertiouiertui'} style={style} />
          <Image
            src={`${getApiBase()}/api/apps/d245d2fe-e567-44e4-9c15-5a0e4a733b9a/appDocuments/id_not_existing`}
            style={style}
          />
          <Image
            src={'https://unknown.server.address/image.png'}
            style={style}
          />
        </article>
      }
    </>
  )
}
