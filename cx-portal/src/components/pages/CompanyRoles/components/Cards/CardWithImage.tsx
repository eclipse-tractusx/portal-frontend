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

import Card from './Card'
import { CardDetailsProps } from '../../types'

export default function CardWithImage({
  detail,
}: {
  detail: CardDetailsProps
}) {
  return (
    <div
      key={detail.id}
      className="cardsContainer"
      style={{
        backgroundColor: detail.backgroundColor,
      }}
    >
      <img
        style={{
          padding:
            detail.imageShape && detail.imageShape === 'circle'
              ? '40px 90px'
              : '0px', // provide extra padding if the image shape is circle.
          maxHeight:
            detail.imageShape && detail.imageShape === 'circle'
              ? '100%'
              : '156px', // Do not specify any height if the image shape is circle as it might crop some part in it
        }}
        src={detail.imageUrl}
        width="100%"
        alt={'alt tag info'}
      />
      <Card card={detail} />
    </div>
  )
}
