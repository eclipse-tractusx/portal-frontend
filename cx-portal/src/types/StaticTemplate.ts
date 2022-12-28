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

export type CardDetailsProps = {
  title: string
  description: string
  imageUrl?: string
  backgroundColor: string
  readMore: string
  id: string
  imageShape?: string
}

export type ProviderProps = {
  title: string
  description: string
  imageUrl?: string
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
}

export type linkProps = {
  background: string
  title: string
  navigate: string
}
