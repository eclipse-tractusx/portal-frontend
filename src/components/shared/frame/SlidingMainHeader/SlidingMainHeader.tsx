/********************************************************************************
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

import { Header } from './Header'
import './SlidingMainHeader.scss'
import Slider from 'react-slick'
import { Box } from '@mui/material'

export interface SlidingMainHeaderProps {
  mainHeaderInfo?: {
    title: string
    subTitle: string
    imagePath: string
    buttonText: string
    handleClick: () => void
  }[]
  autoplay?: boolean
  autoplaySpeed?: number
  stageHeaderInfo?: {
    title: string
  }[]
}
//TO-DO - Move this component to cx-shared repo after the yarn upgrade
export const SlidingMainHeader = ({
  mainHeaderInfo,
  autoplay = true,
  autoplaySpeed = 5000,
  stageHeaderInfo,
}: SlidingMainHeaderProps) => {
  const settings = {
    customPaging: function (i: number) {
      return (
        <Box>
          {stageHeaderInfo && (
            <strong className="pagingText">{stageHeaderInfo[i].title}</strong>
          )}
        </Box>
      )
    },
    dots: true,
    dotsClass: 'slick-ul',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
  }

  return (
    <>
      {mainHeaderInfo && (
        <Slider {...settings}>
          {mainHeaderInfo.map((mainHeader) => (
            <Header key={mainHeader.imagePath} {...mainHeader} />
          ))}
        </Slider>
      )}
    </>
  )
}
