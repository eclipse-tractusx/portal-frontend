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

import './BoardImageGallery.scss'
import { Carousel, ImageType } from 'cx-portal-shared-components'

export default function BoardImageGallery({ images }: { images: ImageType[] }) {
  return (
    <div className="adminboard-gallery">
      <Carousel
        gapBetweenSlides={32}
        gapCarouselTop={32}
        gapToArrows={32}
        infinite
        itemHeight={279}
        itemWidth={266}
        slidesToShow={3}
      >
        {images
          .map((image) => (
            <div
              className="img-col"
            >
              <img 
                key={image.url}
                src={image.url}
                alt={image.text}
              />
            </div>
          ))}
      </Carousel>
    </div>
  )
}
