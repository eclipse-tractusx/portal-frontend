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

import { useState, useCallback } from 'react'
import { LogoGrayData } from '../Logo'

export const TransparentPixel =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const IMAGE_TYPES: any = {
  '3c': 'image/svg+xml',
  ffd8ff: 'image/jpeg',
  '89504e': 'image/png',
  '474946': 'image/gif',
}

const buf2hex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')

const defaultFetchImage = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url)
  return await response.arrayBuffer()
}

interface ImageProps {
  src: string
  alt?: string
  style?: any
  loader?: (src: string) => Promise<ArrayBuffer>
}

export const Image = ({ src, alt, style, loader }: ImageProps) => {
  const [data, setData] = useState(src)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(false)

  const getData = useCallback(async () => {
    try {
      const buffer = loader ? await loader(src) : await defaultFetchImage(src)
      const firstByte = buf2hex(buffer.slice(0, 1))
      const first3Bytes = buf2hex(buffer.slice(0, 3))
      const imageType =
        IMAGE_TYPES[firstByte] || IMAGE_TYPES[first3Bytes] || 'image/*'
      setData(URL.createObjectURL(new Blob([buffer], { type: imageType })))
    } catch (e) {
      setError(true)
    }
  }, [src, loader])

  return (
    <img
      src={!load && !error && src.startsWith('blob:') ? src : data}
      alt={alt || 'Catena-X'}
      onError={() => {
        setData(LogoGrayData)
        if (load) {
          setError(true)
        } else {
          setLoad(true)
          getData()
        }
      }}
      style={{
        ...style,
        backgroundColor: error ? '#ffddcc' : '#eeeeee',
        objectFit: 'cover',
      }}
    />
  )
}
