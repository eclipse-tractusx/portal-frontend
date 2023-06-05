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

import { useState } from 'react'
import { Carousel } from '../Carousel'
import { ImageType } from './types'
import ImageItemOverlay from './ImageItemOverlay'

export const ImageGallery = ({
  gallery,
  modalWidth,
}: {
  gallery: ImageType[]
  modalWidth?: string
}) => {
  const [hovered, setHovered] = useState(false)
  const [hoveredImage, setHoveredImage] = useState<ImageType>()

  const hoverImageFn = (image: ImageType) => {
    setHovered(true)
    setHoveredImage(image)
  }

  return (
    <>
      {hovered && hoveredImage && hoveredImage.url && (
        <ImageItemOverlay
          onClose={() => setHovered(false)}
          url={hoveredImage.url}
          text={hoveredImage.text}
          modalWidth={modalWidth}
        />
      )}
      <Carousel
        gapBetweenSlides={32}
        gapCarouselTop={0}
        dots={false}
        infinite
        itemHeight={0}
        itemWidth={266}
        slidesToShow={3}
      >
        {gallery.map((image) => (
          <div key={image.url}>
            <img
              src={image.url}
              alt={image.text}
              style={{
                height: '60%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              onClick={() => hoverImageFn(image)}
            />
          </div>
        ))}
      </Carousel>
    </>
  )
}
