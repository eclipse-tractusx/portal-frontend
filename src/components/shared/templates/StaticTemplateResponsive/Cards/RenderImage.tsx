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

import { ImageItem } from '@arena2036/portal-shared-components-construct-x'
import { useMediaQuery } from '@mui/material'
import { type CSSProperties } from 'react'
import '../style.scss'

export default function RenderImage({
  url,
  height,
  additionalStyles,
  width,
}: Readonly<{
  url: string
  additionalStyles?: CSSProperties
  height?: string
  width?: string
}>) {
  const web = useMediaQuery('(min-width:1025px)')

  return (
    <>
      {web ? (
        <ImageItem
          url={url}
          text={''}
          size="custom"
          height={height ? height : '331px'}
          width={width ? width : 'auto'}
          hover={true}
          borderRadius={true}
          shadow={false}
          modalWidth="1100"
          additionalStyles={additionalStyles ?? {}}
        />
      ) : (
        <img
          className={'imageGallery'}
          src={url}
          alt="provider"
          width={width ? width : 'auto'}
        />
      )}
    </>
  )
}
