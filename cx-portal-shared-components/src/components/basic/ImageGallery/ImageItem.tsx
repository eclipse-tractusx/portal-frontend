/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { useState } from 'react'
import { Typography } from '../Typography'
import ImageItemOverlay from './ImageItemOverlay'
import { ImageType } from './types'

export const ImageItem = ({
  url,
  text,
  size = 'large-square',
  hover = true,
  borderRadius = true,
  shadow = true,
  width,
  height,
  modalWidth,
  additionalStyles = {},
}: ImageType) => {
  const [hovered, setHovered] = useState(false)
  const getWidth = () => {
    switch (size) {
      case 'small-rectangle':
        return {
          width: '284px',
          height: '160px',
        }
      case 'small-square':
        return {
          width: '160px',
          height: '160px',
        }
      case 'medium-rectangle':
        return {
          width: '456px',
          height: '256px',
        }
      case 'medium-square':
        return {
          width: '256px',
          height: '256px',
        }
      case 'large-rectangle':
        return {
          width: '625px',
          height: '352px',
        }
      case 'custom':
        return {
          width: width,
          height: height,
        }
      default:
        return {
          width: '352px',
          height: '352px',
        }
    }
  }
  return (
    <>
      {hovered && (
        <ImageItemOverlay
          onClose={() => setHovered(false)}
          url={url}
          text={text}
          size={size}
          hover={hover}
          borderRadius={borderRadius}
          shadow={shadow}
          modalWidth={modalWidth}
        />
      )}
      <div
        onClick={() => hover && setHovered(true)}
        style={{
          width: getWidth().width,
          height: getWidth().height,
          boxShadow: shadow ? '0px 10px 20px rgb(80 80 80 / 30%)' : 'none',
          borderRadius: borderRadius ? '16px' : '0px',
          marginBottom: '20px',
          cursor: 'zoom-in',
          ...additionalStyles,
        }}
      >
        <img
          src={url}
          alt={text}
          style={{
            width: getWidth().width,
            height: getWidth().height,
            borderRadius: borderRadius ? '16px' : '0px',
            objectFit: 'contain',
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
          {text}
        </Typography>
      </div>
    </>
  )
}
