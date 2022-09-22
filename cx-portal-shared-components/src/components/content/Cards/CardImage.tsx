/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { Box, useTheme } from '@mui/material'
import { LogoGrayData } from '../../basic/Logo'

export type CardImageSize = 'normal' | 'medium' | 'small'

export type CardImageShape = 'round' | 'square'

export interface ICardImage {
  src: string
  alt?: string
}

export interface CardImageProps {
  image: ICardImage
  imageSize?: CardImageSize
  imageShape?: CardImageShape
  preview?: boolean
}

export const CardImage = ({
  image,
  imageSize = 'normal',
  imageShape = 'round',
  preview = false,
}: CardImageProps) => {
  const { transitions } = useTheme()
  const withPreview = (size: number) => (preview ? size + 18 : size)

  const sx = {
    container: {
      normal: {},
      medium: { paddingTop: 3, textAlign: 'center' },
      small: { paddingTop: 3, textAlign: 'center' },
    },
    image: {
      normal: { width: '100%', height: withPreview(144) },
      medium: { width: withPreview(156), height: withPreview(156) },
      small: { width: withPreview(80), height: withPreview(80) },
      round: { borderRadius: '50%' },
      square: { borderRadius: 6 },
    },
  }

  return (
    <Box sx={sx.container[imageSize]}>
      <Box
        component="img"
        src={image?.src || LogoGrayData}
        alt={image?.alt}
        sx={{
          objectFit: 'cover',
          transition: transitions.create(['all'], {
            duration: transitions.duration.shorter,
          }),
          ...sx.image[imageSize],
          ...(imageSize === 'small' && sx.image[imageShape]),
          ...(imageSize === 'medium' && sx.image[imageShape]),
        }}
      />
    </Box>
  )
}
