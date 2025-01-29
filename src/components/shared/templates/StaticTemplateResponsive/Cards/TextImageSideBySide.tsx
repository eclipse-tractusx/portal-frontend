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

import type { ProviderProps } from '../StaticTypes'
import ImageVideoWrapper from './ImageVideoWrapper'
import RenderImage from './RenderImage'
import '../style.scss'

export default function TextImageSideBySide({
  provider,
  baseUrl,
  scrollTop,
  showScroll,
}: {
  provider: ProviderProps
  baseUrl: string
  scrollTop: () => void
  showScroll: boolean
}) {
  return (
    <ImageVideoWrapper
      scrollTop={scrollTop}
      showScroll={showScroll}
      provider={provider}
      children={
        <RenderImage
          url={baseUrl + provider.imagePath || ''}
          additionalStyles={{
            textAlign: 'center',
          }}
          width="50%"
        />
      }
    />
  )
}
