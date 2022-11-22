/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { MainHeader } from 'cx-portal-shared-components'

export default function SearchSection({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="stage-home">
      <MainHeader
        title={title}
        subTitle={description}
        headerHeight={800}
        subTitleWidth={1000}
        background="LinearGradient1"
        imagePath="./home-stage-desktop.png"
      ></MainHeader>
    </div>
  )
}
