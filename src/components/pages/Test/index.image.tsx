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
} from '@arena2036/portal-shared-components-construct-x'
import { useEffect, useState } from 'react'
import { getApiBase, getAssetBase } from 'services/EnvironmentService'
import { fetchImageWithToken } from 'services/ImageService'

export default function ImageTest() {
  const style = { margin: '10px', width: '240px', height: '240px' }

  const [data, setData] = useState<string>(TransparentPixel)

  useEffect(() => {
    fetchImageWithToken(`${getAssetBase()}/images/frame/Home.jpg`)
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
          src={
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="4.44444in" height="4.44444in" viewBox="0 0 320 320" style="background-color:rgb(220,220,220)"><defs><style>.cls-1{fill:rgb(255,166,0);}.cls-2{fill:rgb(179,203,45);}</style></defs><path fill="white" stroke="black" stroke-width="8" d="M 132,212 C 148,169 167,130 197,95 247,96 266,116 283,133 256,168 234,219 218,255 179,220 168,213 131,213 103,182 78,171 44,174 68,131 83,109 115,75 148,71 176,74 196,94" /><g transform="scale(0.8,0.8) translate(165 100) rotate(40)"><path class="cls-1" d="M40,28.69v-6a1,1,0,0,0-1.55-.82L14.69,38.31a4.11,4.11,0,0,1-6.45-3.38V27a8.23,8.23,0,0,1,3.55-6.76l7.08-4.89A4.07,4.07,0,0,0,20.63,12V6.38l0-5.39A1,1,0,0,0,19.1.18l-5,3.42A4.08,4.08,0,0,0,12.38,7V9.84L6.3,14A14.57,14.57,0,0,0,0,26v8.89A12.36,12.36,0,0,0,19.38,45.09l18.9-13A4.09,4.09,0,0,0,40,28.69Z"/><path class="cls-2" d="M33,10.63l-18.9,13A4.09,4.09,0,0,0,12.35,27v6a1,1,0,0,0,1.55.81L37.71,17.41a4.11,4.11,0,0,1,6.44,3.38v7.9a8.25,8.25,0,0,1-3.55,6.77l-6.33,4.36-.72.5h0a4.06,4.06,0,0,0-1.75,3.34V45.2l0,9.48a1,1,0,0,0,1.55.81l5-3.43A4.05,4.05,0,0,0,40,48.72V45.87l6.06-4.18a14.58,14.58,0,0,0,6.29-12V20.8A12.35,12.35,0,0,0,33,10.63Z"/></g></svg>'
          }
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
