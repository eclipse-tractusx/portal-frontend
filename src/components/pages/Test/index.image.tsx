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
        <Image
          src={`src/assets/logo/arena-logo.svg`}
          style={style}
        />
        <Image
          src={
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0LjQ0NDQ0aW4iIGhlaWdodD0iNC40NDQ0NGluIiB2aWV3Qm94PSIwIDAgMzIwIDMyMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IHJnYmEoMjIwLDIyMCwyMjApIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmYTYwMDt9LmNscy0ye2ZpbGw6I2IzY2IyZDt9PC9zdHlsZT48L2RlZnM+PHBhdGggZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iOCIgZD0iTSAxMzIsMjEyIEMgMTQ4LDE2OSAxNjcsMTMwIDE5Nyw5NSAyNDcsOTYgMjY2LDExNiAyODMsMTMzIDI1NiwxNjggMjM0LDIxOSAyMTgsMjU1IDE3OSwyMjAgMTY4LDIxMyAxMzEsMjEzIDEwMywxODIgNzgsMTcxIDQ0LDE3NCA2OCwxMzEgODMsMTA5IDExNSw3NSAxNDgsNzEgMTc2LDc0IDE5Niw5NCIgLz48ZyB0cmFuc2Zvcm09InNjYWxlKDAuOCwwLjgpIHRyYW5zbGF0ZSgxNjUgMTAwKSByb3RhdGUoNDApIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MCwyOC42OXYtNmExLDEsMCwwLDAtMS41NS0uODJMMTQuNjksMzguMzFhNC4xMSw0LjExLDAsMCwxLTYuNDUtMy4zOFYyN2E4LjIzLDguMjMsMCwwLDEsMy41NS02Ljc2bDcuMDgtNC44OUE0LjA3LDQuMDcsMCwwLDAsMjAuNjMsMTJWNi4zOGwwLTUuMzlBMSwxLDAsMCwwLDE5LjEuMThsLTUsMy40MkE0LjA4LDQuMDgsMCwwLDAsMTIuMzgsN1Y5Ljg0TDYuMywxNEExNC41NywxNC41NywwLDAsMCwwLDI2djguODlBMTIuMzYsMTIuMzYsMCwwLDAsMTkuMzgsNDUuMDlsMTguOS0xM0E0LjA5LDQuMDksMCwwLDAsNDAsMjguNjlaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzMsMTAuNjNsLTE4LjksMTNBNC4wOSw0LjA5LDAsMCwwLDEyLjM1LDI3djZhMSwxLDAsMCwwLDEuNTUuODFMMzcuNzEsMTcuNDFhNC4xMSw0LjExLDAsMCwxLDYuNDQsMy4zOHY3LjlhOC4yNSw4LjI1LDAsMCwxLTMuNTUsNi43N2wtNi4zMyw0LjM2LS43Mi41aDBhNC4wNiw0LjA2LDAsMCwwLTEuNzUsMy4zNFY0NS4ybDAsOS40OGExLDEsMCwwLDAsMS41NS44MWw1LTMuNDNBNC4wNSw0LjA1LDAsMCwwLDQwLDQ4LjcyVjQ1Ljg3bDYuMDYtNC4xOGExNC41OCwxNC41OCwwLDAsMCw2LjI5LTEyVjIwLjhBMTIuMzUsMTIuMzUsMCwwLDAsMzMsMTAuNjNaIi8+PC9nPjwvc3ZnPgo='
          }
          style={style}
        />
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
