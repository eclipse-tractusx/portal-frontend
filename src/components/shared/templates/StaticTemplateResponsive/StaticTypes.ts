/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

export type CardDetailsProps = {
  title: string
  description: string
  imagePath?: string
  backgroundColor: string
  readMore: string
  readMoreTitle: string
  id: string
  imageShape?: string
}

export type sectionLinkType = {
  data: {
    title: string
    id: string
    internal: boolean
  }[]
}

export type subSectionsType = {
  title: string
  description: string
  imagePath: string
  id: string
  backgroundColor: string
  template: string
  align: string
  sectionLink: sectionLinkType
}

export type ProviderProps = {
  title: string
  description: string
  imagePath?: string
  videoUrl?: string
  backgroundColor: string
  id: string
  detailsWithImageRow1: CardDetailsProps[]
  detailsWithImageRow2: CardDetailsProps[]
  detailsWithoutImageRow1: CardDetailsProps[]
  detailsWithoutImageRow2: CardDetailsProps[]
  grid: number
  template: string
  linksRow1: linkProps[]
  linksRow2: linkProps[]
  subTitles?: string[]
  align?: 'left' | 'center' | 'right'
  images?: string[]
  sectionLink?: sectionLinkType
  subDescriptions?: {
    title: string
    sections: {
      title: string
      link: string
      value: string
    }[]
  }
  subsections?: subSectionsType[]
}

export type linkProps = {
  background: string
  title: string
  navigate: string
}

export enum TemplateNames {
  TextImageSideBySide = 'TextImageSideBySide',
  TextVideoSideBySide = 'TextVideoSideBySide',
  VideoTextSideBySide = 'VideoTextSideBySide',
  TextImageCenterAligned = 'TextImageCenterAligned',
  ImageTextCenterAligned = 'ImageTextCenterAligned',
  TextCenterAligned = 'TextCenterAligned',
  TextCenterAlignedBody2 = 'TextCenterAlignedBody2',
  TextImageCenterAlignedWithCardGrid = 'TextImageCenterAlignedWithCardGrid',
  TextCenterAlignedWithCardGrid = 'TextCenterAlignedWithCardGrid',
  TextImageSideBySideWithCardGrid = 'TextImageSideBySideWithCardGrid',
  TextCenterAlignedWithLinkButtonGrid = 'TextCenterAlignedWithLinkButtonGrid',
  TextCenterAlignedWithImagesInFlex = 'TextCenterAlignedWithImagesInFlex',
  TextCenterAlignedWithImagesInGrid = 'TextCenterAlignedWithImagesInGrid',
  LinkButtonGrid = 'LinkButtonGrid',
  AlignedText = 'AlignedText',
  TextImageSideBySideWithSections = 'TextImageSideBySideWithSections',
  TextCenterAlignedWithImagesInList = 'TextCenterAlignedWithImagesInList',
}
