/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { Typography } from 'cx-portal-shared-components'
import { useState } from 'react'
import ImageItemOverlay from './ImageItemOverlay'
import { ImageType } from './types'

export const ImageItem = ({ image }: { image: ImageType }) => {
  const [hovered, setHovered] = useState(false)
  const getWidth = () => {
    let obj = {
      width: '160px',
      height: '160px',
    }
    switch (image.size) {
      case 'small-rectangle': {
        obj.width = '320px'
        obj.height = '160px'
        return obj
      }
      case 'small-square': {
        obj.width = '160px'
        obj.height = '160px'
        return obj
      }
      case 'medium-rectangle': {
        obj.width = '512px'
        obj.height = '256px'
        return obj
      }
      case 'medium-square': {
        obj.width = '256px'
        obj.height = '256px'
        return obj
      }
      case 'large-rectangle': {
        obj.width = '712px'
        obj.height = '352px'
        return obj
      }
      case 'large-square': {
        obj.width = '352px'
        obj.height = '352px'
        return obj
      }

      default:
        return obj
    }
  }
  return (
    <>
      {hovered ? (
        <ImageItemOverlay onClose={() => setHovered(false)} image={image} />
      ) : (
        <div
          onMouseEnter={() => image.hover && setHovered(true)}
          style={{
            width: getWidth().width,
            height: getWidth().height,
            boxShadow: image.shadow
              ? '0px 10px 20px rgb(80 80 80 / 30%)'
              : 'none',
            borderRadius: image.borderRadius ? '16px' : '0px',
            objectFit: 'cover',
            marginBottom: '20px',
          }}
        >
          <img
            src={image.url}
            alt={image.text}
            style={{
              width: getWidth().width,
              height: getWidth().height,
              borderRadius: image.borderRadius ? '16px' : '0px',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: '#888888',
              margin: '5px 0',
              fontSize: '14px',
            }}
          >
            {image.text}
          </Typography>
        </div>
      )}
    </>
  )
}
