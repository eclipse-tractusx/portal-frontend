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

import { ImageType } from './types'
import { Typography } from '../Typography'

export const ImageGallery = ({ gallery }: { gallery: ImageType[] }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-15px',
      marginLeft: '-15px',
      boxSizing: 'border-box',
    }}
  >
    {gallery.map((image, index) => (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingRight: '15px',
          paddingLeft: '15px',
          flex: '0 0 33.333333%',
          maxWidth: '33.333333%',
          boxSizing: 'border-box',
        }}
        key={index}
      >
        <img
          src={image.url}
          alt={image.text}
          style={{
            width: '100%',
            borderRadius: '20px',
            height: '250px',
            objectFit: 'cover',
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
    ))}
  </div>
)
