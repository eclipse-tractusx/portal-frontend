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

import type { ReactElement } from 'react'
import type { ProviderProps } from '../StaticTypes'
import '../StaticTemplate.scss'
import TitleDescriptionAndSectionlink from './TitleDescriptionAndSectionlink'

export default function ImageVideoWrapper({
  provider,
  children,
  scrollTop,
  showScroll,
  isImagePresent,
}: {
  provider: ProviderProps
  children: ReactElement
  scrollTop: () => void
  showScroll: boolean
  isImagePresent?: boolean
}) {
  return (
    <div className={'imageVideoTextSideBySide'}>
      <div
        className={'titleDescriptionBody'}
        style={{
          width: !isImagePresent ? '100%' : '50%',
        }}
      >
        <TitleDescriptionAndSectionlink
          showScroll={showScroll}
          provider={provider}
          scrollTop={scrollTop}
        />
      </div>
      {children}
    </div>
  )
}
